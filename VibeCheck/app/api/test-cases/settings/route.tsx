import { db } from "@/db";
import { TestCasesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { testCaseId, title, description, targetRoute, expectedResult } = body;

        const result = await db.update(TestCasesTable)
            .set({
                title,
                description,
                targetRoute,
                expectedResult
            })
            .where(eq(TestCasesTable.id, testCaseId))
            .returning();

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error updating test case:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
