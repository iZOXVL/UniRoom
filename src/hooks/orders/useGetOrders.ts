import { useState, useEffect } from 'react';
import { OrderDto } from '@/types/Orders';

export const useGetOrders = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://localhost:7061/api/Order");
        if (!response.ok) {
          throw new Error("Error fetching orders");
        }
        const data: OrderDto[] = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};
