import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // En desarrollo Vite salta a 5174, 5175… si el puerto está ocupado, así que sin CORS_ORIGIN se acepta cualquier puerto local.
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? /^http:\/\/(localhost|127\.0\.0\.1):\d+$/,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`oro-planta-api listening on http://localhost:${port}`);
}

bootstrap();
