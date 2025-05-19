import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { SecurityStats } from "@/components/SecurityStats";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";
import { SecurityTips } from "@/components/SecurityTips";
import CyberSecurityBackground from "@/components/CyberSecurityBackground";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaText, setCaptchaText] = useState(generateCaptchaText());
  const [ipAddress, setIpAddress] = useState("Loading...");
  const [loginTime, setLoginTime] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Set current time for login attempt
  useEffect(() => {
    const now = new Date();
    setLoginTime(now.toLocaleTimeString() + ", " + now.toLocaleDateString());

    // Simulate getting IP address
    setTimeout(() => {
      const fakeIp = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ].join(".");
      setIpAddress(fakeIp);
    }, 800);
  }, []);

  function generateCaptchaText() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function refreshCaptcha() {
    setCaptchaText(generateCaptchaText());
    setCaptchaValue("");
  }

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  }

  function validateForm() {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // CAPTCHA validation
    if (captchaText && captchaValue !== captchaText) {
      newErrors.captcha = "CAPTCHA verification failed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoginAttempts((prev) => prev + 1);

    // After 3 failed attempts, block for security
    if (loginAttempts >= 2) {
      setIsBlocked(true);
      return;
    }

    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert("Login successful! Welcome to CyberShield.");
      }, 1500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* The animated background component */}
      <CyberSecurityBackground density={30} speed={20} color="#ff2d55" />

      {/* Overlay with additional gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-gray-900/60 z-0"></div>

      <div className="container max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-center w-full relative z-10">
        {/* Left side - Brand & Security Information */}
        <div className="w-full lg:w-1/2 text-white px-4 py-6 lg:py-0">
          <div className="flex flex-col items-center lg:items-start max-w-lg mx-auto lg:mx-0">
            {/* Logo and branding */}
            <div className="flex gap-8 justify-center item-center">
              <div className="flex justify-center lg:justify-start mb-6">
                <Logo />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold cyber-glow mb-4 text-center lg:text-left">
                  CyberShield
                </h1>
                <p className="text-red-200 text-lg mb-6 text-center lg:text-left">
                  Advanced Security Authentication Portal
                </p>
              </div>
            </div>

            {/* Security info box */}
            <div className="border-l-4 border-red-600 pl-4 my-2 w-full backdrop-blur-sm bg-black/20 p-4 rounded-r">
              <h2 className="text-xl font-semibold mb-2">
                Enterprise-Grade Protection
              </h2>
              <p className="text-gray-300">
                Our multi-layered security approach ensures that your data stays
                protected against evolving cyber threats.
              </p>
            </div>

            {/* Security features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full my-2">
              <div className="flex items-start gap-3 backdrop-blur-sm bg-black/20 p-3 rounded">
                <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Multi-Factor Authentication</h3>
                  <p className="text-sm text-gray-300">
                    Add extra layers of security to your login process
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 backdrop-blur-sm bg-black/20 p-3 rounded">
                <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Real-time Threat Monitoring</h3>
                  <p className="text-sm text-gray-300">
                    Continuous monitoring for suspicious activities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 backdrop-blur-sm bg-black/20 p-3 rounded">
                <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">End-to-End Encryption</h3>
                  <p className="text-sm text-gray-300">
                    All data is encrypted in transit and at rest
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 backdrop-blur-sm bg-black/20 p-3 rounded">
                <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Zero-Trust Architecture</h3>
                  <p className="text-sm text-gray-300">
                    Verify every access attempt, regardless of source
                  </p>
                </div>
              </div>
            </div>

            {/* Security stats */}
            <SecurityStats />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 px-4 pb-16 lg:pb-0">
          <Card className="border-red-700/30 shadow-lg shadow-red-900/20 backdrop-blur-sm bg-black/40 cyber-card w-full max-w-md mx-auto border border-red-500/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">
                Sign In
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              {isBlocked ? (
                <div className="bg-red-900/30 border border-red-500/30 rounded-md p-4 mb-4 text-red-100 flex flex-col items-center backdrop-blur-sm">
                  <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
                  <h3 className="text-lg font-bold">
                    Account temporarily locked
                  </h3>
                  <p className="text-sm text-center mt-1">
                    Too many failed login attempts. For your security, this
                    account has been temporarily locked. Please try again in 30
                    minutes or contact support.
                  </p>
                  <Button
                    className="mt-4 bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      setIsBlocked(false);
                      setLoginAttempts(0);
                      setFormData({
                        email: "",
                        password: "",
                        rememberMe: false,
                      });
                      refreshCaptcha();
                    }}
                  >
                    Reset and try again
                  </Button>
                </div>
              ) : (
                <>
                  {/* Security info box */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 mb-4 text-xs text-red-200 backdrop-blur-sm">
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Login attempt:</span>
                        <span>{loginTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">IP Address:</span>
                        <span>{ipAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Security protocol:</span>
                        <span>TLS 1.3 + AES-256</span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      {/* Email field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2 text-gray-100"
                        >
                          <User className="h-4 w-4 text-red-500" />
                          Email
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`bg-black/30 border-red-500/30 text-white placeholder:text-gray-400 ${errors.email ? "border-red-500" : "border-red-500/30"}`}
                            aria-invalid={errors.email ? "true" : "false"}
                          />
                          {errors.email && (
                            <div className="flex items-center text-red-400 text-xs mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Password field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="flex items-center gap-2 text-gray-100"
                        >
                          <Lock className="h-4 w-4 text-red-500" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={`bg-black/30 border-red-500/30 text-white placeholder:text-gray-400 pr-10 ${errors.password ? "border-red-500" : "border-red-500/30"}`}
                            aria-invalid={errors.password ? "true" : "false"}
                          />
                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          {errors.password && (
                            <div className="flex items-center text-red-400 text-xs mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <PasswordStrengthMeter password={formData.password} />
                      </div>

                      {/* CAPTCHA Section */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="captcha"
                          className="flex items-center gap-2 text-gray-100"
                        >
                          <Shield className="h-4 w-4 text-red-500" />
                          CAPTCHA Verification
                        </Label>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="bg-red-900/20 p-3 rounded-md font-mono text-gray-200 select-none text-center flex-1 border border-red-500/30 backdrop-blur-sm">
                            {captchaText.split("").map((char, index) => (
                              <span
                                key={index}
                                style={{
                                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                                  display: "inline-block",
                                  marginLeft: "2px",
                                  fontWeight:
                                    Math.random() > 0.5 ? "bold" : "normal",
                                }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={refreshCaptcha}
                            aria-label="Refresh CAPTCHA"
                            className="text-red-400 border-red-500/30 hover:bg-red-900/20 bg-black/30"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                              <path d="M21 3v5h-5"></path>
                              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                              <path d="M3 21v-5h5"></path>
                            </svg>
                          </Button>
                        </div>
                        <Input
                          id="captcha"
                          name="captcha"
                          placeholder="Enter the text above"
                          value={captchaValue}
                          onChange={(e) => setCaptchaValue(e.target.value)}
                          className={`bg-black/30 border-red-500/30 text-white placeholder:text-gray-400 ${errors.captcha ? "border-red-500" : "border-red-500/30"}`}
                        />
                        {errors.captcha && (
                          <div className="flex items-center text-red-400 text-xs mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.captcha}
                          </div>
                        )}
                      </div>

                      {/* Remember me & Forgot password */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, rememberMe: checked })
                            }
                            className="border-red-500/50 text-red-600 data-[state=checked]:bg-red-600"
                          />
                          <Label
                            htmlFor="rememberMe"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
                          >
                            Remember me
                          </Label>
                        </div>
                        <a
                          href="#"
                          className="text-sm font-medium text-red-400 hover:text-red-300 hover:underline transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>

                      {/* Submit button */}
                      <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-700/20"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Authenticating...
                          </span>
                        ) : (
                          "Sign In"
                        )}
                      </Button>

                      {/* Security tips & login attempts */}
                      <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2">
                        <SecurityTips />
                        <div className="text-xs text-gray-300">
                          {loginAttempts > 0 && (
                            <span>Failed attempts: {loginAttempts}/3</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-center text-sm text-gray-300 w-full">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-semibold text-red-400 hover:text-red-300 hover:underline transition-colors"
                >
                  Sign up
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-red-300/70 text-xs py-4 mt-auto relative z-10">
        <p>© 2025 CyberShield. All rights reserved.</p>
        <div className="flex justify-center mt-1 space-x-2 flex-wrap">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-white transition-colors">
            Security
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
