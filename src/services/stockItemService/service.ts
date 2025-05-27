import { BaseService } from "../api";

export class BaseStockItemService extends BaseService {}

export const StockItemService = new BaseStockItemService("/stock-item");
