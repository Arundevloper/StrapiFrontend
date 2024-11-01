// profile.ts

interface Profile {
    id: number;
    order_id:Number
    createdAt: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string; // Made optional if not always provided
    city: string;
    state: string;
    pincode: number;
    username: string;
    email: string;
    order_item:any
    // Order-related fields
    quantity?: number; // Made optional
    price?: number;    // Made optional
    discount?: number; // Made optional
    amount?: number | null; // Optional if not always available
    PaymentMethod?: string | null; // Optional if not always provided
    transaction_id?: string | null; // Optional for cases without transactions
    payment_status: string; // Required field
    payment:any;
};

export default Profile;
