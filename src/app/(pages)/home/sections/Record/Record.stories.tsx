import type { Meta, StoryObj } from "@storybook/react";
import Record from "./Record";

const meta: Meta<typeof Record> = {
    title: "Record",
    component: Record,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Record>;

export const Default: Story = {};
