'use client'

import React, { useState } from 'react'
import { WalletIcon, PlusIcon, Upload, AlertCircle, ChevronDownIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

// Button Component
const Button = ({ children, className = '', onClick, variant = 'default', type = 'button', disabled = false }) => (
  <button
    className={`px-4 py-2 rounded ${variant === 'outline' ? 'border border-gray-300 hover:bg-gray-100' : 'bg-blue-500 text-white hover:bg-blue-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
)

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
)

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b">{children}</div>
)

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
)

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
)

const CardFooter = ({ children }) => (
  <div className="px-6 py-4 border-t">{children}</div>
)

// Input Component
const Input = ({ id, name, type = 'text', value, onChange, className = '', min, step, required = false, placeholder }) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
    min={min}
    step={step}
    required={required}
    placeholder={placeholder}
  />
)

// Label Component
const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
)

// Textarea Component
const Textarea = ({ id, name, value, onChange, className = '', required = false }) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
    required={required}
  />
)

// Table Components
const Table = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200">{children}</table>
)

const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">{children}</thead>
)

const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
)

const TableRow = ({ children }) => (
  <tr>{children}</tr>
)

const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
)

const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
)

// Dialog Components
const Dialog = ({ children, open, onOpenChange }) => (
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        {children}
      </div>
    </div>
  ) : null
)

const DialogContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
)

const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
)

const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
)

const DialogFooter = ({ children }) => (
  <div className="mt-6 flex justify-end">{children}</div>
)

// Alert Components
const Alert = ({ children }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">{children}</div>
)

const AlertTitle = ({ children }) => (
  <h3 className="text-sm font-medium text-yellow-800">{children}</h3>
)

const AlertDescription = ({ children }) => (
  <div className="mt-2 text-sm text-yellow-700">{children}</div>
)

// Checkbox Component
const Checkbox = ({ id, checked, onCheckedChange, required = false }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    required={required}
    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
  />
)

// Select Component
const Select = ({ children, name, value, onChange }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  >
    {children}
  </select>
)

export default function NPDADashboard() {
  const [balance, setBalance] = useState(1000)
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false)
  const [showCreateAccountDialog, setShowCreateAccountDialog] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [addAmount, setAddAmount] = useState('')
  const [transactions, setTransactions] = useState([
    { date: '2023-05-01', type: 'Deposit', amount: 500 },
    { date: '2023-05-15', type: 'Purchase', amount: -200 },
    { date: '2023-06-01', type: 'Deposit', amount: 1000 },
    { date: '2023-06-10', type: 'Purchase', amount: -300 },
  ])
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    phone: '',
    idType: 'aadhaar',
    idNumber: '',
    idFile: null,
    initialDeposit: '',
    termsAccepted: false
  })

  const handleAddFunds = (e) => {
    e.preventDefault()
    const amount = parseFloat(addAmount)
    if (!isNaN(amount) && amount > 0) {
      setBalance(prevBalance => prevBalance + amount)
      const newTransaction = {
        date: new Date().toISOString().split('T')[0],
        type: 'Deposit',
        amount: amount
      }
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions])
      setShowAddFundsDialog(false)
      setAddAmount('')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, idFile: e.target.files[0] }))
    }
  }

  const isFormValid = () => {
    const { fullName, address, city, state, pincode, email, phone, idNumber, idFile, initialDeposit, termsAccepted } = formData
    return (
      fullName && address && city && state && pincode && email && phone && idNumber &&
      idFile && initialDeposit && parseFloat(initialDeposit) >= 200 && termsAccepted
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      console.log('Form submitted:', formData)
      setShowCreateAccountDialog(false)
      setShowConfirmationDialog(true)
    } else {
      alert('Please fill out all fields correctly and accept the terms and conditions before submitting!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">National Philately Deposit Account (NPDA)</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What is NPDA?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The National Philately Deposit Account (NPDA) is a convenient way for philatelists to purchase stamps and other philatelic products from India Post. It allows you to deposit funds in advance and use them for future purchases, making transactions quicker and easier.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowCreateAccountDialog(true)}>Create NPDA Account</Button>
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">₹{balance.toFixed(2)}</div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setShowAddFundsDialog(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {transaction.amount > 0 ? <ArrowUpIcon className="inline mr-1 h-4 w-4" /> : <ArrowDownIcon className="inline mr-1 h-4 w-4" />}
                        ₹{Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to NPDA</DialogTitle>
            <DialogDescription>
              Enter the amount you want to add to your NPDA balance.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddFunds}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount (₹)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="col-span-3"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Payment Method
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  <Button type="button" variant="outline">Credit Card</Button>
                  <Button type="button" variant="outline">Debit Card</Button>
                  <Button type="button" variant="outline">UPI</Button>
                  <Button type="button" variant="outline">Net Banking</Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateAccountDialog} onOpenChange={setShowCreateAccountDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>NPDA Application Form</DialogTitle>
            <DialogDescription>
              Fill out the form below to create your National Philately Deposit Account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idType">Identification Type</Label>
                <Select
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                >
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="pan">PAN Card</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">Identification Number</Label>
                <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idFile">Upload Identification Proof</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="idFile"
                    name="idFile"
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById('idFile').click()}>
                    <Upload className="inline-block mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  <span className="text-sm text-gray-600">
                    {formData.idFile ? formData.idFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialDeposit">Initial Deposit Amount (Minimum ₹200)</Label>
                <Input id="initialDeposit" name="initialDeposit" type="number" min="200" value={formData.initialDeposit} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked }))}
                required
              />
              <Label htmlFor="termsAccepted">
                I agree to the terms and conditions
              </Label>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!isFormValid()}>Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted</DialogTitle>
          </DialogHeader>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your application has been submitted successfully. You will be notified about your account via email in the next 2 to 4 business days.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button onClick={() => setShowConfirmationDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}