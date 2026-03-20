import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

type HealthSuccessResponse = {
  status: "ok";
  timestamp: string;
};

type HealthErrorResponse = {
  status: "error";
  timestamp: string;
  message: string;
};

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    await prisma.$queryRaw`SELECT 1`;

    const payload: HealthSuccessResponse = {
      status: "ok",
      timestamp,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Healthcheck failed", error);

    const payload: HealthErrorResponse = {
      status: "error",
      timestamp,
      message: "Service unavailable",
    };

    return NextResponse.json(payload, { status: 503 });
  }
}
