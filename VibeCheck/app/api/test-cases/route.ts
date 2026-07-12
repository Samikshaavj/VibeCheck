import { db } from "@/db";
import { TestCasesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const repoId = searchParams.get("repoId");

    if (!repoId) {
        return NextResponse.json({ error: "repoId is required" }, { status: 400 });
    }

    try {
        const testCases = await db.select().from(TestCasesTable).where(eq(TestCasesTable.repoId, repoId));
        return NextResponse.json(testCases);
    } catch (error) {
        console.error("Error fetching test cases:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
