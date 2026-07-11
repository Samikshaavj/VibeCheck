import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('gh_token')?.value;
    return NextResponse.json({ token })
}