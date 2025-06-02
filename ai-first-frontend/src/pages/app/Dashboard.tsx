import React from 'react';
import { CreditCard, TrendingUp, Users, Package, BarChart4, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { OrderStatusBadge } from '../../components/orders/OrderStatusBadge';

const DashboardCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium flex items-center ${
                  trend === 'up'
                    ? 'text-success'
                    : trend === 'down'
                    ? 'text-danger'
                    : 'text-slate-400'
                }`}
              >
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : trend === 'down' ? (
                  <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                ) : null}
                {trendValue}
              </span>
              <span className="text-xs text-slate-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value="$24,598"
          icon={<DollarSign className="h-6 w-6 text-primary" />}
          trend="up"
          trendValue="12.5%"
        />
        <DashboardCard
          title="New Orders"
          value="345"
          icon={<CreditCard className="h-6 w-6 text-primary" />}
          trend="up"
          trendValue="8.2%"
        />
        <DashboardCard
          title="Active Products"
          value="128"
          icon={<Package className="h-6 w-6 text-primary" />}
          trend="neutral"
          trendValue="0%"
        />
        <DashboardCard
          title="New Customers"
          value="42"
          icon={<Users className="h-6 w-6 text-primary" />}
          trend="down"
          trendValue="3.8%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Revenue Overview</h3>
              <select className="form-input py-1 text-xs w-auto">
                <option value="weekly">Last 7 days</option>
                <option value="monthly">Last 30 days</option>
                <option value="yearly">Last 12 months</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center">
              <BarChart4 className="h-32 w-32 text-slate-700" />
              <p className="text-slate-500">Revenue chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {[
                {
                  id: '1001',
                  customer: 'John Smith',
                  amount: '$269.97',
                  status: 'CONCLUIDO' as const,
                },
                {
                  id: '1002',
                  customer: 'Emily Johnson',
                  amount: '$119.98',
                  status: 'DESLOCAMENTO' as const,
                },
                {
                  id: '1003',
                  customer: 'Michael Brown',
                  amount: '$149.99',
                  status: 'RECUSADO' as const,
                },
                {
                  id: '1004',
                  customer: 'Sarah Wilson',
                  amount: '$89.95',
                  status: 'ACEITO' as const,
                },
                {
                  id: '1005',
                  customer: 'Robert Davis',
                  amount: '$199.99',
                  status: 'SUSPENSO' as const,
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-sm text-slate-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <div className="mt-1">
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Top Selling Products</h3>
            <div className="space-y-4">
              {[
                {
                  name: 'Bluetooth Speaker',
                  sold: 87,
                  revenue: '$5,219.13',
                  image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
                {
                  name: 'Wireless Headphones',
                  sold: 63,
                  revenue: '$9,449.37',
                  image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
                {
                  name: 'Mechanical Keyboard',
                  sold: 52,
                  revenue: '$6,759.48',
                  image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
                {
                  name: 'Wireless Mouse',
                  sold: 45,
                  revenue: '$1,799.55',
                  image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center space-x-4 p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="h-12 w-12 rounded-md bg-slate-800 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-slate-400">
                      {product.sold} sold
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Customer Activity</h3>
            <div className="space-y-4">
              {[
                {
                  customer: 'John Smith',
                  action: 'placed an order',
                  time: '5 minutes ago',
                  amount: '$269.97',
                },
                {
                  customer: 'Emily Johnson',
                  action: 'created an account',
                  time: '2 hours ago',
                  amount: null,
                },
                {
                  customer: 'Michael Brown',
                  action: 'requested a refund',
                  time: '5 hours ago',
                  amount: '$149.99',
                },
                {
                  customer: 'Sarah Wilson',
                  action: 'added items to cart',
                  time: '6 hours ago',
                  amount: '$319.98',
                },
                {
                  customer: 'Robert Davis',
                  action: 'contacted support',
                  time: '1 day ago',
                  amount: null,
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      <span className="font-bold">{activity.customer}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="text-right">
                      <p className="font-medium">{activity.amount}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;