import { getUserSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const bodyParser = z.object({
    display_name: z.string().min(2).max(32),
});

export async function POST(request: NextRequest) {
    const user = await getUserSession();
    if (!user) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();
        const { display_name } = bodyParser.parse(body);

        console.log({ display_name: display_name });

        const updated = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: display_name,
            },
        });

        console.log({ updatedName: updated.name });

        return NextResponse.json("Updated", { status: 200 });
    } catch (error) {
        return NextResponse.json("Invalid parameters.", { status: 400 });
    }
}
