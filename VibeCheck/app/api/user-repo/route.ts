import { NextResponse } from "next/server";
import { db, repositories } from "@/db";

export async function POST(request: Request) {
    try {
        const { repoId, userId, name, full_name, private: isPrivate, html_url, description, updated_at, owner } = await request.json();

        const result = await db.insert(repositories).values({
            repoId: String(repoId),
            userId,
            name,
            full_name,
            private: String(isPrivate),
            html_url,
            description,
            owner: owner?.login || owner, // depending on how owner is passed
        }).returning();

        return NextResponse.json(result[0]);
    } catch (e: any) {
        console.error("Error inserting repo:", e);
        // Extract specific Postgres error properties
        const errorDetails = {
            message: e.message,
            code: e.code,
            detail: e.detail,
            hint: e.hint,
            cause: e.cause ? String(e.cause) : null,
            fullError: String(e)
        };
        return NextResponse.json(errorDetails, { status: 200 });
    }
}