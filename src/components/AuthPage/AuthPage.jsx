import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  const Comp = "button";
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
        ${variant === "outline" ? "border border-input hover:bg-accent hover:text-accent-foreground" : ""}
        ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useCart();
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // Added state for user name
  const [message, setMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      login(user);
      setMessage("Successfully signed in");
      setTimeout(() => navigate("/Home"), 1000);
    } else {
      setMessage("Invalid credentials, please try again");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const newUser = { name, email, password, cart: [] }; // Included name in new user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === email)) {
        setMessage("Email already exists");
      } else {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        login(newUser);
        setMessage("Successfully signed up");
        setTimeout(() => navigate("/Home"), 1000);
      }
    } else {
      setMessage("Passwords do not match");
    }
  };

  const handleGoogleSignUp = () => {
    setMessage("Google sign-up not implemented in this demo");
  };

  return (
    <div className="bg-background flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-center">Welcome to PhilatelyIndia</h3>
            <p className="text-center text-muted-foreground">Sign in to your account or create a new one</p>
          </div>
          <div className="p-6 pt-0">
            <div className="flex border-b border-gray-300">
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === "signin"
                    ? "border-gray-300 bg-white text-black"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("signin")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === "signup"
                    ? "border-gray-300 bg-white text-black"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>
            {activeTab === "signin" && (
              <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-black text-white py-3">
                    Sign In
                  </Button>
                  <p className="text-center text-sm mt-2">{message}</p>
                  <Button
                    className="w-full bg-black text-white py-2 mt-4"
                    onClick={handleGoogleSignUp}
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    className="w-full bg-black text-white py-2 mt-2"
                    onClick={handleGoogleSignUp}
                  >
                    Sign in with NPDA
                  </Button>
                </div>
              </form>
            )}
            {activeTab === "signup" && (
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-black text-white py-3">
                    Sign Up
                  </Button>
                  <p className="text-center text-sm mt-2">{message}</p>
                  <Button
                    className="w-full bg-black text-white py-2 mt-4"
                    onClick={handleGoogleSignUp}
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    className="w-full bg-black text-white py-2 mt-2"
                    onClick={handleGoogleSignUp}
                  >
                    Sign up with NPDA
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}