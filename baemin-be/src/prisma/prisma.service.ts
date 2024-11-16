import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prismas/client-postgres';

@Injectable()
export class PrismaPostgresService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect();
    }
}
