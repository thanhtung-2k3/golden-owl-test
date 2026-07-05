import app from "../app";
import { initializeDatabase } from "../config/database";

let initialized = false;

export default async function handler(req, res) {

    if (!initialized) {
        await initializeDatabase();
        initialized = true;
    }

    return app(req, res);
}