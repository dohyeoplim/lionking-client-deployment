import LionOrange from "@/assets/likelion_univ_orange.svg";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" aria-label="서울과학기술대학교 멋쟁이사자처럼 홈페이지">
            <LionOrange className="h-4" alt="멋쟁이사자처럼 대학 로고" />
        </Link>
    );
}
