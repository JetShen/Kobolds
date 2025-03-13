import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      const assignee = await db.user.findFirst({
        where: {
          name: body.assignee,
          companyId: body.companyId,
        },
      });
  
      const team = await db.team.findFirst({
        where: {
          name: body.team,
          companyId: body.companyId,
        },
      });
  
      const sector = await db.sector.findFirst({
        where: {
          name: body.sector,
          companyId: body.companyId,
        },
      });
  
      const newTask = await db.activity.create({
        data: {
          title: body.title,
          description: body.description,
          status: body.status,
          priority: body.priority,
          dueDate: body.dueDate,
          assigneeId: assignee?.id || null,
          companyId: body.companyId,
          teamId: team?.id || null,
          sectorId: sector?.id || null,
        },
      });
  
      return NextResponse.json(
        { task: newTask, message: "Task created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Task creation error:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }