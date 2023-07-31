import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService]
})
export class EmailModule {}
