import { newDeckFormSchema } from "@/components/Dashboard/Decks/NewDeckDrawer";
import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { APIUnauthorized } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const user = await getUserSession();
    if (!user) {
        return APIUnauthorized;
    }

    const decks = await prisma.deck.findMany({
        where: {
            userId: user.id,
        },
    });

    return NextResponse.json(decks, { status: 200 });
}

export async function POST(request: NextRequest) {
    const user = await getUserSession();
    if (!user) {
        return APIUnauthorized;
    }

    try {
        const body = await request.json();
        const { title, description } = body;
        const deck = await prisma.deck.create({
            data: {
                title: title,
                description: description,
                userId: user.id,
            },
        });
        return NextResponse.json(deck, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
