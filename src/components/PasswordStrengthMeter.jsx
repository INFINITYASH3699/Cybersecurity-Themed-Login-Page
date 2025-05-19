import { useState, useEffect } from 'react';

export function PasswordStrengthMeter({ password }) {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Skip evaluation for empty passwords
    if (!password) {
      setStrength(0);
      setMessage('');
      return;
    }

    // Calculate password strength
    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char

    // Normalize to 0-100 scale
    const normalizedScore = Math.min(Math.floor((score / 6) * 100), 100);
    setStrength(normalizedScore);

    // Set appropriate message
    if (normalizedScore < 30) {
      setMessage('Weak');
    } else if (normalizedScore < 60) {
      setMessage('Fair');
    } else if (normalizedScore < 80) {
      setMessage('Good');
    } else {
      setMessage('Strong');
    }
  }, [password]);

  // Determine color based on strength (red-white-black theme)
  const getColor = () => {
    if (strength < 30) return 'bg-red-600';
    if (strength < 60) return 'bg-white border border-black';
    if (strength < 80) return 'bg-black';
    return 'bg-black';
  };

  // Determine text color based on strength (red-white-black theme)
  const getTextColor = () => {
    if (strength < 30) return 'text-red-700';
    if (strength < 60) return 'text-black';
    return 'text-white';
  };

  if (!password) return null;

  return (
    <div className="mt-1 mb-3">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden border border-black">
        <div
          className={`h-full ${getColor()} transition-all duration-300 ease-in-out`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className={`text-xs font-medium ${getTextColor()}`}>
          {message}
        </span>
      </div>
    </div>
  );
}
