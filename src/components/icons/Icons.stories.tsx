import type { Meta, StoryObj } from '@storybook/react-vite';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowLeftIcon from './ArrowLeftIcon';
import ArrowUpIcon from './ArrowUpIcon';
import CheckIcon from './CheckIcon';
import EmptyStarIcon from './EmptyStarIcon';
import HamBurgerIcon from './HamBurgerIcon';
import MagnifyingGlassIcon from './MagnifyingGlassIcon';
import MoonIcon from './MoonIcon';
import PhotoIcon from './PhotoIcon';
import ShuffleIcon from './ShuffleIcon';
import StarIcon from './StarIcon';
import SunIcon from './SunIcon';
import XCircleIcon from './XCircleIcon';
import XMarkIcon from './XMarkIcon';
import { HStack, VStack, Text } from '../rize-ui-web';

const ICONS = [
	['ArrowDown', ArrowDownIcon],
	['ArrowLeft', ArrowLeftIcon],
	['ArrowUp', ArrowUpIcon],
	['Check', CheckIcon],
	['EmptyStar', EmptyStarIcon],
	['HamBurger', HamBurgerIcon],
	['MagnifyingGlass', MagnifyingGlassIcon],
	['Moon', MoonIcon],
	['Photo', PhotoIcon],
	['Shuffle', ShuffleIcon],
	['Star', StarIcon],
	['Sun', SunIcon],
	['XCircle', XCircleIcon],
	['XMark', XMarkIcon],
] as const;

const meta = {
	title: 'Components/Icons',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
	render: () => (
		<VStack className="gap-4">
			{ICONS.map(([name, Icon]) => (
				<HStack key={name} className="gap-4 items-center">
					<Icon />
					<Text>{name}</Text>
				</HStack>
			))}
		</VStack>
	),
};
