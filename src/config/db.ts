import "dotenv/config";
import mysql from "mysql2";

const connection = mysql.createConnection(process.env.DATABASE_URL ?? "");

export default connection.promise();
