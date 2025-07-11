import { cva } from "class-variance-authority";

export type PostPreviewLayout =
    | "horizontal_fill_large"
    | "horizontal_fill_small"
    | "horizontal_compact"
    | "vertical_large"
    | "vertical_small"
    | "vertical_compact"
    | "vertical_compact_dark";

export const previewItemVariants = cva("w-full", {
    variants: {
        layout: {
            horizontal_fill_large:
                "flex flex-col sm:flex-row-reverse justify-between items-center w-full gap-6 py-9 rounded-sm overflow-hidden",
            horizontal_fill_small:
                "flex flex-col sm:flex-row-reverse items-center w-full gap-4 sm:gap-6 rounded-sm overflow-hidden",
            horizontal_compact:
                "flex flex-col sm:flex-row items-center justify-center w-full gap-4 rounded-sm overflow-hidden",

            vertical_large:
                "flex flex-col items-start justify-center w-full lg:max-w-[497px] gap-4 rounded-sm overflow-hidden",
            vertical_small:
                "flex flex-col items-start justify-center w-full lg:max-w-[332px] gap-4 rounded-sm overflow-hidden",
            vertical_compact:
                "flex flex-col items-start justify-center w-full lg:max-w-[332px] gap-4 rounded-sm overflow-hidden",
            vertical_compact_dark:
                "flex flex-col items-start justify-center w-full gap-4 border border-gray-5 rounded-[20px] overflow-hidden",
        },
    },
});

export const styleMap: Record<
    PostPreviewLayout,
    {
        part: string;
        title: string;
        desc: string;
        meta: string;
        partPosition?: "TOP" | "BOTTOM" | "NONE";
    }
> = {
    horizontal_fill_large: {
        part: "body3_m text-orange-main",
        title: "head5_sb text-gray-8",
        desc: "body3_r text-gray-5",
        meta: "body5_r text-gray-4",
        partPosition: "TOP",
    },
    horizontal_fill_small: {
        part: "sub4_sb text-orange-main",
        title: "sub1_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "body5_r text-gray-4",
        partPosition: "TOP",
    },
    horizontal_compact: {
        part: "body6_r text-orange-main",
        title: "sub2_sb text-gray-8",
        desc: "body4_r text-gray-5",
        meta: "body6_r text-gray-4",
        partPosition: "BOTTOM",
    },
    vertical_large: {
        part: "caption6_m text-orange-main",
        title: "sub1_sb text-gray-8",
        desc: "body3_r text-gray-5",
        meta: "caption6_r text-gray-4",
        partPosition: "BOTTOM",
    },
    vertical_small: {
        part: "body6_r text-orange-main",
        title: "sub2_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "body6_r text-gray-4",
        partPosition: "BOTTOM",
    },
    vertical_compact: {
        part: "",
        title: "sub2_sb text-gray-8",
        desc: "body4_m text-gray-5",
        meta: "caption7_m text-gray-4",
        partPosition: "NONE",
    },
    vertical_compact_dark: {
        part: "",
        title: "sub3_sb text-white",
        desc: "body6_r text-gray-3",
        meta: "caption8_m text-gray-3",
        partPosition: "NONE",
    },
};
