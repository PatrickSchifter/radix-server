import dotenv from "dotenv";

dotenv.config();

function parseDatabaseUrl(url: string) {
  try {
    const dbUrl = new URL(url);
    return {
      user: dbUrl.username,
      password: dbUrl.password,
      host: dbUrl.hostname,
      port: dbUrl.port || "5432",
      database: dbUrl.pathname.split("/")[1],
    };
  } catch (error) {
    console.error("Invalid DATABASE_URL:", error);
    process.exit(1);
  }
}

export const config = {
  database: {
    ...parseDatabaseUrl(process.env.DATABASE_URL || ""),
  },
  server: {
    port: process.env.PORT || 3030,
    env: process.env.NODE_ENV || "development",
    base_url: process.env.BASE_URL || "http://localhost:" + process.env.PORT,
  },
  secrets: {
    secretJwt: process.env.SECRET_JWT || "",
  },
  company: {
    name: process.env.COMPANY_NAME || "",
  },
};
