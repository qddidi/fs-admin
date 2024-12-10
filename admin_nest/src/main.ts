import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OperationLogInterceptor } from './common/interceptor/log/log.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('FS_ADMIN') // 标题
    .setDescription('后台管理系统接口文档') // 描述
    .setVersion('1.0') // 版本
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //配置swgger地址
  SwaggerModule.setup('/fs_admin/api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());

  //app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // 静态资源
  app.useStaticAssets('static', {
    prefix: '/static',
  });
  await app.listen(3000);
}
bootstrap();
