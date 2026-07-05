import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const userResult = await db.select().from(users).where(
            eq(users.email, user?.primaryEmailAddress?.emailAddress ?? ''));
        if (userResult.length == 0) {
            const newUser = await db.insert(users).values({
                email: user?.primaryEmailAddress?.emailAddress ?? '',
                name: user?.fullName ?? 'New User'
            }).returning()
            return NextResponse.json({ user: newUser[0] });
        }
        else {
            return NextResponse.json({ user: userResult[0] })
        }
    }
    catch (e) {
        console.log("Error creating user: ", e);
        return NextResponse.json({ error: "Failed to create new user" }, { status: 500 });
    }
}