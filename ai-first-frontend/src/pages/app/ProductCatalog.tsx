import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Upload,
  Download,
  Plus,
  Check,
  X,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../components/ui/Table';
import { Product } from '../../types';
import { useApi } from "../../services/api";
import AddProductModal from '../../components/products/AddProductModal';

// Mock data for demonstration


const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { fetchProducts } = useApi();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProdutos(data);
      } catch (err) {
        console.error("Ocorreu um erro ao carregar os produtos!", err);
      }

    }
    getProducts();
  }, []);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const filteredProducts = produtos.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === '' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(produtos.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Catalog</h1>
        <div className="flex items-center space-x-2">
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search products..."
                className="pl-9 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                className="form-input"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((p: any, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-md bg-slate-800 overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">#{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {p.description}
                  </TableCell>
                  <TableCell>{formatPrice(p.price)}</TableCell>
                  <TableCell>{p.unit}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.subcategory}</TableCell>
                  <TableCell>
                    <span
                      className={`${p.stock === 0 ? 'text-danger' : 'text-foreground'
                        }`}
                    >
                      {p.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    {p.active ? (
                      <Check className="h-5 w-5 text-success" />
                    ) : (
                      <X className="h-5 w-5 text-danger" />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${p.productType === 'PRODUTO'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                        }`}
                    >
                      {p.productType === 'PRODUTO' ? 'PRODUTO' : 'SERVICO'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag: any) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-700 px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}></AddProductModal>
    </div>
  );
};

export default ProductCatalog;