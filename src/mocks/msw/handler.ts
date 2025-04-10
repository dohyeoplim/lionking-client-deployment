import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("/api/v1/demo/", () => {
        return HttpResponse.json({
            message: "From mock server",
        });
    }),
    http.get("/api/v1/demo/:id", ({ params }) => {
        return HttpResponse.json({
            id: params.id,
        });
    }),
];
