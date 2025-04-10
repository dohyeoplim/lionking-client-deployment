import clsx from "clsx";

export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    loading?: boolean;
    loadingText?: string;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    style?: React.CSSProperties;
}

const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
};

const variantClasses = {
    primary: "bg-zinc-600 hover:bg-blue-700 text-white",
    secondary: "bg-zinc-200 hover:bg-gray-300 text-gray-800",
};

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    className,
    variant = "primary",
    size = "medium",
    loading = false,
    loadingText = "Loading...",
    type = "button",
    fullWidth = false,
    style,
    ...rest
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            style={style}
            className={clsx(
                "inline-flex items-center justify-center rounded font-medium transition-colors duration-200",
                sizeClasses[size],
                variantClasses[variant],
                {
                    "w-full": fullWidth,
                    "opacity-60 cursor-not-allowed": disabled || loading,
                },
                className
            )}
            {...rest}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full" />
                    {loadingText}
                </span>
            ) : (
                <>{label}</>
            )}
        </button>
    );
};
