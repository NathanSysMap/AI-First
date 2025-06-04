import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/Table';
import { OrderItem } from '../../types';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalValue: number;
  items: OrderItem[];
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalValue,
  items,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Order Details"}
      className="w-full max-w-3xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-medium">Order #{orderId}</p>
        <p className="font-medium text-primary">
          Total: {formatPrice(totalValue)}
        </p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="h-10 w-10 rounded-md bg-slate-800 overflow-hidden">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.product.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{formatPrice(item.unitPrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};