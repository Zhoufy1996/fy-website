import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import config from './config';
import { createConnection } from 'typeorm';
import { User } from './user/user.entity';
import { encrypt } from './core/utils/crypto';
import { SortEntity } from './sort/sort.entity';
import { ShortNoteEntity } from './shortnote/shortNote.entity';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: config.origin,
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

  await app.listen(config.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

const runDbScripts = async () => {
  const connection = await createConnection({
    type: config.db.type as 'mysql',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    entities: [User, SortEntity, ShortNoteEntity],
  });

  const adminUser = await connection.manager.find(User, {
    username: config.user.username,
  });

  if (adminUser == null) {
    const user = new User();
    user.username = config.user.username;
    user.password = encrypt(config.user.password);
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
