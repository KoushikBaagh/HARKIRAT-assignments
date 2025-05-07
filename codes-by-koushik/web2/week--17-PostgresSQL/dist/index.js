"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgclient = new pg_1.Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgres",
});
// const pgclient =new Client({"postgresql://neondb_owner:npg_gY7Z2MFyPGrn@ep-withered-wave-a41g07os-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"});
pgclient.connect();
console.log("PostgreSQL connected successfully");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pgclient.query("SELECT * FROM USERS;");
            console.log(result.rows);
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
}
main();
