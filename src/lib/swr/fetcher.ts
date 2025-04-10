const BASE_URL =
    typeof window !== "undefined"
        ? process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
        : "";

export const fetcher = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(`${BASE_URL}${url}`, init);

    if (!response.ok) {
        throw new Error(`Fetch Error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
};
