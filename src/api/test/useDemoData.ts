import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

type DemoData = {
    id?: number;
    message?: string;
};

export const useDemoData = () => useSWR<DemoData>(`/api/v1/demo`, fetcher);
export const useDemoDataWithId = (id: number) => useSWR<DemoData>(`/api/v1/demo/${id}`, fetcher);
