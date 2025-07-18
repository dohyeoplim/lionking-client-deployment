"use client";

import { useRef, useEffect, useState } from "react";
import { useHorizontalLoop } from "@/hooks/animations/useHorizontalLoop";
import { motion, MotionProps } from "motion/react";
import NewsCard from "./components/NewsCard";
import { News } from "@/types";

type NewsCardListProps = {
    items: News[];
    speed?: number;
};

export default function NewsCardList({ items, speed = 100 }: NewsCardListProps) {
    const groupRef = useRef<HTMLDivElement>(null);
    const [groupWidth, setGroupWidth] = useState(0);

    useEffect(() => {
        if (groupRef.current) {
            setGroupWidth(groupRef.current.offsetWidth);
        }
    }, [items]);

    const { x, setPaused } = useHorizontalLoop({
        speed,
        width: groupWidth,
    });

    const handleMouseEnter = () => setPaused(true);
    const handleMouseLeave = () => setPaused(false);
    const handleDragStart = () => setPaused(true);
    const handleDragEnd: MotionProps["onDragEnd"] = (_event, info) => {
        x.set(x.get() + info.offset.x);
        setPaused(false);
    };

    const allItems = [...items, ...items, ...items, ...items];

    return (
        <>
            <div className="w-screen">
                <h2 className="w-full max-w-[1100px] text-white head3_sb mx-auto">
                    멋사의 최근 소식
                </h2>
            </div>

            <div
                className="relative w-screen py-4 overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    ref={groupRef}
                    className="flex gap-x-9"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -groupWidth, right: 0 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {allItems.map((item, i) => (
                        <div key={i}>
                            <NewsCard {...item} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </>
    );
}
