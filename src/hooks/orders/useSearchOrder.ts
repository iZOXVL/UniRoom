import { useState, useEffect } from 'react';
import { OrderDto } from '@/types/Orders';

export const useSearchOrder = (orderId: string) => {
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://localhost:7061/api/Order/${orderId}`);
        if (!response.ok) {
          throw new Error('Error fetching order');
        }
        const data: OrderDto = await response.json();
        setOrder(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return { order, loading, error };
};
