import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ArticleModule } from './article/article.module';
import { ArticleEntity } from './article/article.entity';
import { LeetcodeModule } from './leetcode/leetcode.module';
import { LeetcodeEntity } from './leetcode/leetcode.entity';
import { TaskModule } from './task/task.module';
import { ShortnoteModule } from './shortnote/shortnote.module';
import { SortModule } from './sort/sort.module';
import dbConfig from './config/db.json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type as 'mysql',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [User, ArticleEntity, LeetcodeEntity],
      synchronize: true,
      cache: true,
    }),
    UserModule,
    ArticleModule,
    LeetcodeModule,
    TaskModule,
    ShortnoteModule,
    SortModule,
  ],
})
export class AppModule {}
