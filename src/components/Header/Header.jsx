import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletIcon, ShoppingCartIcon, User, LogOut } from 'lucide-react';
import { useCart } from '../CartContext/CartContext';
import myImage3 from '/src/assets/unnamed3.jpeg'

const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background relative';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:after:content-[""] hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-black hover:after:absolute hover:after:bottom-0 hover:after:left-0',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground hover:after:content-[""] hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-black hover:after:absolute hover:after:bottom-0 hover:after:left-0',
    ghost: 'hover:bg-accent hover:text-accent-foreground hover:after:content-[""] hover:after:block hover:after:w-full hover:after:h-1 hover:after:bg-black hover:after:absolute hover:after:bottom-0 hover:after:left-0',
  };
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const LoginPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Login Required</h2>
        <p className="mb-4">You need to log in to view your cart.</p>
        <div className="flex flex-col gap-4">
          <Link to="/Auth">
            <Button variant="outline" size="lg" onClick={onClose} className="w-full">
              Login / Signup
            </Button>
          </Link>
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const { cartItems, user, logout } = useCart();
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/Auth');
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      setIsPopupVisible(true);
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/Home">
          <div className="flex items-center">
            {/* <img src= {myImage3} alt="PhilatelyIndia Logo" className="mr-2" /> */}
            <h1 className="text-2xl font-bold">PhilatelyIndia</h1>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/Home">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/CancellationRelease">
            <Button variant="ghost">Cancellation Release</Button>
          </Link>
          <Link to="/Community">
            <Button variant="ghost">Community</Button>
          </Link>
          <Link to="/MarketPlace">
            <Button variant="ghost">Marketplace</Button>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/npda">
            <Button variant="outline" size="sm">
              <WalletIcon className="mr-2 h-4 w-4" />
              NPDA
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleCartClick}>
            <ShoppingCartIcon className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
          {user ? (
            <>
              <Link to="/DashBoard">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/Auth">
              <Button variant="outline" size="sm">
                Login / Signup
              </Button>
            </Link>
          )}
        </div>
      </div>
      {isPopupVisible && <LoginPopup onClose={handlePopupClose} />}
    </header>
  );
}