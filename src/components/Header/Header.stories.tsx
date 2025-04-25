import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
    title: "Header",
    component: Header,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
    render: () => (
        <div className="max-w-7xl mx-auto px-4">
            <Header />
        </div>
    ),
};
