export type ScheduledStatus =
  | "pending_approval"  // En attente d'acceptation
  | "confirmed"         // Acceptée, planifiée
  | "rejected"          // Refusée
  | "preparing"         // En cours de préparation
  | "ready"             // Prête
  | "completed"         // Terminée
  | "cancelled";        // Annulée par le client

export interface ScheduledOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ScheduledOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  status: ScheduledStatus;
  items: ScheduledOrderItem[];
  total: number;
  scheduledDate: string;   // ISO date "2026-03-10"
  scheduledTime: string;   // "12:30"
  deliveryType: "pickup" | "delivery";
  notes?: string;
  createdAt: string;       // ISO datetime
  preparationTime: number; // minutes totales estimées
}

export interface TimeSlot {
  time: string;            // "12:00", "12:30"
  orders: ScheduledOrder[];
  capacity: number;        // max concurrent orders
  load: number;            // current confirmed orders count
}
