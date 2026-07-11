import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('gh_token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Github token not found' }, { status: 401 });
    }

    const allRespo = [];
    let page = 1;

    while (true) {
        const res = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            }
        });

        const respos = await res.json();
        if (!respos?.length) break;
        allRespo.push(...respos);
        page++;
    }

    return NextResponse.json(allRespo.map((r: any) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        private: r.private,
        html_url: r.html_url,
        description: r.description,
        created_at: r.created_at,
        default_branch: r.default_branch,
        language: r.language,
        owner: r.owner.login,
    })));
}