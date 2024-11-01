// Define the structure of the order data
export interface OrderData {
  email: string;                  // User's email
  phone_number: string;           // User's phone number
  first_name: string;             // User's first name
  last_name: string;              // User's last name
  address_line_1: string;         // Primary address line
  address_line_2?: string;        // Secondary address line (optional)
  city: string;                   // City
  state: string;                  // State
  pincode: number;                // Postal code
  payment_method: PaymentMethod;  // Payment method (using enum)
  userId: string;                 // User making the order (optional based on your schema)
  cartItems: OrderItem[];   
  user:number;      // Array of items in the cart
}

// Define the structure of order items
export interface OrderItem {
  productId: string;              // Product ID associated with the item
  quantity: number;               // Quantity of the product being ordered
  price: number;                  // Price of the product
  discount: number;               // Discount applicable to the product
}

// Define the payment method options
export enum PaymentMethod {
  CreditCard = "Credit Card",
  DebitCard = "Debit Card",
  PayPal = "PayPal",
  CashOnDelivery = "Cash on Delivery",
  BankTransfer = "Bank Transfer",
  // Add other payment methods as necessary
}

// Define the structure of the order response
export interface OrderResponse {
  first_name: string;
  last_name: string;
  email: string;
  addressLine1: string;
  addressLine2?: string; // Optional field
  city: string;
  state: string;
  pincode: string;
  cartItems: Array<{
    productId: string;
    productQuantity: number;
    price: number;
    discount: number;
  }>;
  total: number; // Total cost of the order
  data:any;
}
