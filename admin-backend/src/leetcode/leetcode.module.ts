import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/core/guard/jwt.strategy';
import { LeetcodeController } from './leetcode.controller';
import { LeetcodeEntity } from './leetcode.entity';
import { LeetcodeService } from './leetcode.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeetcodeEntity])],
  controllers: [LeetcodeController],
  providers: [LeetcodeService, JwtStrategy],
})
export class LeetcodeModule {}
