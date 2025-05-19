import Section from "@/components/ui/Section";
import CardNumberRow from "./components/CardNumberRow";
import RecordSectionBackground from "./components/RecordSectionBackground";

export default function Record() {
    return (
        <div className="relative w-screen left-1/2 transform -translate-x-1/2 h-screen overflow-hidden">
            <RecordSectionBackground />

            <Section
                displayName="Record"
                displayTitle={["서울과학기술대학교", "멋쟁이사자처럼이 걸어온 길"]}
                className="relative z-10"
            >
                <CardNumberRow />
            </Section>
        </div>
    );
}
