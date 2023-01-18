import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AriaRole } from 'react';

type EventsT = {
	scrollIntoView(): Promise<void>;
	click(): Promise<void>;
	clear(): Promise<void>;
	type(text: string): Promise<void>;
	one(): Promise<HTMLElement>;
	to(role: AriaRole, name: string | RegExp): EventsT;
};

function scopedUser(element: HTMLElement) {
	const scope = within(element);
	const user = userEvent.setup();

	function events(getElement: () => Promise<HTMLElement>) {
		return {
			async click() {
				const element = await getElement();
				return user.click(element);
			},
			async clear() {
				const element = await getElement();
				return user.clear(element);
			},
			async type(text: string) {
				const element = await getElement();
				return user.type(element, text);
			},
			to(role: AriaRole, name: string | RegExp): EventsT {
				return events(() => getElement().then((parent) => within(parent).findByRole(role, { name })));
			},
			async one() {
				return getElement();
			},
			async scrollIntoView() {
				const element = await getElement();
				return element.scrollIntoView({ behavior: 'smooth' });
			},
		};
	}

	function to(role: AriaRole, name: string | RegExp): EventsT;
	function to(element: Promise<HTMLElement>): EventsT;
	function to(element: HTMLElement): EventsT;
	function to(roleOrElement: AriaRole | HTMLElement | Promise<HTMLElement>, name?: string | RegExp) {
		if (typeof roleOrElement === 'string') {
			return events(() => scope.findByRole(roleOrElement, { name }));
		}
		return events(async () => roleOrElement);
	}

	return to;
}

export default scopedUser;
