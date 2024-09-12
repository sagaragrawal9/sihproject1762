import React, { useState, useEffect } from 'react'
import { Stamp, Search, Bell, Mail, Menu, Wallet, ChevronRight, MapPin, Calendar as CalendarIcon, Filter, ArrowLeft, ArrowRight } from "lucide-react"

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`} {...props}>
    {children}
  </div>
)

const Calendar = ({ className, selected, onSelect, events, ...props }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const handleDateClick = (day) => {
    onSelect(new Date(currentYear, currentMonth, day))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)
    if (currentMonth === 0) setCurrentYear(prev => prev - 1)
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)
    if (currentMonth === 11) setCurrentYear(prev => prev + 1)
  }

  const isEventDate = (day) => {
    return events.some(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentMonth &&
      event.date.getFullYear() === currentYear
    )
  }

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${className}`} {...props}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map(day => (
          <div key={day} className="font-medium text-gray-500">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const isSelected = selected && day === selected.getDate() && currentMonth === selected.getMonth() && currentYear === selected.getFullYear()
          const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear
          const hasEvent = isEventDate(day)
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`p-2 rounded-full ${
                isSelected
                  ? 'bg-black text-white'
                  : isToday
                  ? 'bg-gray-200 text-black'
                  : hasEvent
                  ? 'bg-red-100 text-red-800'
                  : 'hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const MovingText = ({ text }) => {
  return (
    <div className="bg-amber-100 py-2 overflow-hidden">
      <div className="whitespace-nowrap inline-block animate-marquee">
        <span className="text-lg mx-4">{text}</span>
        <span className="text-lg mx-4">{text}</span>
        
      </div>
    </div>
  )
}

function PhilatelyIndia() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [activeYear, setActiveYear] = useState("2023")

  const events = [
    { date: new Date(2023, 7, 15), name: "Independence Day Special 2023" },
    { date: new Date(2024, 0, 26), name: "Republic Day Special" },
    { date: new Date(2024, 5, 5), name: "World Environment Day" },
    { date: new Date(2024, 7, 15), name: "Independence Day Celebration" },
  ]

  const handleDateChange = (newDate) => {
    setDate(newDate)
    const event = events.find(e => e.date.toDateString() === newDate?.toDateString())
    setSelectedEvent(event ? event.name : null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
     

      <MovingText text="Cancellation releases are special postmarks used to commemorate significant events, featuring unique designs and limited availability. Collect these rare philatelic treasures!" />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Explore Special Cancellation Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="flex flex-col">
                <img src={`/placeholder.svg?height=200&width=400&text=Cancellation+${i}`} alt={`Cancellation ${i}`} className="w-full h-48 object-cover" />
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Independence Day Celebration 2024</h3>
                  <p className="text-gray-600 mb-4">
                    <MapPin className="inline-block mr-1 h-4 w-4" />
                    Delhi Postal Circle
                  </p>
                  <p className="text-gray-600 mb-4">
                    <CalendarIcon className="inline-block mr-1 h-4 w-4" />
                    August 15, 2024
                  </p>
                  <p className="text-sm text-gray-500 mb-4">Special cancellation mark celebrating India's 78th Independence Day.</p>
                </div>
                <div className="p-4 bg-gray-50">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Pre-Order Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Cancellation Release Calendar</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <Calendar
              selected={date}
              onSelect={handleDateChange}
              events={events}
              className="w-full lg:w-1/2"
            />
            <Card className="w-full lg:w-1/2 p-4">
              <h3 className="text-xl font-semibold mb-4">Upcoming Releases</h3>
              {selectedEvent ? (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-semibold text-lg mb-2">{selectedEvent}</h4>
                  <p className="text-sm text-gray-600">Selected date: {date?.toDateString()}</p>
                  <p className="text-sm text-gray-600 mt-2">This is a special cancellation release event. Don't miss out on this unique philatelic opportunity!</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {events.map((event, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <CalendarIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{event.name}</p>
                        <p className="text-sm text-gray-600">{event.date.toDateString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Archive of Past Cancellation Releases</h2>
          <div className="mb-4">
            <Button
              className={`mr-2 ${activeYear === "2023" ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveYear("2023")}
            >
              2023
            </Button>
            <Button
              className={`mr-2 ${activeYear === "2022" ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveYear("2022")}
            >
              2022
            </Button>
            <Button
              className={`mr-2 ${activeYear === "2021" ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveYear("2021")}
            >
              2021
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeYear === "2023" && [1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4">
                <h3 className="text-lg font-semibold mb-2">Diwali Special 2023</h3>
                <p className="text-sm text-gray-600 mb-2">October 24, 2023</p>
                <img src={`/placeholder.svg?height=100&width=200&text=Cancellation+${i}`} alt={`Cancellation ${i}`} className="w-full h-24 object-cover rounded-md mb-2" />
                <p className="text-sm text-gray-500 mb-4">Commemorative cancellation for Diwali festival.</p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
              </Card>
            ))}
            {activeYear === "2022" && [1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4">
                <h3 className="text-lg font-semibold mb-2">Republic Day 2022</h3>
                <p className="text-sm text-gray-600 mb-2">January 26, 2022</p>
                <img src={`/placeholder.svg?height=100&width=200&text=Cancellation+${i}`} alt={`Cancellation ${i}`} className="w-full h-24 object-cover rounded-md mb-2" />
                <p className="text-sm text-gray-500 mb-4">Special cancellation for Republic Day celebrations.</p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
              </Card>
            ))}
            {activeYear === "2021" && [1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4">
                <h3 className="text-lg font-semibold mb-2">Gandhi Jayanti 2021</h3>
                <p className="text-sm text-gray-600 mb-2">October 2, 2021</p>
                <img src={`/placeholder.svg?height=100&width=200&text=Cancellation+${i}`} alt={`Cancellation ${i}`} className="w-full h-24 object-cover rounded-md mb-2" />
                <p className="text-sm text-gray-500 mb-4">Commemorative cancellation for Gandhi Jayanti.</p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default PhilatelyIndia