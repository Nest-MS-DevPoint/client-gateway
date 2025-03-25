import { Body, Controller, Delete, Get, Inject, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {

  private logger = new Logger('Gateway Product')
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
    this.logger.log(createProductDto)
    return this.client.send({cmd : 'create_product'}, createProductDto)
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ){
    return this.client.send({cmd : 'find_all'}, paginationDto)
      .pipe(
        catchError(err => {throw new RpcException(err)})
      )
  }

  @Get(':id')
  findOne(@Param('id') id:number){

    return this.client.send({cmd : 'find_one'}, {id: id})
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )

    // try{
    //   const product = await firstValueFrom(this.productsClient.send({cmd : 'find_one'}, {id: id}))
    //   this.logger.log(id)
    //   return product;
    // }catch(error){
    //   this.logger.log('this is error: ', error)
    //   throw new RpcException(error)
    // }
  }

  @Delete(':id')
  delete(@Param('id') id:number){
    return this.client.send({cmd : 'remove'}, {id: id})
      .pipe(
        catchError(err => {throw new RpcException(err)})
      )
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto
    ){
      const product = {id: id, ...updateProductDto}
    return this.client.send({cmd : 'update'}, product)
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

}
