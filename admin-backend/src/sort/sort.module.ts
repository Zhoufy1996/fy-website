import { Module } from '@nestjs/common';
import { SortController } from './sort.controller';
import { SortService } from './sort.service';

@Module({
  controllers: [SortController],
  providers: [SortService]
})
export class SortModule {}
