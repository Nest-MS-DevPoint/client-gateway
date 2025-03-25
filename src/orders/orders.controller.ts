import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto, OrderPagination, StatusDto, UpdateOrderDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {

  private logger = new Logger('Gateway Order');

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.log('Create Order: ', createOrderDto)
    return this.client.send('createOrder', createOrderDto)
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

  @Get()
  findAll(
    @Query() orderPaginationDTO: OrderPagination
  ) {
    this.logger.log('Find all orders', orderPaginationDTO)
    return this.client.send('findAllOrders', orderPaginationDTO)
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.log('Find one order', id)
    return this.client.send('findOneOrder', {id})
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

  @Get(':status')
  findOrderByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    this.logger.log('Find one order', {paginationDto,statusDto})
    return this.client.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    })
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

  @Patch(':id')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    return this.client.send('changeOrderStatus', {id, status: statusDto.status})
      .pipe(
        catchError(err => {throw new RpcException(err)})
      )
  }
}
