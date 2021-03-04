import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/core/guard/jwt.strategy';
import { SortController } from './sort.controller';
import { SortEntity } from './sort.entity';
import { SortService } from './sort.service';

@Module({
  imports: [TypeOrmModule.forFeature([SortEntity])],
  controllers: [SortController],
  providers: [SortService, JwtStrategy],
})
export class SortModule {}
