import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const companyId = url.searchParams.get("companyId");
        const teamId = url.searchParams.get("teamId");

        if (!companyId) {
            return NextResponse.json(
                { message: "companyId is required" },
                { status: 400 }
            );
        }

        const employees = await db.user.findMany({
            where: {
                companyId: companyId,
                teamId: teamId
            }
        });

        console.log(employees);

        return NextResponse.json(
            { employees: employees },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}