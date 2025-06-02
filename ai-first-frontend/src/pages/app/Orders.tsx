import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../components/ui/Table';
import { OrderDetailsModal } from '../../components/orders/OrderDetailsModal';
import { OrderStatusBadge } from '../../components/orders/OrderStatusBadge';
import { Order, OrderItem } from '../../types';
import { orderStatusOptions } from '../../components/orders/OrderStatusOptions';
import { useApi } from '../../services/api';

/*
const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    productId: '101',
    quantity: 2,
    unitPrice: 59.99,
    orderId: '1',
  },
  {
    id: '2',
    productId: '102',
    quantity: 1,
    unitPrice: 149.99,
    orderId: '1',
  },
];*/


/*const mockClosedOrders: Order[] = [
  {
    id: '1004',
    totalValue: 269.97,
    orderDate: '2025-03-14',
    orderTime: '10:15',
    customerName: 'Sarah Wilson',
    items: mockOrderItems,
    status: 'completed',
  },
  {
    id: '1005',
    totalValue: 119.98,
    orderDate: '2025-03-14',
    orderTime: '11:30',
    customerName: 'Robert Davis',
    items: mockOrderItems.slice(0, 1),
    status: 'refused',
  },
  {
    id: '1006',
    totalValue: 149.99,
    orderDate: '2025-03-14',
    orderTime: '13:45',
    customerName: 'Jennifer Lee',
    items: mockOrderItems.slice(1),
    status: 'suspended',
  },
];*/

const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOnGoingOrders] = useState<Order[]>([]);
  const { fetchOrders } = useApi();

  useEffect(() => {
      const getOrders = async () => {
        try {
          const data = await fetchOrders();
          setOnGoingOrders(data);
        } catch (err) {
          console.error("Ocorreu um erro ao carregar os pedidos!", err);
        }
  
      }
      getOrders();
    }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId: string, status: string, checked: boolean) => {
    console.log(`Order ${orderId} status ${status}: ${checked}`);
    // In a real app, you would update the order status here
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleOrderStatusChange = (
    orderId: string,
    newStatus: 'ABERTO' | 'ACEITO' | 'RECUSADO' | 'PREPARACAO' | 'DESLOCAMENTO' | 'SUSPENSO' | 'CONCLUIDO' | 'CANCELADO'
  ) => {
    setOnGoingOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      )
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.total.toString().includes(searchTerm.toLowerCase())


    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                    
                    <TableCell>
                    <div className="flex items-center space-x-2">
                      <select
                        className="form-input py-1 text-xs"
                        value={order.status}
                        onChange={(e) =>
                          handleOrderStatusChange(
                            order.id,
                            e.target.value as Order['status']
                          )
                        }
                      >
                        {orderStatusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}                  
                      </select>
                    </div>
                  </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Closed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.filter((order) => ['completed', 'refused', 'suspended'].includes(order.status)).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>{order.customerId}</TableCell>
                    <TableCell>{order.tenantId}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderId={selectedOrder.id}
          totalValue={selectedOrder.total}
          items={selectedOrder.items}
        />
      )}
    </div>
  );
};

export default Orders;