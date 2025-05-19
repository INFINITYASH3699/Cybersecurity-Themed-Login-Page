import { useState, useEffect } from 'react';
import { Shield, Lock, UserCheck, Clock } from 'lucide-react';

export function SecurityStats() {
  const [securityScore, setSecurityScore] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [protectedAccounts, setProtectedAccounts] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Animate the counter values
    const interval = setInterval(() => {
      if (securityScore < 98) {
        setSecurityScore(prev => Math.min(prev + 1, 98));
      }

      if (loginAttempts < 15687) {
        setLoginAttempts(prev => Math.min(prev + 243, 15687));
      }

      if (protectedAccounts < 8432) {
        setProtectedAccounts(prev => Math.min(prev + 132, 8432));
      }

      if (uptime < 99.9) {
        setUptime(prev => Math.min(prev + 0.1, 99.9));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [securityScore, loginAttempts, protectedAccounts, uptime]);

  return (
    <div className="grid grid-cols-4 gap-3 mx-auto mt-4 mb-8 text-red-100">
      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-red-700/30">
        <div className="flex items-center mb-1">
          <Shield className="w-4 h-4 mr-1 text-red-400" />
          <span className="text-xs font-medium">Security Score</span>
        </div>
        <div className="text-lg font-bold cyber-glow">{securityScore}%</div>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-red-700/30">
        <div className="flex items-center mb-1">
          <Lock className="w-4 h-4 mr-1 text-red-400" />
          <span className="text-xs font-medium">Login Attempts</span>
        </div>
        <div className="text-lg font-bold cyber-glow">{loginAttempts.toLocaleString()}</div>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-red-700/30">
        <div className="flex items-center mb-1">
          <UserCheck className="w-4 h-4 mr-1 text-red-400" />
          <span className="text-xs font-medium">Protected Accounts</span>
        </div>
        <div className="text-lg font-bold cyber-glow">{protectedAccounts.toLocaleString()}</div>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-red-700/30">
        <div className="flex items-center mb-1">
          <Clock className="w-4 h-4 mr-1 text-red-400" />
          <span className="text-xs font-medium">System Uptime</span>
        </div>
        <div className="text-lg font-bold cyber-glow">{uptime.toFixed(1)}%</div>
      </div>
    </div>
  );
}
