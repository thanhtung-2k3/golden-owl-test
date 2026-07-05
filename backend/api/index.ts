import app from "../src/app";
import { initializeDatabase } from "../src/config/database";
import "pg";


let initialized = false;

export default async function handler(req, res) {

    if (!initialized) {
        await initializeDatabase();
        initialized = true;
    }

    return app(req, res);
}