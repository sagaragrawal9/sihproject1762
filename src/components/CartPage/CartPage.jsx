'use client'

import React, { useState } from 'react'
import { WalletIcon, MailIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from 'lucide-react'
import { useCart } from '../CartContext/CartContext'

const Button = ({ children, variant = "default", size = "default", asChild, ...props }) => {
  const Comp = asChild ? 'a' : "button"
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
        ${variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : ""}
        ${variant === "outline" ? "border border-input hover:bg-accent hover:text-accent-foreground" : ""}
        ${size === "default" ? "h-10 py-2 px-4" : ""}
        ${size === "sm" ? "h-9 px-3 rounded-md" : ""}
        ${size === "icon" ? "h-10 w-10" : ""}
      `}
      {...props}
    >
      {children}
    </Comp>
  )
}

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
))
Label.displayName = "Label"

const Card = ({ className, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
)
const CardHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)
const CardTitle = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
)
const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)
const CardFooter = ({ className, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
)

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`[&_tr:last-child]:border-0 ${className}`}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const Select = React.forwardRef(({ children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className="w-full h-10 pl-3 pr-10 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
      {...props}
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
      </svg>
    </div>
  </div>
))
Select.displayName = "Select"

export default function CartPage() {
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [address, setAddress] = useState({
    street: "123 Philately Street",
    city: "Stamp City",
    state: "Collector's State",
    pincode: "123456"
  })

  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const [couponCode, setCouponCode] = useState("")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCosts = { standard: 100, express: 250 }
  const shipping = shippingCosts[shippingMethod]
  const tax = subtotal * 0.18 // Assuming 18% tax
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <ShoppingCartIcon className="mr-2 h-8 w-8" />
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-xl mb-4">Your cart is empty</p>
              <Button asChild>
                <a href="/marketplace">Continue Shopping</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditingAddress ? (
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input 
                          id="street" 
                          value={address.street}
                          onChange={(e) => setAddress({...address, street: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={address.state}
                          onChange={(e) => setAddress({...address, state: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input 
                          id="pincode" 
                          value={address.pincode}
                          onChange={(e) => setAddress({...address, pincode: e.target.value})}
                        />
                      </div>
                    </form>
                  ) : (
                    <div>
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state}</p>
                      <p>{address.pincode}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="w-full px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {isEditingAddress ? 'Save Address' : 'Edit Address'}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <MinusIcon className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>₹{item.price}</TableCell>
                          <TableCell>₹{item.price * item.quantity}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping">Shipping Method</Label>
                    <Select 
                      id="shipping"
                      value={shippingMethod} 
                      onChange={(e) => setShippingMethod(e.target.value)}
                    >
                      <option value="standard">Standard Shipping (₹100)</option>
                      <option value="express">Express Shipping (₹250)</option>
                    </Select>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coupon">Coupon Code</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="coupon" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    className="w-full px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Place Order
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full px-6 py-2 bg-white text-black font-semibold rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex justify-center"
                    asChild
                  >
                    <a href="/marketplace" className="text-center">Continue Shopping</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}