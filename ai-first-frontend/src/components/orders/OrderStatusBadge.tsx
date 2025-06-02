import React from 'react';
import { cn } from '../../utils/cn';
import { OrderStatus } from '../../types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  className,
}) => {
  const statusMap: Record<OrderStatus, { label: string; className: string }> = {
    ABERTO: {
      label: 'Aberto',
      className: 'bg-blue-500/20 text-blue-400',
    },
    ACEITO: {
      label: 'Aceito',
      className: 'bg-blue-500/20 text-blue-400',
    },
    RECUSADO: {
      label: 'Recusado',
      className: 'bg-danger/20 text-danger',
    },
    PREPARACAO: {
      label: 'Em preparação',
      className: 'bg-purple-500/20 text-purple-400',
    },
    DESLOCAMENTO: {
      label: 'Em deslocamento',
      className: 'bg-blue-500/20 text-blue-400',
    },
    SUSPENSO: {
      label: 'Suspenso',
      className: 'bg-warning/20 text-warning',
    },
    CONCLUIDO: {
      label: 'Concluído',
      className: 'bg-success/20 text-success',
    },
    CANCELADO: {
      label: 'Cancelado',
      className: 'bg-danger/20 text-danger',
    }
  };

  /*const statusInfo = statusMap[status];

  if(!statusInfo){
    return (
      <span className={cn('rounded-full px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400', className)}>Unknown</span>
    )
  }*/

  const { label, className: statusClassName } = statusMap[status];

  return (
    <span
      className={cn(
        'rounded-full px-2 py-1 text-xs font-medium',
        statusClassName,
        className
      )}
    >
      {label}
    </span>
  );
};