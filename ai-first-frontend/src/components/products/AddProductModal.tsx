import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { useApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { ProductType } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const { createProduct } = useApi();
  const { user, token } = useAuth();

  console.log('Token no modal: ', token);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [stock, setStock] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [active, setActive] = useState(true);
  const [type, setType] = useState<ProductType>('PRODUTO');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setUnit('');
    setCategory('');
    setSubcategory('');
    setStock('');
    setHeight('');
    setWidth('');
    setLength('');
    setWeight('');
    setActive(true);
    setType('PRODUTO');
    setTags('');
    setImage('');
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Valid price required';
    if (!unit.trim()) newErrors.unit = 'Unit is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!subcategory.trim()) newErrors.subcategory = 'Subcategory is required';

    if (type === 'PRODUTO') {
      if (!stock.trim() || isNaN(Number(stock)) || Number(stock) < 0) newErrors.stock = 'Valid stock required';
      if (!height.trim() || isNaN(Number(height)) || Number(height) <= 0) newErrors.height = 'Valid height required';
      if (!width.trim() || isNaN(Number(width)) || Number(width) <= 0) newErrors.width = 'Valid width required';
      if (!length.trim() || isNaN(Number(length)) || Number(length) <= 0) newErrors.length = 'Valid length required';
      if (!weight.trim() || isNaN(Number(weight)) || Number(weight) <= 0) newErrors.weight = 'Valid weight required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      await createProduct({
        name,
        description,
        price: Number(price),
        unit,
        category,
        subcategory,
        stock: type === 'PRODUTO' ? Number(stock) : 0,
        height: type === 'PRODUTO' ? Number(height) : null,
        width: type === 'PRODUTO' ? Number(width) : null,
        length: type === 'PRODUTO' ? Number(length) : null,
        weight: type === 'PRODUTO' ? Number(weight) : null,
        active,
        productType: type,
        tags: tagsArray,
        image: image || "https://source.unsplash.com/random/200x200?${category.toLowerCase()},product",
        createdById: user?.id,
      });
      
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-white">Product Image</label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-secondary-700 rounded flex items-center justify-center overflow-hidden">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-secondary-500 text-sm text-center px-2">No image</span>
              )}
            </div>
            <div className="flex-1">
              <Input
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          <Select
            label="Type"
            value={type}
            onChange={(value: string) => setType(value as ProductType)}
            options={[
              { value: 'PRODUTO', label: 'Produto' },
              { value: 'SERVICO', label: 'Serviço' },
              { value: 'CURSO', label: 'Curso' },
              { value: 'ASSINATURA', label: 'Assinatura' },
            ]}
          />
        </div>

        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
            required
          />
          <Input
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            error={errors.unit}
            required
          />
          {type === 'PRODUTO' && (
            <Input
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              error={errors.stock}
              required
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={errors.category}
            required
          />
          <Input
            label="Subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            error={errors.subcategory}
            required
          />
        </div>

        {type === 'PRODUTO' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              error={errors.height}
            />
            <Input
              label="Width (cm)"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              error={errors.width}
            />
            <Input
              label="Length (cm)"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              error={errors.length}
            />
            <Input
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              error={errors.weight}
            />
          </div>
        )}

        <Input
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="pt-2">
          <Checkbox
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            label="Active Product"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-700">
          <Button type="button" variant="secondary" onClick={() => {
            resetForm();
            onClose();
          }}>
            Cancel
          </Button>
          <Button type="submit">
            Save Product
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;