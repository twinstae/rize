import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import {
	Button,
	Checkbox,
	FormLabel,
	HStack,
	KBD,
	Radio,
	Text,
	TextInput,
	VStack,
} from './rize-ui-web';

const meta = {
	title: 'Components/rize-ui-web',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ButtonVariants: Story = {
	render: () => (
		<HStack className="gap-2">
			<Button>Primary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button circle="circle" size="sm">
				+
			</Button>
		</HStack>
	),
};

export const TextInputStory: Story = {
	render: function TextInputStory() {
		const [value, setValue] = useState('');
		return (
			<FormLabel>
				<Text>검색</Text>
				<TextInput
					type="search"
					name="search"
					size="sm"
					width="full"
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
				/>
			</FormLabel>
		);
	},
};

export const FormControls: Story = {
	render: () => (
		<VStack className="gap-4">
			<HStack className="gap-2 items-center">
				<Checkbox name="check" defaultChecked />
				<Text>Checkbox</Text>
			</HStack>
			<HStack className="gap-2 items-center">
				<Radio name="radio" value="a" defaultChecked />
				<Text>Radio A</Text>
				<Radio name="radio" value="b" />
				<Text>Radio B</Text>
			</HStack>
			<KBD>/</KBD>
		</VStack>
	),
};
