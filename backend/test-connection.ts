import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({});

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });


    try {
        console.log("Connecting to PostgreSQL...");
        const client = await pool.connect();
        console.log("✅ Connected successfully!");
        client.release();
    } catch (err: Error | unknown) {
        console.error("❌ Failed to connect:", (err as Error)?.message);
    } finally {
        await pool.end();
    }
}

main();
