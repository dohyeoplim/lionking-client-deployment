import Button from "@/components/ui/Button";

export default function Actions() {
    return (
        <div className="flex gap-5" role="group" aria-label="동아리 지원 및 로그인 버튼">
            <Button color="orange" type="button">
                지원하기
            </Button>
            <Button color="neutral" type="button">
                로그인
            </Button>
        </div>
    );
}
