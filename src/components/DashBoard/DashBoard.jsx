'use client'

import React, { useState } from 'react'
import { WalletIcon, ShoppingCartIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, UserIcon, HeartIcon, PackageIcon, PhoneIcon, XIcon } from 'lucide-react'

// UI Components
const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  }
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  }
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const Avatar = ({ children, className = '', ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
)

const AvatarImage = ({ src, alt = '', className = '', ...props }) => (
  <img className={`aspect-square h-full w-full ${className}`} src={src} alt={alt} {...props} />
)

const AvatarFallback = ({ children, className = '', ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
    {children}
  </div>
)

const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  }
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

const Table = ({ children, className = '', ...props }) => (
  <div className={`w-full overflow-auto ${className}`}>
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
)

const TableHeader = ({ children, className = '', ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props}>
    {children}
  </thead>
)

const TableBody = ({ children, className = '', ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
    {children}
  </tbody>
)

const TableRow = ({ children, className = '', ...props }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`} {...props}>
    {children}
  </tr>
)

const TableHead = ({ children, className = '', ...props }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </th>
)

const TableCell = ({ children, className = '', ...props }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </td>
)

const Tabs = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
)

const TabsList = ({ children, className = '', ...props }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`} {...props}>
    {children}
  </div>
)

const TabsTrigger = ({ children, className = '', active, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      active
        ? 'bg-background text-foreground shadow-sm'
        : 'hover:bg-muted hover:text-accent-foreground'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
)

const TabsContent = ({ children, className = '', ...props }) => (
  <div
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </div>
)

const Popup = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Action Required</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      {children}
    </div>
  </div>
)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    npdaBalance: 5000,
    avatar: '/placeholder.svg?height=100&width=100&text=JD'
  })

  const [orderHistory, setOrderHistory] = useState([
    { id: '001', date: '2023-05-15', items: 'Rare Indian Stamps Set', total: 1200, status: 'Delivered' },
    { id: '002', date: '2023-05-10', items: 'First Day Cover Collection', total: 800, status: 'Shipped' },
    { id: '003', date: '2023-05-05', items: 'Vintage Postcards', total: 500, status: 'Processing' },
  ])

  const [wishlist, setWishlist] = useState([
    { id: 'W001', name: 'Maharaja Ranjit Singh Stamp', price: 2500 },
    { id: 'W002', name: 'Indian National Flag Centenary Cover', price: 1800 },
    { id: 'W003', name: 'Rare Princely States Collection', price: 5000 },
  ])

  const [recommendations, setRecommendations] = useState([
    { id: 'R001', name: 'Modern Indian Art Stamps', price: 1500 },
    { id: 'R002', name: 'Wildlife of India Series', price: 2200 },
    { id: 'R003', name: 'Indian Cinema Centenary Collection', price: 3000 },
  ])

  const [popupContent, setPopupContent] = useState(null)

  const showPopup = (content) => {
    setPopupContent(content)
  }

  const closePopup = () => {
    setPopupContent(null)
  }

  const addFunds = () => {
    showPopup(
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <div className="space-y-2">
          <Button onClick={() => handlePaymentMethod('Credit Card')} className="w-full">Credit Card</Button>
          <Button onClick={() => handlePaymentMethod('Debit Card')} className="w-full">Debit Card</Button>
          <Button onClick={() => handlePaymentMethod('Net Banking')} className="w-full">Net Banking</Button>
          <Button onClick={() => handlePaymentMethod('UPI')} className="w-full">UPI</Button>
        </div>
      </div>
    )
  }

  const handlePaymentMethod = (method) => {
    showPopup(
      <div>
        <h3 className="text-lg font-semibold mb-4">Add Funds via {method}</h3>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border rounded mb-4"
          id="fundAmount"
        />
        <Button onClick={() => handlePayment(method)} className="w-full">Add Funds</Button>
      </div>
    )
  }

  const handlePayment = (method) => {
    const amount = document.getElementById('fundAmount').value
    if (amount && !isNaN(Number(amount))) {
      setUserProfile(prev => ({
        ...prev,
        npdaBalance: prev.npdaBalance + Number(amount)
      }))
      showPopup(
        <div>
          <p className="mb-4">Successfully added ₹{amount} to your NPDA balance via {method}.</p>
          <Button onClick={closePopup} className="w-full">Close</Button>
        </div>
      )
    } else {
      showPopup(
        <div>
          <p className="mb-4">Invalid amount. Please enter a valid number.</p>
          <Button onClick={closePopup} className="w-full">Close</Button>
        </div>
      )
    }
  }

  const shopNow = () => {
    showPopup(
      <div>
        <p className="mb-4">Redirecting to the shop page...</p>
        <Button onClick={closePopup} className="w-full">Close</Button>
      </div>
    )
  }

  const viewWishlist = () => {
    setActiveTab('wishlist')
    closePopup()
  }

  const trackOrder = () => {
    showPopup(
      <div>
        <h3 className="text-lg font-semibold mb-4">Track Your Order</h3>
        <input
          type="text"
          placeholder="Enter Order ID or Tracking Number"
          className="w-full p-2 border rounded mb-4"
          id="trackingInput"
        />
        <Button onClick={handleTrackOrder} className="w-full">Track</Button>
      </div>
    )
  }

  const handleTrackOrder = () => {
    const trackingNumber = document.getElementById('trackingInput').value
    showPopup(
      <div>
        <h3 className="text-lg font-semibold mb-4">Tracking Order: {trackingNumber}</h3>
        <p className="mb-4">Current Status: In Transit</p>
        <p className="mb-4">Estimated Delivery: 3-5 business days</p>
        <Button onClick={closePopup} className="w-full">Close</Button>
      </div>
    )
  }

  const contactSupport = () => {
    showPopup(
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
        <p className="mb-4">Our support team is available 24/7. How would you like to reach us?</p>
        <div className="space-y-2">
          <Button onClick={() => handleSupportOption('Chat')} className="w-full">Start Chat</Button>
          <Button onClick={() => handleSupportOption('Call')} className="w-full">Request Call</Button>
          <Button onClick={() => handleSupportOption('Email')} className="w-full">Send Email</Button>
        </div>
      </div>
    )
  }

  const handleSupportOption = (option) => {
    showPopup(
      <div>
        <p className="mb-4">Initiating {option} support. A representative will be with you shortly.</p>
        <Button onClick={closePopup} className="w-full">Close</Button>
      </div>
    )
  }

  const saveChanges = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedProfile = {
      name: formData.get('name'),
      email: formData.get('email'),
    }
    setUserProfile(prev => ({ ...prev, ...updatedProfile }))
    showPopup(
      <div>
        <p className="mb-4">Profile updated successfully!</p>
        <Button onClick={closePopup} className="w-full">Close</Button>
      </div>
    )
  }

  const addToCart = (item) => {
    showPopup(
      <div>
        <p className="mb-4">Added {item.name} to cart!</p>
        <Button onClick={closePopup} className="w-full">Continue Shopping</Button>
        <Button onClick={() => {
          closePopup()
          shopNow()
        }} className="w-full mt-2">Go to Cart</Button>
      </div>
    )
  }

  const removeFromWishlist = (itemId) => {
    setW
ishlist(prev => prev.filter(item => item.id !== itemId))
    showPopup(
      <div>
        <p className="mb-4">Item removed from wishlist.</p>
        <Button onClick={closePopup} className="w-full">Close</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                <p className="text-sm text-gray-500">{userProfile.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NPDA Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <WalletIcon className="h-10 w-10 text-black" />
              <div>
                <p className="text-2xl font-bold">₹{userProfile.npdaBalance}</p>
                <p className="text-sm text-gray-500">Available Balance</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={addFunds}>Add Funds</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col items-center justify-center h-24" onClick={shopNow}>
                <ShoppingCartIcon className="h-6 w-6 mb-2" />
                Shop Now
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24" onClick={viewWishlist}>
                <HeartIcon className="h-6 w-6 mb-2" />
                View Wishlist
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24" onClick={trackOrder}>
                <PackageIcon className="h-6 w-6 mb-2" />
                Track Order
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24" onClick={contactSupport}>
                <PhoneIcon className="h-6 w-6 mb-2" />
                Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs className="space-y-4">
        <TabsList className="bg-white rounded-lg p-1 flex">
          <TabsTrigger active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>Profile</TabsTrigger>
          <TabsTrigger active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Orders</TabsTrigger>
          <TabsTrigger active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')}>Wishlist</TabsTrigger>
          <TabsTrigger active={activeTab === 'recommendations'} onClick={() => setActiveTab('recommendations')}>Recommendations</TabsTrigger>
        </TabsList>

        {activeTab === 'profile' && (
          <TabsContent>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={saveChanges}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" className="w-full p-2 border rounded" defaultValue={userProfile.name} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" className="w-full p-2 border rounded" defaultValue={userProfile.email} />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'orders' && (
          <TabsContent>
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistory.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>₹{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => showPopup(
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Order Details: {order.id}</h3>
                              <p>Date: {order.date}</p>
                              <p>Items: {order.items}</p>
                              <p>Total: ₹{order.total}</p>
                              <p>Status: {order.status}</p>
                              <Button onClick={closePopup} className="w-full mt-4">Close</Button>
                            </div>
                          )}>View</Button>
                          <Button variant="ghost" size="sm" onClick={() => trackOrder(order.id)}>Track</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'wishlist' && (
          <TabsContent>
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishlist.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => addToCart(item)}>Add to Cart</Button>
                        <Button variant="ghost" size="sm" onClick={() => removeFromWishlist(item.id)}>Remove</Button>
                        
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'recommendations' && (
          <TabsContent>
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <img src="/placeholder.svg?height=200&width=300&text=Stamp" alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
                        <h4 className="font-semibold mb-2">{item.name}</h4>
                        <p className="text-gray-500 mb-4">₹{item.price}</p>
                        <Button className="w-full" onClick={() => addToCart(item)}>Add to Cart</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {popupContent && (
        <Popup onClose={closePopup}>
          {popupContent}
        </Popup>
      )}
    </div>
  )
}