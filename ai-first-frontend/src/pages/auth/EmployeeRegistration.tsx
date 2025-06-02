import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';

interface EmployeeRegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const EmployeeRegistration: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmployeeRegistrationFormValues>();

  const password = watch('password');

  const onSubmit = (data: EmployeeRegistrationFormValues) => {
    console.log('Employee registration data:', data);
    // In a real app, you would register the employee here
    navigate('/auth/login');
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              id="firstName"
              placeholder="John"
              {...register('firstName', {
                required: 'First name is required',
              })}
              error={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              id="lastName"
              placeholder="Doe"
              {...register('lastName', {
                required: 'Last name is required',
              })}
              error={errors.lastName?.message}
            />
          </div>

          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="your.email@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
          />

          <Input
            label="Phone"
            id="phone"
            placeholder="+1 (555) 123-4567"
            {...register('phone', {
              required: 'Phone is required',
            })}
            error={errors.phone?.message}
          />

          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'The passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" variant="primary" fullWidth={true} className="mt-6">
            Register
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

export default EmployeeRegistration;