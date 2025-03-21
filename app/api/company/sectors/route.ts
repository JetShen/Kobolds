import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const companyId = url.searchParams.get("companyId");

        if (!companyId) {
            return NextResponse.json(
                { message: "companyId is required" },
                { status: 400 }
            );
        }

        const sectors = await db.sector.findMany({
            where: {
                companyId
            }
        });

        return NextResponse.json(
            { sectors: sectors },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}