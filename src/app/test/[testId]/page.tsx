import TestDataClient from "./TestDataClient";

const TestIdPage = async ({ params }: { params: Promise<{ testId: string }> }) => {
    const { testId } = await params;

    return (
        <>
            <TestDataClient testId={testId} />
        </>
    );
};

export default TestIdPage;
