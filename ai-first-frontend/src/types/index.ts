export interface Company {
  id: string;
  corporateName: string;
  tradeName: string;
  cnpj: string;
  website?: string;
  businessSegment: string;
  contact: CompanyContact;
  address: CompanyAddress;
}

export interface CompanyContact {
  id: string;
  phone: string;
  email: string;
  whatsapp: string;
  legalRepresentative: string;
  representativeEmail: string;
  companyId: string;
}

export interface CompanyAddress {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  companyId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  tenantId: string;
  companyId?: string;
  createdAt: string;
  company: Company;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  tenantId: string;
  companyId?: string;
  companyName?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  unit: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  stock: number;
  active: boolean;
  productType: ProductType;
  tags?: string[];
  userId: string;
  user?: User;
}

export type ProductType = 'PRODUTO' | 'SERVICO' | 'CURSO' | 'ASSINATURA';

/*export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyId: string;
  status: 'active' | 'inactive' | 'pending';
}*/

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  addresses: CustomerAddress[];
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  zipCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Order {
  id: string;
  total: number;
  createdAt: string;
  customerId: string;
  tenantId: string;
  items: OrderItem[];
  customer: Customer;
  status: OrderStatus;
  shippingCost: number;
  shippingMethod: string;
}

export type OrderStatus =
  | 'ABERTO' | 'ACEITO' | 'RECUSADO' | 'PREPARACAO' | 'DESLOCAMENTO' | 'SUSPENSO' | 'CONCLUIDO' | 'CANCELADO';


export interface AgentPrompt {
  id: string;
  tenantId: string;
  systemPrompt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentDocument {
  id: string;
  tenantId: string;
  name: string;
  fileUrl: string;
  content: string;
  createdAt: string;
}
