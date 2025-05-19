import { InfoIcon } from "lucide-react";
import { useState } from "react";

const SECURITY_TIPS = [
  "Use a unique password for each of your accounts.",
  "Enable two-factor authentication whenever possible.",
  "Avoid using public Wi-Fi for sensitive transactions.",
  "Check for HTTPS and a padlock icon before entering credentials.",
  "Be cautious of phishing attempts in emails or messages.",
  "Regularly update your software and applications.",
  "Use a password manager to generate and store complex passwords.",
  "Never share your password or verification codes with anyone.",
  "Check for suspicious activity in your account regularly.",
  "Log out of your accounts when using shared devices."
];

export function SecurityTips() {
  const [showTip, setShowTip] = useState(false);
  const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * SECURITY_TIPS.length));

  // Rotate through tips when clicked
  const rotateTip = () => {
    setTipIndex((prevIndex) => (prevIndex + 1) % SECURITY_TIPS.length);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-xs"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onClick={rotateTip}
        aria-label="Security tip"
      >
        <InfoIcon className="h-3.5 w-3.5" />
        <span>Security Tip</span>
      </button>

      {showTip && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-64 p-3 bg-black/95 text-red-100 text-xs rounded-md shadow-lg backdrop-blur-sm border border-red-700/50">
          <div className="flex items-start gap-2">
            <div className="bg-red-900/80 rounded-full p-1 mt-0.5">
              <InfoIcon className="h-3 w-3" />
            </div>
            <div>
              <div className="font-medium mb-1">Security Tip #{tipIndex + 1}</div>
              <p>{SECURITY_TIPS[tipIndex]}</p>
            </div>
          </div>
          <div className="absolute -bottom-2 left-3 w-4 h-4 bg-black/95 border-r border-b border-red-700/50 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}
