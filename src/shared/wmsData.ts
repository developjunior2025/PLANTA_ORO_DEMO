/**
 * Tipo del módulo WMS/Inventario (Etapa 9.1 del plan). Los datos viven ahora
 * en PostgreSQL (server/) y se obtienen vía fetchStock() en shared/api.ts —
 * este módulo solo conserva la forma del dato para tipar la respuesta.
 * En Odoo 19 nativo corresponde a stock.warehouse/stock.location/stock.quant.
 */
export interface StockItem {
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  location: string;
  qty: number;
  uom: string;
  reorderPoint: number;
  linkedFur?: string;
  lastMovement: string;
}
