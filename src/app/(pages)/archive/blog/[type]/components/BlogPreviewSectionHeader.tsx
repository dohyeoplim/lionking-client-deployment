type BlogPreviewSectionHeaderProps = {
    selectedBlogTypeLabel: string;
};

export default function BlogPreviewSectionHeader({
    selectedBlogTypeLabel,
}: BlogPreviewSectionHeaderProps) {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-[17px] ">
            <h2 className="head3_sb text-black">{selectedBlogTypeLabel}</h2>
            <p className="body3_m text-gray-5">
                {selectedBlogTypeLabel == "세션"
                    ? "파트별 운영진을 필두로 진행되는 세션 내용을 나눕니다."
                    : "파트별 아기사자들의 자율 스터디 내용과 노하우를 나눕니다."}
            </p>
        </div>
    );
}
