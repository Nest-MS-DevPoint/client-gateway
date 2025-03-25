import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NastModule } from './transports/nast.module';

@Module({
  imports: [ProductsModule, OrdersModule, NastModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
