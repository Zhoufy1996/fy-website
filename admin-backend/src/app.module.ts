import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ArticleModule } from './article/article.module';
import { ArticleEntity } from './article/article.entity';
import { LeetcodeModule } from './leetcode/leetcode.module';
import { LeetcodeEntity } from './leetcode/leetcode.entity';
import { TaskModule } from './task/task.module';
import { ShortNoteModule } from './shortnote/ShortNoteEntity.module';
import { SortModule } from './sort/sort.module';
import config from './config.json';
import { ShortNoteEntity } from './shortnote/shortNote.entity';
import { SortEntity } from './sort/sort.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.db.type as 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
      entities: [User, ArticleEntity, LeetcodeEntity, ShortNoteEntity, SortEntity],
      synchronize: true,
      cache: true,
    }),
    UserModule,
    ArticleModule,
    LeetcodeModule,
    TaskModule,
    ShortNoteModule,
    SortModule,
  ],
})
export class AppModule {}
