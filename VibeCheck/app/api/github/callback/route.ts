import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
        return NextResponse.redirect(new URL('/workspace?error=code_not_found', req.url));
    }

    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'content-type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            redirect_uri: process.env.GITHUB_REDIRECT_URI!,
            code
        })
    })
    const data = await res.json();
    console.log('GitHub Token Exchange Response:', data);
    
    const token = data.access_token;
    if (!token) {
        return NextResponse.redirect(new URL('/workspace?error=token_exchange_failed', req.url))
    }
    const response = NextResponse.redirect(new URL('/workspace', req.url));
    response.cookies.set('gh_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7  // 1 week
    })
    return response;
}