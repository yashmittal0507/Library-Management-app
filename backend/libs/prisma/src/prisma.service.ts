import 'dotenv/config'; // Load .env at the top
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _client: PrismaClient;
  private _pool: Pool;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Create a pg Pool using DATABASE_URL
    this._pool = new Pool({
      connectionString: databaseUrl,
    });

    // Create the Prisma adapter
    const adapter = new PrismaPg(this._pool);

    // Initialize PrismaClient with the adapter
    this._client = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this._client.$connect();
  }

  async onModuleDestroy() {
    await this._client.$disconnect();
    await this._pool.end();
  }

  // Expose model accessors so services can use this.prisma.user, etc.
  get user() {
    return this._client.user;
  }

  get author() {
    return this._client.author;
  }

  get book() {
    return this._client.book;
  }

  get borrowRecord() {
    return this._client.borrowRecord;
  }
}