import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/core/guard/jwt.strategy';
import { SortService } from 'src/sort/sort.service';
import { ShortNoteController } from './shortNote.controller';
import { ShortNote } from './shortNote.entity';
import { ShortNoteService } from './shortNote.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortNote])],
  controllers: [ShortNoteController],
  providers: [ShortNoteService, JwtStrategy, SortService],
})
export class ShortnoteModule {}
