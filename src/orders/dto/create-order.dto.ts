import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator"
import { OrderStatus, OrderStatusList } from "../enum/order.enum"
import { Type } from "class-transformer"
import { OrderItemDto } from "./order-item.dto"

export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true }) // valida cada uno de los elementos
    @Type(() => OrderItemDto)
    items: OrderItemDto[]
    
    // @IsNumber()
    // @IsPositive()
    // totalAmount: number

    // @IsNumber()
    // @IsPositive()
    // totalItems: number

    // @IsEnum(OrderStatusList, {
    //     message: `Possible status are ${OrderStatusList}`
    // })
    // @IsOptional()
    // status: OrderStatus = OrderStatus.PENDING

    // @IsBoolean()
    // @IsOptional()
    // paid: boolean = false
}
