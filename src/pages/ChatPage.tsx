import React from 'react';
import ProfileImage from '../components/ProfileImage';
import { VStack } from '../components/rize-ui';

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
    <div className={`chat chat-${position} ${last ? 'chat-last' : ''} p-0`}>
      <div className="chat-image avatar">
        <div className="w-8 h-8">
          {first && <ProfileImage member={image} size="sm" />}
        </div>
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
    </div>
  );
}

function ChatPage() {
  return (
    <VStack className="p-2 h-screen w-full bg-purple-200 gap-1">
      <div className="text-center">
        <span className="badge bg-slate-400 bg-opacity-60 text-white border-none text-sm p-3">오늘</span>
      </div>
      <Chat
        name="장원영"
        image="장원영"
        message="그래두 만나서 너무 좋았어 위즈원ㅎㅎ"
        time={new Date()}
        first={true}
      />
      <Chat
        name="장원영"
        image="장원영"
        message="기다려서 내가 더 보고 시펐징?"
        time={new Date()}
      />
      <Chat
        name="장원영"
        image="장원영"
        message="보고싶었는데 연락해서 좋았어"
        time={new Date()}
      />
      <Chat
        name="장원영"
        image="장원영"
        message="안녕"
        time={new Date()}
        last={true}
      />
      <Chat
        name="위즈원"
        image=""
        message="오늘도 화이팅"
        time={new Date()}
        position="end"
        first={true}
        last={true}
      />
    </VStack>
  );
}

export default ChatPage;
