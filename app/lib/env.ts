import "dotenv/config";
function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const ENV = {
  NODE_ENV: getEnvVar("NODE_ENV"),
  COOKIE_SECRET: getEnvVar("COOKIE_SECRET"),
  KEYSTONE_GRAPHQL_API_URL: getEnvVar("KEYSTONE_GRAPHQL_API_URL"),
  CLIENT_EMAIL: getEnvVar("CLIENT_EMAIL"),
  CLIENT_SECRET: getEnvVar("CLIENT_SECRET"),
};
