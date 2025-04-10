import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        label: "버튼",
        onClick: () => alert("clicked"),
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
    },
};

export const Loading: Story = {
    args: {
        variant: "primary",
        loading: true,
        loadingText: "처리 중...",
    },
};

export const Disabled: Story = {
    args: {
        variant: "primary",
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};
