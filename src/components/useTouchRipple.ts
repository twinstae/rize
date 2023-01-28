import { useRef, useEffect } from 'react';
import invariant from '../invariant';

export const useTouchRipple = (elRef: { current: HTMLElement | null }, needsTouchRipple: boolean, eventsElRef?: { current: HTMLElement | null }) => {
	if (!eventsElRef) eventsElRef = elRef;
	invariant(eventsElRef);
	const ripple = useRef<TouchRipple | null>(null);
	const removeRipple = () => {
		if (ripple.current) ripple.current.remove();
		ripple.current = null;
	};

	const onPointerDown = (e: PointerEvent) => {
		invariant(elRef.current);
		ripple.current = new TouchRipple(elRef.current, e.pageX, e.pageY);
	};
	const onPointerMove = () => {
		removeRipple();
	};
	const onPointerUp = () => {
		removeRipple();
	};

	const attachEvents = () => {
		invariant(eventsElRef);
		const el = eventsElRef.current;
		invariant(el);
		el.addEventListener('pointerdown', onPointerDown);
		el.addEventListener('pointermove', onPointerMove);
		el.addEventListener('pointerup', onPointerUp);
		el.addEventListener('pointercancel', onPointerUp);
		el.addEventListener('contextmenu', onPointerUp);
	};
	const detachEvents = () => {
		invariant(eventsElRef);
		const el = eventsElRef.current;
		invariant(el);
		el.removeEventListener('pointerdown', onPointerDown);
		el.removeEventListener('pointermove', onPointerMove);
		el.removeEventListener('pointerup', onPointerUp);
		el.removeEventListener('pointercancel', onPointerUp);
		el.removeEventListener('contextmenu', onPointerUp);
	};
	const onMounted = () => {
		if (!eventsElRef || !eventsElRef.current || !needsTouchRipple) return;
		attachEvents();
	};
	const onDestroy = () => {
		if (!eventsElRef || !eventsElRef.current || !needsTouchRipple) return;
		detachEvents();
	};

	useEffect(() => {
		onMounted();
		return () => onDestroy();
	});
};

class TouchRipple {
	el: HTMLElement;
	rippleTransform: string;
	rippleWaveEl: HTMLSpanElement;
	shouldBeRemoved: boolean;
	removeTimeout: number | string | NodeJS.Timeout | undefined;

	constructor(el: HTMLElement, x: number, y: number) {
		this.el = el;

		const { left, top, width, height } = el.getBoundingClientRect();
		const center = {
			x: x - left,
			y: y - top,
		};
		let diameter = Math.max((height ** 2 + width ** 2) ** 0.5, 48);

		const isInset = el.classList.contains('k-touch-ripple-inset');

		if (isInset) {
			diameter = Math.max(Math.min(width, height), 48);
		}

		/* eslint-disable no-restricted-globals */
		const isOverflowHidden =
			typeof window !== 'undefined' &&
			window.getComputedStyle(el, null).getPropertyValue('overflow') ===
			'hidden';

		/* eslint-enable no-restricted-globals */
		if (!isInset && isOverflowHidden) {
			const distanceFromCenter =
				((center.x - width / 2) ** 2 + (center.y - height / 2) ** 2) ** 0.5;
			const scale = (diameter / 2 + distanceFromCenter) / (diameter / 2);
			this.rippleTransform = `translate3d(0px, 0px, 0) scale(${scale})`;
		} else {
			// prettier-ignore
			this.rippleTransform = `translate3d(${-center.x + width / 2}px, ${-center.y + height / 2}px, 0) scale(1)`;
		}

		// eslint-disable-next-line
		this.rippleWaveEl = document.createElement('span');
		this.rippleWaveEl.classList.add('k-touch-ripple-wave');
		this.rippleWaveEl.setAttribute('hidden', '');

		Object.assign(this.rippleWaveEl, {
			style: `
      width: ${diameter}px;
      height: ${diameter}px;
      margin-top:-${diameter / 2}px;
      margin-left:-${diameter / 2}px;
      left:${center.x}px;
      top:${center.y}px; --k-ripple-transform: ${this.rippleTransform}`
		});
		el.insertAdjacentElement('afterbegin', this.rippleWaveEl);

		this.shouldBeRemoved = false;

		const animationEnd = () => {
			this.rippleWaveEl.removeEventListener('animationend', animationEnd);
			if (!this.rippleWaveEl) return;
			if (this.rippleWaveEl.classList.contains('k-touch-ripple-wave-out'))
				return;
			this.rippleWaveEl.classList.add('k-touch-ripple-wave-in');
			if (this.shouldBeRemoved) {
				this.out();
			}
		};
		this.rippleWaveEl.addEventListener('animationend', animationEnd);

		return this;
	}

	destroy() {
		this.rippleWaveEl?.remove();

		(Object.keys(this) as (keyof TouchRipple)[]).forEach((key) => {
			delete this[key];
		});
	}

	out() {
		const { rippleWaveEl } = this;
		clearTimeout(this.removeTimeout);
		rippleWaveEl.classList.add('k-touch-ripple-wave-out');

		this.removeTimeout = setTimeout(() => {
			this.destroy();
		}, 300);
		const animationEnd = () => {
			this.rippleWaveEl.removeEventListener('animationend', animationEnd);
			clearTimeout(this.removeTimeout);
			this.destroy();
		};
		this.rippleWaveEl.addEventListener('animationend', animationEnd);
	}

	remove() {
		if (this.shouldBeRemoved) return;
		this.removeTimeout = setTimeout(() => {
			this.destroy();
		}, 400);
		this.shouldBeRemoved = true;
		if (this.rippleWaveEl.classList.contains('k-touch-ripple-wave-in')) {
			this.out();
		}
	}
}
