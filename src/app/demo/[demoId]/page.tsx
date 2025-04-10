import DemoDataClient from "./DemoDataClient";

const DemoIdPage = async ({ params }: { params: Promise<{ demoId: string }> }) => {
    const { demoId } = await params;

    return (
        <>
            <DemoDataClient demoId={demoId} />
        </>
    );
};

export default DemoIdPage;
