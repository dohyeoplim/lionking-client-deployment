import LionOrange from "@/assets/st_type_logo.svg";
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            aria-label="서울과학기술대학교 멋쟁이사자처럼 홈페이지"
            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-main"
        >
            <LionOrange alt="서울과학기술대학교 멋쟁이사자처럼 대학 로고" />
        </Link>
    );
}
