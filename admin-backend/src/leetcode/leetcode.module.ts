import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeetcodeController } from './leetcode.controller';
import { LeetcodeEntity } from './leetcode.entity';
import { LeetcodeService } from './leetcode.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeetcodeEntity])],
  controllers: [LeetcodeController],
  providers: [LeetcodeService],
})
export class LeetcodeModule {}
