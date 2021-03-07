import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/core/guard/jwt.strategy';
import { SortModule } from 'src/sort/sort.module';
import { ShortNoteController } from './shortNote.controller';
import { ShortNoteEntity } from './shortNote.entity';
import { ShortNoteService } from './shortNote.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortNoteEntity]), SortModule],
  controllers: [ShortNoteController],
  providers: [ShortNoteService, JwtStrategy],
})
export class ShortNoteModule {}
