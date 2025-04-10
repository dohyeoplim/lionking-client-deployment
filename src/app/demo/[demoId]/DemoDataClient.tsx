"use client";

import { useDemoDataWithId } from "@/api/test/useDemoData";

export default function DemoDataClient({ demoId }: { demoId: string }) {
    const { data, error, isLoading } = useDemoDataWithId(Number(demoId));

    if (error) {
        return <div>Error loading test data</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div>
            <h1>Test ID: {data.id}</h1>
        </div>
    );
}
