import { Shield, Lock } from "lucide-react";

export function Logo() {
  return (
    <div className="relative flex items-center justify-center h-24 w-24 mb-4">
      <div className="absolute h-24 w-24 rounded-full bg-red-600/10 animate-pulse"></div>
      <div className="absolute h-20 w-20 rounded-full bg-red-600/20"></div>
      <div className="absolute h-16 w-16 flex items-center justify-center">
        <Shield className="h-16 w-16 text-red-600/80 shield-icon" />
      </div>
      <div className="absolute h-16 w-16 flex items-center justify-center">
        <Lock className="h-8 w-8 text-white" strokeWidth={2.5} />
      </div>
      <div className="absolute h-24 w-24 rounded-full animate-spin-slow">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-red-500"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(48px) translateY(-50%)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
