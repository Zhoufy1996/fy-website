import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import dbConfig from './config/db.json';
import { createConnection } from 'typeorm';
import { User } from './user/user.entity';
import { encrypt } from './shared/utils/crypto';
import { SortEntity } from './sort/sort.entity';
import { ShortNote } from './shortnote/shortNote.entity';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:4500'],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('文档')
    .setDescription('The cats API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

const runDbScripts = async () => {
  const connection = await createConnection({
    type: dbConfig.type as 'mysql',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    entities: [User, SortEntity, ShortNote],
  });

  const adminUser = await connection.manager.find(User, {
    username: 'Zhou1996',
  });

  if (adminUser == null) {
    const user = new User();
    user.username = 'Zhou1996';
    user.password = encrypt('Zhou1996');
    await connection.manager.save(user);
  }

  await connection.close();
  return console.log('脚本执行完毕');
};

const init = async () => {
  await runDbScripts();
  await bootstrap();
};

init();
