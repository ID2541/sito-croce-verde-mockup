import { ApiError } from "@/lib/http/response";

type RateLimitOptions = {
  namespace: string;
  key: string;
  windowMs: number;
  maxRequests: number;
};

type Bucket = {
  count: number;
  expiresAt: number;
};

const buckets = new Map<string, Bucket>();

function getBucketId(namespace: string, key: string): string {
  return `${namespace}:${key}`;
}

function pruneExpiredBuckets(now: number): void {
  for (const [bucketId, bucket] of buckets.entries()) {
    if (bucket.expiresAt <= now) {
      buckets.delete(bucketId);
    }
  }
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("fly-client-ip") ??
    "unknown"
  );
}

export function enforceRateLimit(options: RateLimitOptions): void {
  const now = Date.now();
  const bucketId = getBucketId(options.namespace, options.key);
  pruneExpiredBuckets(now);

  const current = buckets.get(bucketId);

  if (!current || current.expiresAt <= now) {
    buckets.set(bucketId, {
      count: 1,
      expiresAt: now + options.windowMs,
    });
    return;
  }

  if (current.count >= options.maxRequests) {
    throw new ApiError(429, "RATE_LIMITED", "Too many requests");
  }

  current.count += 1;
}
