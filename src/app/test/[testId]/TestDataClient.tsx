"use client";

import { useTestData } from "@/api/test/useTestData";

export default function TestDataClient({ testId }: { testId: string }) {
    const { data, error, isLoading } = useTestData(Number(testId));

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
