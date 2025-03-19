import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { IsEnum, IsOptional } from "class-validator";


export class OrderPagination extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Valid status are ${OrderStatusList}`
    })
    status: OrderStatus
}