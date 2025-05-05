"use client";

import Logo from "./Logo";

export default function Intro() {
    return (
        <section
            className={`relative left-1/2 -translate-x-1/2 w-screen h-[766px]
         bg-[#0D0D0D]
         bg-[radial-gradient(ellipse_at_center_bottom,_rgba(255,122,0,0.85)_0%,_rgba(13,13,13,1)_42%)]
         overflow-visible`}
        >
            {/* 바닥 오렌지 라인 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[654px] h-[2px] bg-[#FF7A00] z-10" />

            {/* 콘텐츠 영역 */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full gap-10 px-4">
                {/* 로고 */}
                <Logo />

                {/* 타이틀 텍스트 */}
                <div className="text-center text-white text-[54px] leading-tight font-extrabold">
                    <p>실전으로 성장하는 최고의 경험,</p>
                    <p>
                        멋사와 함께 <span className="text-white">A to Z</span>
                    </p>
                </div>

                {/* 버튼 */}
                <button className="bg-[#FF7A00] text-white text-[18px] font-medium rounded-full px-6 py-3">
                    14기 모집 알림 신청 →
                </button>
            </div>
        </section>
    );
}
