import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';

interface CompanyRegistrationFormValues {
  corporateName: string;
  tradeName: string;
  cnpj: string;
  website: string;
  industrySegment: string;
  corporateContact: string;
  businessWhatsapp: string;
}

const CompanyRegistration: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRegistrationFormValues>();

  const onSubmit = (data: CompanyRegistrationFormValues) => {
    console.log('Company registration data:', data);
    // In a real app, you would register the company here
    navigate('/auth/employee-registration');
  };

  const industrySegments = [
    { value: 'retail', label: 'Retail' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'food', label: 'Food and Beverage' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Company Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Corporate Name (Razão Social)"
            id="corporateName"
            placeholder="ABC Enterprises Inc."
            {...register('corporateName', {
              required: 'Corporate name is required',
            })}
            error={errors.corporateName?.message}
          />

          <Input
            label="Trade Name (Nome Fantasia)"
            id="tradeName"
            placeholder="ABC"
            {...register('tradeName', {
              required: 'Trade name is required',
            })}
            error={errors.tradeName?.message}
          />

          <Input
            label="CNPJ"
            id="cnpj"
            placeholder="00.000.000/0000-00"
            {...register('cnpj', {
              required: 'CNPJ is required',
              pattern: {
                value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
                message: 'Invalid CNPJ format (XX.XXX.XXX/XXXX-XX)',
              },
            })}
            error={errors.cnpj?.message}
          />

          <Input
            label="Website"
            id="website"
            placeholder="https://www.example.com"
            {...register('website')}
            error={errors.website?.message}
          />

          <Select
            label="Industry Segment"
            id="industrySegment"
            options={industrySegments}
            {...register('industrySegment', {
              required: 'Please select your industry segment',
            })}
            error={errors.industrySegment?.message}
          />

          <Input
            label="Corporate Contact"
            id="corporateContact"
            placeholder="+1 (555) 123-4567"
            {...register('corporateContact', {
              required: 'Corporate contact is required',
            })}
            error={errors.corporateContact?.message}
          />

          <Input
            label="Business WhatsApp"
            id="businessWhatsapp"
            placeholder="+1 (555) 987-6543"
            {...register('businessWhatsapp', {
              required: 'Business WhatsApp is required',
            })}
            error={errors.businessWhatsapp?.message}
          />

          <Button type="submit" variant="primary" fullWidth={true} className="mt-6">
            Register Company
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center p-6">
        <Link to="/auth/login" className="text-sm text-primary hover:underline">
          Already have an account? Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompanyRegistration;