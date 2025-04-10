import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

type TestData = {
    id: number;
};

export const useTestData = (id: number) => useSWR<TestData>(`/api/v1/test/${id}`, fetcher);
