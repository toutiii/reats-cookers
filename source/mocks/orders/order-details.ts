

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  emoji: string;
  notes?: string;
  category: string;
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  deliveryInstructions?: string;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
  orderTime: string;
  estimatedTime: string;
  actualDeliveryTime?: string;
  orderType: "delivery" | "pickup" | "dine-in";
  notes?: string;
  rating?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sample orders with different statuses
export const MOCK_ORDERS: OrderDetails[] = [
  {
    id: "ORD-2024-001",
    orderNumber: "#1234",
    customerName: "John Doe",
    customerPhone: "+33 6 12 34 56 78",
    customerEmail: "john.doe@example.com",
    customerAddress: "123 Rue de la Paix, 75001 Paris, France",
    deliveryInstructions: "Please ring the doorbell twice. Leave at the door if no answer.",
    status: "preparing",
    items: [
      {
        id: "item-1",
        name: "Classic Burger",
        quantity: 2,
        price: 12.90,
        emoji: "🍔",
        notes: "No onions, extra cheese",
        category: "Burgers",
      },
      {
        id: "item-2",
        name: "French Fries",
        quantity: 2,
        price: 4.50,
        emoji: "🍟",
        category: "Sides",
      },
      {
        id: "item-3",
        name: "Coca Cola",
        quantity: 2,
        price: 3.50,
        emoji: "🥤",
        notes: "No ice",
        category: "Drinks",
      },
      {
        id: "item-4",
        name: "Caesar Salad",
        quantity: 1,
        price: 8.90,
        emoji: "🥗",
        category: "Salads",
      },
    ],
    subtotal: 48.20,
    tax: 4.82,
    deliveryFee: 3.50,
    discount: 5.00,
    total: 51.52,
    paymentMethod: "Credit Card (Visa ****1234)",
    paymentStatus: "paid",
    orderTime: "10:30 AM",
    estimatedTime: "11:15 AM",
    orderType: "delivery",
    notes: "Customer requested contactless delivery",
    createdAt: new Date("2024-10-15T10:30:00"),
    updatedAt: new Date("2024-10-15T10:35:00"),
  },
  {
    id: "ORD-2024-002",
    orderNumber: "#1235",
    customerName: "Jane Smith",
    customerPhone: "+33 6 98 76 54 32",
    customerEmail: "jane.smith@example.com",
    customerAddress: "456 Avenue des Champs-Élysées, 75008 Paris, France",
    status: "ready",
    items: [
      {
        id: "item-5",
        name: "Margherita Pizza",
        quantity: 1,
        price: 14.50,
        emoji: "🍕",
        category: "Pizza",
      },
      {
        id: "item-6",
        name: "Tiramisu",
        quantity: 2,
        price: 6.50,
        emoji: "🍰",
        category: "Desserts",
      },
      {
        id: "item-7",
        name: "Sparkling Water",
        quantity: 1,
        price: 2.50,
        emoji: "💧",
        category: "Drinks",
      },
    ],
    subtotal: 30.00,
    tax: 3.00,
    deliveryFee: 0,
    discount: 0,
    total: 33.00,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    orderTime: "11:45 AM",
    estimatedTime: "12:15 PM",
    orderType: "pickup",
    createdAt: new Date("2024-10-15T11:45:00"),
    updatedAt: new Date("2024-10-15T12:00:00"),
  },
  {
    id: "ORD-2024-003",
    orderNumber: "#1236",
    customerName: "Bob Wilson",
    customerPhone: "+33 6 55 44 33 22",
    customerEmail: "bob.wilson@example.com",
    customerAddress: "789 Boulevard Saint-Germain, 75006 Paris, France",
    deliveryInstructions: "Office building, 3rd floor, Suite 305",
    status: "pending",
    items: [
      {
        id: "item-8",
        name: "Chicken Wrap",
        quantity: 3,
        price: 9.90,
        emoji: "🌯",
        category: "Wraps",
      },
      {
        id: "item-9",
        name: "Onion Rings",
        quantity: 2,
        price: 5.50,
        emoji: "🧅",
        category: "Sides",
      },
      {
        id: "item-10",
        name: "Iced Tea",
        quantity: 3,
        price: 3.00,
        emoji: "🧃",
        category: "Drinks",
      },
    ],
    subtotal: 49.70,
    tax: 4.97,
    deliveryFee: 4.00,
    discount: 10.00,
    total: 48.67,
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    orderTime: "12:15 PM",
    estimatedTime: "1:00 PM",
    orderType: "delivery",
    notes: "Corporate order for team lunch",
    createdAt: new Date("2024-10-15T12:15:00"),
    updatedAt: new Date("2024-10-15T12:15:00"),
  },
  {
    id: "ORD-2024-004",
    orderNumber: "#1237",
    customerName: "Alice Johnson",
    customerPhone: "+33 6 11 22 33 44",
    customerEmail: "alice.j@example.com",
    customerAddress: "321 Rue de Rivoli, 75004 Paris, France",
    status: "completed",
    items: [
      {
        id: "item-11",
        name: "Sushi Platter",
        quantity: 1,
        price: 24.90,
        emoji: "🍱",
        category: "Japanese",
      },
      {
        id: "item-12",
        name: "Miso Soup",
        quantity: 1,
        price: 4.50,
        emoji: "🍜",
        category: "Soups",
      },
    ],
    subtotal: 29.40,
    tax: 2.94,
    deliveryFee: 2.50,
    discount: 0,
    total: 34.84,
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    orderTime: "1:30 PM",
    estimatedTime: "2:15 PM",
    actualDeliveryTime: "2:10 PM",
    orderType: "delivery",
    rating: 5,
    feedback: "Excellent food and fast delivery!",
    createdAt: new Date("2024-10-15T13:30:00"),
    updatedAt: new Date("2024-10-15T14:10:00"),
  },
  // --- Scheduled orders (commandes anticipées) ---
  {
    id: "SCH-001",
    orderNumber: "#1301",
    customerName: "Marie Dupont",
    customerPhone: "+33 6 12 34 56 78",
    customerEmail: "marie.dupont@example.com",
    customerAddress: "15 Rue du Faubourg Saint-Honoré, 75008 Paris",
    status: "pending",
    items: [
      {
        id: "item-20",
        name: "Burger Signature",
        quantity: 2,
        price: 18.90,
        emoji: "🍔",
        notes: "Sans oignons",
        category: "Burgers",
      },
      {
        id: "item-21",
        name: "Salade César",
        quantity: 1,
        price: 14.90,
        emoji: "🥗",
        category: "Salades",
      },
    ],
    subtotal: 52.70,
    tax: 5.27,
    deliveryFee: 0,
    discount: 0,
    total: 52.70,
    paymentMethod: "Carte Visa ****4821",
    paymentStatus: "paid",
    orderTime: "09:15 AM",
    estimatedTime: "12:30 PM",
    orderType: "pickup",
    notes: "Commande anticipée — Sans oignons sur les burgers",
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "SCH-002",
    orderNumber: "#1302",
    customerName: "Paul Renard",
    customerPhone: "+33 6 98 76 54 32",
    customerEmail: "paul.renard@example.com",
    customerAddress: "42 Avenue Montaigne, 75008 Paris",
    deliveryInstructions: "Digicode 4521, 2ème étage gauche",
    status: "preparing",
    items: [
      {
        id: "item-22",
        name: "Pizza Margherita",
        quantity: 2,
        price: 24.50,
        emoji: "🍕",
        category: "Pizza",
      },
      {
        id: "item-23",
        name: "Pizza Quattro Formaggi",
        quantity: 1,
        price: 26.90,
        emoji: "🍕",
        category: "Pizza",
      },
      {
        id: "item-24",
        name: "Jus d'Orange Frais",
        quantity: 2,
        price: 5.50,
        emoji: "🍊",
        category: "Boissons",
      },
    ],
    subtotal: 86.90,
    tax: 8.69,
    deliveryFee: 3.50,
    discount: 0,
    total: 86.90,
    paymentMethod: "Apple Pay",
    paymentStatus: "paid",
    orderTime: "08:00 AM",
    estimatedTime: "1:00 PM",
    orderType: "delivery",
    notes: "Commande anticipée pour le déjeuner",
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 7200000),
  },
  {
    id: "SCH-003",
    orderNumber: "#1303",
    customerName: "Julie Martin",
    customerPhone: "+33 6 34 56 78 90",
    customerEmail: "julie.martin@example.com",
    customerAddress: "8 Place de la Bastille, 75011 Paris",
    status: "pending",
    items: [
      {
        id: "item-25",
        name: "Burger Végétarien",
        quantity: 3,
        price: 16.50,
        emoji: "🌿",
        category: "Burgers",
      },
    ],
    subtotal: 49.50,
    tax: 4.95,
    deliveryFee: 0,
    discount: 0,
    total: 49.50,
    paymentMethod: "Google Pay",
    paymentStatus: "paid",
    orderTime: "10:45 AM",
    estimatedTime: "12:30 PM",
    orderType: "pickup",
    notes: "Commande anticipée — 3 burgers végétariens",
    createdAt: new Date(Date.now() - 1800000),
    updatedAt: new Date(Date.now() - 1800000),
  },
  {
    id: "SCH-004",
    orderNumber: "#1304",
    customerName: "Marc Leblanc",
    customerPhone: "+33 6 45 67 89 01",
    customerEmail: "marc.leblanc@example.com",
    customerAddress: "27 Rue de Bretagne, 75003 Paris",
    status: "pending",
    items: [
      {
        id: "item-26",
        name: "Burger Signature",
        quantity: 1,
        price: 18.90,
        emoji: "🍔",
        category: "Burgers",
      },
      {
        id: "item-27",
        name: "Limonade Maison",
        quantity: 1,
        price: 4.90,
        emoji: "🍋",
        category: "Boissons",
      },
    ],
    subtotal: 23.80,
    tax: 2.38,
    deliveryFee: 0,
    discount: 0,
    total: 23.80,
    paymentMethod: "Carte Mastercard ****7890",
    paymentStatus: "paid",
    orderTime: "07:30 AM",
    estimatedTime: "12:00 PM",
    orderType: "pickup",
    notes: "Commande anticipée pour demain midi",
    createdAt: new Date(Date.now() - 14400000),
    updatedAt: new Date(Date.now() - 14400000),
  },
  {
    id: "SCH-005",
    orderNumber: "#1305",
    customerName: "Sophie Bernard",
    customerPhone: "+33 6 56 78 90 12",
    customerEmail: "sophie.bernard@example.com",
    customerAddress: "14 Rue de Turenne, 75004 Paris",
    deliveryInstructions: "Sonner à Bernard, 4ème étage",
    status: "pending",
    items: [
      {
        id: "item-28",
        name: "Pizza Margherita",
        quantity: 4,
        price: 24.50,
        emoji: "🍕",
        category: "Pizza",
      },
      {
        id: "item-29",
        name: "Fondant Chocolat",
        quantity: 4,
        price: 12.50,
        emoji: "🍫",
        category: "Desserts",
      },
    ],
    subtotal: 148.00,
    tax: 14.80,
    deliveryFee: 4.50,
    discount: 0,
    total: 148.00,
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    orderTime: "Yesterday",
    estimatedTime: "7:30 PM",
    orderType: "delivery",
    notes: "Anniversaire — demande un mot sur le dessert",
    createdAt: new Date(Date.now() - 36000000),
    updatedAt: new Date(Date.now() - 36000000),
  },
];

