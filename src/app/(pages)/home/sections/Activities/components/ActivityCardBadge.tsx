type ActivityCardBadgeProps = {
    text: string;
    focused?: boolean;
};

export default function ActivityCardBadge({ text, focused }: ActivityCardBadgeProps) {
    const badgeStyle = focused ? "bg-orange-main" : "bg-static-white-20 border border-white";
    return (
        <div
            className={`relative flex items-center justify-center w-fit h-fit px-4.5 py-2 md:px-5 md:py-2.5 ${badgeStyle} rounded-full transition-colors duration-200`}
        >
            <p className="sub3_sb text-white">{text}</p>
        </div>
    );
}
