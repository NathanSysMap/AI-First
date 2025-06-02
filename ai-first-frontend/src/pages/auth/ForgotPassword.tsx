import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';

interface ForgotPasswordFormValues {
  email: string;
  phone: string;
  validationCode?: string;
}

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'verification' | 'success'>('email');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmitEmail = (data: ForgotPasswordFormValues) => {
    console.log('Forgot password data:', data);
    // In a real app, you would send a verification code here
    setStep('verification');
  };

  const onSubmitVerification = (data: ForgotPasswordFormValues) => {
    console.log('Verification code:', data.validationCode);
    // In a real app, you would verify the code and send a new password
    setStep('success');
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {step === 'email' && (
          <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-4">
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
              label="Phone (to receive verification code)"
              id="phone"
              placeholder="+1 (555) 123-4567"
              {...register('phone', {
                required: 'Phone is required',
              })}
              error={errors.phone?.message}
            />

            <Button type="submit" variant="primary" fullWidth={true} className="mt-6">
              Send Verification Code
            </Button>
          </form>
        )}

        {step === 'verification' && (
          <form onSubmit={handleSubmit(onSubmitVerification)} className="space-y-4">
            <p className="text-sm text-slate-400 mb-4">
              A verification code has been sent to your phone. Please enter it below.
            </p>

            <Input
              label="Verification Code"
              id="validationCode"
              placeholder="123456"
              {...register('validationCode', {
                required: 'Verification code is required',
              })}
              error={errors.validationCode?.message}
            />

            <Button type="submit" variant="primary" fullWidth={true} className="mt-6">
              Verify Code
            </Button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center space-y-6">
            <div className="bg-success/10 text-success rounded-lg p-4 mb-4">
              <p>Password reset successful!</p>
              <p className="text-sm mt-2">
                A new password has been sent to your email.
              </p>
            </div>

            <Link to="/auth/login">
              <Button variant="primary" fullWidth={true}>
                Back to Login
              </Button>
            </Link>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center p-6">
        <Link to="/auth/login" className="text-sm text-primary hover:underline">
          Remember your password? Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;