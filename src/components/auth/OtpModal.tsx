import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface OtpModalProps {
  isOpen: boolean;
  onVerify: () => void;
  email: string;
}

export const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onVerify, email }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = () => {
    onVerify();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6 text-center">
        <div className="mx-auto w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={24} className="text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Two-Factor Verification</h3>
        <p className="text-sm text-gray-600 mt-1">
          Enter the 4-digit code sent to {email || 'your email'}
        </p>

        <div className="flex justify-center gap-2 mt-5">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          ))}
        </div>

        <Button fullWidth className="mt-5" onClick={handleVerify}>
          Verify & Continue
        </Button>
        <p className="text-xs text-gray-400 mt-3">(Demo mode — any 4 digits work)</p>
      </div>
    </div>
  );
};