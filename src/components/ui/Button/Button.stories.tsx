import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    title: "ui/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        color: {
            control: { type: "select" },
            options: ["neutral", "orange", "green", "destructive", "primary", "ghost"],
            defaultValue: "primary",
            description: "Pre-defined 컬러",
        },
        padding: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            defaultValue: "md",
            description: "sm(4, 12), md(6, 14), lg(8, 20) [단위: px]",
        },
        round: {
            control: { type: "radio" },
            options: ["sm", "md", "lg", "pill"],
            defaultValue: "lg",
            description: "Border radius: sm(4), md(6), lg(8), pill [단위: px]",
        },
        children: {
            control: "text",
            defaultValue: "버튼입니당",
            description: "버튼에 들어갈 텍스트",
        },
        asChild: { table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        color: "primary",
        padding: "md",
        round: "lg",
        children: "버튼입니당",
    },
};

export const HeaderAction: Story = {
    render: () => (
        <div className="flex gap-5">
            <Button color="orange">지원하기</Button>
            <Button color="neutral">로그인</Button>
        </div>
    ),
};
