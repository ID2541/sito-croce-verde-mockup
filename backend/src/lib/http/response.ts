import { Prisma } from "@prisma/client";
import type { NextResponse } from "next/server";
import { NextResponse as ResponseBuilder } from "next/server";
import { ZodError } from "zod";

export type ApiErrorShape = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const DEFAULT_METHODS = "GET,POST,PATCH,DELETE,OPTIONS";
const DEFAULT_HEADERS = "Content-Type";

function resolveAllowedOrigin(request: Request): string | null {
  const requestOrigin = request.headers.get("origin");

  if (!requestOrigin) {
    return null;
  }

  const configuredOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

  if (requestOrigin === configuredOrigin) {
    return requestOrigin;
  }

  if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(requestOrigin)) {
    return requestOrigin;
  }

  return null;
}

function applyCorsHeaders(request: Request, headers: Headers, methods = DEFAULT_METHODS) {
  const allowedOrigin = resolveAllowedOrigin(request);

  if (!allowedOrigin) {
    return;
  }

  headers.set("Access-Control-Allow-Origin", allowedOrigin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", methods);
  headers.set("Access-Control-Allow-Headers", DEFAULT_HEADERS);
  headers.append("Vary", "Origin");
}

export function withCors(request: Request, response: NextResponse, methods?: string): NextResponse {
  applyCorsHeaders(request, response.headers, methods);
  return response;
}

export function preflight(request: Request, methods?: string): NextResponse {
  const response = new ResponseBuilder(null, { status: 204 });
  applyCorsHeaders(request, response.headers, methods);
  return response;
}

export function ok<T>(request: Request, payload: T, init?: ResponseInit): NextResponse<T> {
  const response = ResponseBuilder.json(payload, init);
  return withCors(request, response) as NextResponse<T>;
}

export function fail(
  request: Request,
  status: number,
  code: string,
  message: string,
  details?: unknown,
): NextResponse<ApiErrorShape> {
  const body: ApiErrorShape = {
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };

  const response = ResponseBuilder.json(body, { status });
  return withCors(request, response) as NextResponse<ApiErrorShape>;
}

export function handleError(request: Request, error: unknown): NextResponse<ApiErrorShape> {
  if (error instanceof ZodError) {
    return fail(request, 400, "VALIDATION_ERROR", "Invalid request payload", error.flatten());
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return fail(request, 409, "CONFLICT", "Resource already exists", error.meta);
    }

    if (error.code === "P2025") {
      return fail(request, 404, "NOT_FOUND", "Resource not found");
    }
  }

  if (error instanceof ApiError) {
    return fail(request, error.status, error.code, error.message, error.details);
  }

  console.error("Unhandled API error", error);
  return fail(request, 500, "INTERNAL_ERROR", "Unexpected server error");
}
