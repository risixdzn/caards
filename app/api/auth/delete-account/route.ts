import { getAuthSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const session = await getAuthSession();

    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    await prisma.user.delete({
        where: {
            id: session.user.id,
        },
    });

    //development ones
    cookies().delete("next-auth.session-token");
    cookies().delete("next-auth.callback-url");
    cookies().delete("next-auth.csrf-token");
    //production ones
    cookies().delete("__Secure-next-auth.session-token");
    cookies().delete("__Secure-next-auth.callback-url");
    cookies().delete("__Host-next-auth.csrf-token");
    return NextResponse.json("Deleted", { status: 200 });
}
