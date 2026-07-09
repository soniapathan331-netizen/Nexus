import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

const getStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very Weak', color: 'bg-error-500' },
    { label: 'Weak', color: 'bg-error-400' },
    { label: 'Fair', color: 'bg-warning-500' },
    { label: 'Good', color: 'bg-primary-500' },
    { label: 'Strong', color: 'bg-success-500' },
  ];

  return { score, ...levels[score] };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;

  const { score, label, color } = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < score ? color : 'bg-gray-200'}`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Password strength: <span className="font-medium">{label}</span>
      </p>
    </div>
  );
};