// Helper function to get order by ID
export const getOrderById = (orderId: string): OrderDetails | undefined => {
  return MOCK_ORDERS.find((order) => order.id === orderId);
};

// Helper function to get order by order number
export const getOrderByNumber = (orderNumber: string): OrderDetails | undefined => {
  return MOCK_ORDERS.find((order) => order.orderNumber === orderNumber);
};

// Status configuration
export const STATUS_CONFIG = {
  pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    label: "Pending",
    icon: "clock" as const,
    color: "#f59e0b",
    description: "Order received, waiting to be prepared",
  },
  preparing: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    label: "Preparing",
    icon: "loader" as const,
    color: "#3b82f6",
    description: "Kitchen is preparing your order",
  },
  ready: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    label: "Ready",
    icon: "check-circle" as const,
    color: "#10b981",
    description: "Order is ready for pickup/delivery",
  },
  completed: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    label: "Completed",
    icon: "check" as const,
    color: "#6b7280",
    description: "Order has been delivered/picked up",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    label: "Cancelled",
    icon: "x-circle" as const,
    color: "#ef4444",
    description: "Order has been cancelled",
  },
};

// Order type configuration
export const ORDER_TYPE_CONFIG = {
  delivery: {
    icon: "truck" as const,
    label: "Delivery",
    color: "#f97316",
  },
  pickup: {
    icon: "shopping-bag" as const,
    label: "Pickup",
    color: "#8b5cf6",
  },
  "dine-in": {
    icon: "coffee" as const,
    label: "Dine-in",
    color: "#06b6d4",
  },
};

