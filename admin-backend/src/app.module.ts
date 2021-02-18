import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ArticleModule } from './article/article.module';
import { ArticleEntity } from './article/article.entity';
import { LeetcodeModule } from './leetcode/leetcode.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'gz-cdb-bi30e49t.sql.tencentcdb.com',
      port: 59082,
      username: 'root',
      password: 'zhou1996',
      database: 'test',
      entities: [User, ArticleEntity],
      synchronize: true,
      cache: true,
    }),
    UserModule,
    ArticleModule,
    LeetcodeModule,
  ],
})
export class AppModule {}
