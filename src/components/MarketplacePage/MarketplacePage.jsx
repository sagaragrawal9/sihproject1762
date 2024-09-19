'use client'

import React, { useState, useRef } from 'react'
import { Search, Wallet, Bell, Mail, Menu, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useCart } from '../CartContext/CartContext'

const generateItems = (count) => {
  const categories = ["Stamps", "First Day Covers", "Postal History", "Postmarks", "Postal Stationery"]
  const items = []
  for (let i = 1; i <= count; i++) {
    items.push({
      id: i,
      name: `Philatelic Item ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 10000) + 100,
      image: `/src/assets/unnamed2.jpeg`,
      description: `This is a detailed description for Philatelic Item ${i}. It's a unique piece for collectors.`,
      rating: (Math.random() * 2 + 3).toFixed(1)
    })
  }
  return items
}

const philatelicItems = generateItems(200)

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const scrollContainerRef = useRef(null)
  const { addToCart } = useCart()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  const uniqueCategories = ["All", ...new Set(philatelicItems.map(item => item.category))]

  const filteredItems = philatelicItems.filter(item => 
    (selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price_low_to_high":
        return a.price - b.price
      case "price_high_to_low":
        return b.price - a.price
      case "avg_customer_review":
        return parseFloat(b.rating) - parseFloat(a.rating)
      case "newest_arrivals":
        return b.id - a.id
      default:
        return 0
    }
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const pageCount = Math.ceil(sortedItems.length / itemsPerPage)

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const scrollFeaturedCollection = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleAddToCart = (item) => {
    addToCart(item)
    setNotificationMessage(`${item.name} added to cart`)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Categories</h3>
              <ul className="space-y-2">
                {uniqueCategories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category.toLowerCase())}
                      className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category.toLowerCase() ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:w-3/4">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
              <form onSubmit={handleSearch} className="w-full sm:w-auto mb-2 sm:mb-0 flex">
                <input
                  type="text"
                  placeholder="Search philatelic items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
              <div className="w-full sm:w-auto flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
                <p className="text-sm text-gray-600 mr-2">{sortedItems.length} results</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price_low_to_high">Price: Low to High</option>
                  <option value="price_high_to_low">Price: High to Low</option>
                  <option value="avg_customer_review">Avg. Customer Review</option>
                  <option value="newest_arrivals">Newest Arrivals</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentItems.map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(parseFloat(item.rating)) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                    </div>
                    <p className="text-lg font-bold mb-2">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <button
                      className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              {Array.from({ length: Math.min(5, pageCount) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              {pageCount > 5 && (
                <>
                  <span className="mx-1">...</span>
                  <button
                    onClick={() => paginate(pageCount)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === pageCount ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {pageCount}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Featured Collection</h2>
          <div className="relative">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
              {philatelicItems.slice(0, 10).map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col w-64 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(parseFloat(item.rating)) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                    </div>
                    <p className="text-lg font-bold mb-2">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <button
                      className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollFeaturedCollection('left')}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md shadow-lg hover:bg-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollFeaturedCollection('right')}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-md shadow-lg hover:bg-gray-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </main>
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          {notificationMessage}
        </div>
      )}
    </div>
  )
}