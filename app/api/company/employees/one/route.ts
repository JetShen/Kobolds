import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const companyId = url.searchParams.get("companyId");
        const name = url.searchParams.get("name");
        
        if (!companyId) {
            return NextResponse.json(
                { message: "companyId is required" },
                { status: 400 }
            );
        }

        const employee = await db.user.findFirst({
            where: {
                companyId: companyId,
                name: name
            }
        });

        console.log(employee);

        return NextResponse.json(
            { employee: employee },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}