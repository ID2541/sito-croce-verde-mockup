export type AppEnv = {
  DATABASE_URL: string;
};

export function getEnv(): AppEnv {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Missing required environment variable: DATABASE_URL");
  }

  return {
    DATABASE_URL: databaseUrl,
  };
}
