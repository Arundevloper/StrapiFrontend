// Define the structure of the order data
export interface Payment {
     order:number,
     amount:string,
     payment_status:string,
     transaction_id:number,
     payment_date:string
     payment_method:PaymentMethod;
     currency:string
     receipt:string
   
     

  }
  export interface PaymentResponse {
    order:number,
    amount:number,
    payment_status:string,
    transaction_id:number,
    payment_date:string
    payment_method:PaymentMethod;
    data:any
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
