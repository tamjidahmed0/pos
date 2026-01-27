import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { StatsModule } from './stats/stats.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [AuthModule, PrismaModule, ProductModule, ConfigModule.forRoot(), SaleModule, StatsModule,
    JwtModule.register({
      global: true,
      secret:  process.env.JWT_SECRET ,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      {path: 'auth/create-user', method: RequestMethod.POST},
      {path: 'auth/sign-in', method : RequestMethod.POST}
    )
    .forRoutes('*')
  }
}
