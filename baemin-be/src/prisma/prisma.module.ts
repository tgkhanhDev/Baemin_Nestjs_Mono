import { Global, Module } from '@nestjs/common';
import { PrismaPostgresService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaPostgresService],
  exports: [PrismaPostgresService]
})
export class PrismaModule {}
