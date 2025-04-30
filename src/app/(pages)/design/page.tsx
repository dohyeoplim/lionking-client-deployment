const colorVariants = [
    "bg-orange-main",
    "bg-orange-light-1",
    "bg-orange-light-2",
    "bg-orange-dark-1",
    "bg-orange-dark-2",
    "bg-orange-dark-3",
    "bg-gray-1",
    "bg-gray-2",
    "bg-gray-3",
    "bg-gray-4",
    "bg-gray-5",
    "bg-gray-6",
    "bg-gray-7",
    "bg-gray-8",
    "bg-static-white",
    "bg-static-white-20",
    "bg-static-white-50",
    "bg-static-white-70",
    "bg-static-black",
    "bg-static-black-20",
    "bg-static-black-50",
    "bg-static-black-70",
];

const textClasses = [
    "headline-1",
    "headline-2",
    "intro-1",
    "subtitle-1",
    "subtitle-2",
    "subtitle-3",
    "subtitle-4",
    "body-1",
    "body-2",
    "body-3",
    "body-4",
    "body-5",
];

export default function DesignSystemDisplay() {
    return (
        <div className="pt-8 pb-20 space-y-20">
            <section>
                <h2 className="text-2xl font-light">Color Palette</h2>
                <hr className="mt-4 mb-10" />
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {colorVariants.map((token) => (
                        <div key={token} className="flex flex-col items-center">
                            <div className={`w-16 h-16 rounded shadow ${token}`} />
                            <span className="text-xs mt-2 text-center">
                                {token.replace("bg-", "")}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-light">Typography</h2>
                <hr className="mt-4 mb-10" />
                <div className="space-y-4">
                    {textClasses.map((cls) => (
                        <div key={cls} className={cls}>
                            {cls}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
