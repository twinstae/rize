import React, { useState } from 'react';
import ProfileImage from '../components/ProfileImage';
import { Button, TextInput, VStack } from '../components/rize-ui-web';

function Chat({
	name,
	image,
	message,
	time,
	position = 'start',
	first = false,
	last = false,
}: {
	name: string;
	image: string;
	message: string;
	time: Date;
	position?: 'start' | 'end';
	first?: boolean;
	last?: boolean;
}) {
	return (
		<li className={`chat chat-${position} ${last ? 'chat-last' : ''} p-0`}>
			<div className="chat-image avatar">
				<div className="w-8 h-8">{first && <ProfileImage member={image} size="sm" />}</div>
			</div>
			{first && (
				<div className="chat-header">
					{name}
					<time className="text-xs opacity-50">{time.toLocaleTimeString()}</time>
				</div>
			)}
			<div className={`chat-bubble ${position === 'start' ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}>
				{message}
			</div>
		</li>
	);
}

function ChatGroup({
	name,
	image,
	time,
	messages,
	position,
}: {
	name: string;
	image: string;
	time: Date;
	messages: string[];
	position?: 'start' | 'end';
}) {
	return (
		<VStack className="gap-1">
			{messages.map((message, i) => (
				<Chat
					key={message+i}
					name={name}
					image={image}
					time={time}
					message={message}
					first={i === 0}
					last={i === messages.length - 1}
					position={position}
				/>
			))}
		</VStack>
	);
}

function ChatForm({ sendMessage }: { sendMessage: (message: string) => void }) {
	const [messageInput, setMessageInput] = useState<string>('');
	return (
		<form
			className="w-full flex gap-1"
			onSubmit={(e) => {
				e.preventDefault();
				sendMessage(messageInput);
				setMessageInput('');
			}}
		>
			<TextInput
				type="text"
				name="message"
				className="w-full"
				value={messageInput}
				onChange={(event) => {
					setMessageInput(event.currentTarget.value);
				}}
			/>
			<Button type="submit">보내기</Button>
		</form>
	);
}

function ChatPage() {
	const [wizoneMessages, setWizoneMessages] = useState<string[]>([]);

	return (
		<VStack className="p-2 h-screen w-full bg-purple-200 gap-2">
			<div className="text-center">
				<span className="badge bg-slate-400 bg-opacity-60 text-white border-none text-sm p-3">오늘</span>
			</div>
			<ChatGroup
				name="장원영"
				image="장원영"
				time={new Date()}
				messages={[
					'그래두 만나서 너무 좋았어 위즈원ㅎㅎ',
					'기다려서 내가 더 보고 시펐징?',
					'보고싶었는데 연락해서 좋았어',
					'안녕',
				]}
			/>
			<ChatGroup name="위즈원" image="" messages={wizoneMessages} time={new Date()} position="end" />
			<ChatForm
				sendMessage={(message) => {
					setWizoneMessages((old) => {
						if (message) {
							return [...old, message];
						}
						return old;
					});
				}}
			/>
		</VStack>
	);
}

export default ChatPage;
