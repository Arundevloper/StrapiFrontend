import React from 'react';

// Define the structure of the item and order data
interface OrderItem {
  productSlug: string;
  productName: string;
  productImage: string;
  productQuantity: number;
  price: number; // Price before discount
  discount: number; // Discount percentage
}

interface Order {
  orderId: string;
  orderDate: string; // ISO date string
  totalAmount: number; // Total amount in paise
  status: 'Delivered' | 'Pending' | 'Cancelled'; // Example statuses
  items: OrderItem[];
}

// Define props for the OrderHistory component
interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-6">
      <h2 className="text-3xl font-semibold mb-6">Order History</h2>
      {orders.map((order) => (
        <div key={order.orderId} className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2 mb-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-900">Order ID:</span>
            <span className="text-gray-900">{order.orderId}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-900">Order Date:</span>
            <span className="text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-900">Total Amount:</span>
            <span className="text-gray-900">₹{(order.totalAmount / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-900">Status:</span>
            <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
              {order.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
          {order.items.map((item) => (
            <div key={item.productSlug} className="flex items-center justify-between border-b pb-2 mb-2">
              <div className="flex items-center gap-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-[75px] h-[75px] object-contain rounded"
                />
                <div>
                  <h4 className="text-md text-gray-900">{item.productName}</h4>
                  <p className="text-gray-600 text-sm">Quantity: {item.productQuantity}</p>
                  <p className="text-gray-600 text-lg font-medium">
                    ₹{(item.price - (item.price * item.discount) / 100).toFixed(2)} (₹{item.price} - {item.discount}%)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
