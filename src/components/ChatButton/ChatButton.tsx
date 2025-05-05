// src/components/ChatButton/ChatButton.tsx
"use client";

import ChatIcon from "@/assets/chat-icon.svg";

export default function ChatButton() {
    return (
        <button
            className={`
        fixed
        bottom-[100px]                 
        right-[calc((100vw-1152px)/2+116px)] /* 16px(padding)+100px 오프셋 */
        w-[72px] h-[72px]
        z-50 cursor-pointer
        drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
      `}
            aria-label="채팅하기"
        >
            <ChatIcon className="w-full h-full" />
        </button>
    );
}
