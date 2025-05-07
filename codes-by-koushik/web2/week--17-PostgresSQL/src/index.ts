import { Client } from "pg";

const pgclient = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

// const pgclient =new Client({"postgresql://neondb_owner:npg_gY7Z2MFyPGrn@ep-withered-wave-a41g07os-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"});

pgclient.connect();

console.log("PostgreSQL connected successfully");

async function main() {
  try {
    const result = await pgclient.query("SELECT * FROM USERS;");
    console.log(result.rows);
  } catch (err) {
    console.error("Error:", err);
  }
}
main();