// Payment status configuration
export const PAYMENT_STATUS_CONFIG = {
  paid: {
    label: "Paid",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  pending: {
    label: "Pending",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  failed: {
    label: "Failed",
    color: "text-red-600",
    bg: "bg-red-50",
  },
};

// Professional confirmation messages for status changes
export const STATUS_CHANGE_MESSAGES = {
  pending_to_preparing: "This will mark the order as 'In Preparation' and notify the customer that their order is being prepared. Do you want to proceed?",
  preparing_to_ready: "This will mark the order as 'Ready' and notify the customer that their order is ready for pickup or delivery. Do you want to proceed?",
  ready_to_completed: "This will mark the order as 'Completed' and close this order. The customer will be notified. Do you want to proceed?",
  pending_to_cancelled: "This will cancel the order and notify the customer. This action cannot be undone. Are you sure you want to cancel this order?",
  preparing_to_cancelled: "This will cancel the order that is currently being prepared. The customer will be notified and a refund may be required. Are you sure?",
  ready_to_cancelled: "This will cancel the order that is ready for delivery. The customer will be notified and a refund may be required. Are you sure?",
};

// Time estimates by order type
export const TIME_ESTIMATES = {
  delivery: {
    min: 30,
    max: 45,
    unit: "minutes",
  },
  pickup: {
    min: 15,
    max: 25,
    unit: "minutes",
  },
  "dine-in": {
    min: 20,
    max: 30,
    unit: "minutes",
  },
};
