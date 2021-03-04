import { Module } from '@nestjs/common';
import { ShortnoteController } from './shortnote.controller';
import { ShortnoteService } from './shortnote.service';

@Module({
  controllers: [ShortnoteController],
  providers: [ShortnoteService]
})
export class ShortnoteModule {}
