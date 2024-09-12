import React, { useState, useRef } from 'react'
import { WalletIcon, ShoppingCartIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

// UI Components
const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
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

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
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

const Carousel = ({ children, className = '', ...props }) => (
  <div className={`relative w-full overflow-hidden ${className}`} {...props}>
    {children}
  </div>
)

const CarouselContent = ({ children, className = '', ...props }) => (
  <div className={`flex transition-transform duration-300 ease-in-out ${className}`} {...props}>
    {children}
  </div>
)

const CarouselItem = ({ children, className = '', ...props }) => (
  <div className={`flex-shrink-0 w-full ${className}`} {...props}>
    {children}
  </div>
)

const CarouselPrevious = ({ className = '', ...props }) => (
  <Button variant="outline" size="icon" className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${className}`} {...props}>
    <ChevronLeftIcon className="h-4 w-4" />
  </Button>
)

const CarouselNext = ({ className = '', ...props }) => (
  <Button variant="outline" size="icon" className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 ${className}`} {...props}>
    <ChevronRightIcon className="h-4 w-4" />
  </Button>
)

export default function PhilatelyIndia() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const aboutRef = useRef(null)
  const featuredRef = useRef(null)
  const communityRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroSlides = [
    { title: "Explore the World of Philately", description: "Connect, Discover, Collect with the National Philately Deposit Account.", target: aboutRef },
    { title: "Discover Rare Stamps", description: "Explore our vast collection of unique and historical stamps.", target: featuredRef },
    { title: "Join Our Community", description: "Connect with fellow philatelists and expand your knowledge.", target: communityRef },
  ]

  const featuredCategories = [
    { name: "Stamps", image: "/placeholder.svg?height=200&width=300&text=Stamps" },
    { name: "First Day Covers", image: "/placeholder.svg?height=200&width=300&text=FDC" },
    { name: "Covers", image: "/placeholder.svg?height=200&width=300&text=Covers" },
    { name: "Postcards", image: "/placeholder.svg?height=200&width=300&text=Postcards" },
    { name: "Other Items", image: "/placeholder.svg?height=200&width=300&text=Other" },
  ]

  const communityActivities = [
    { user: "StampCollector23", action: "Posted a new rare stamp in the Marketplace" },
    { user: "PhilatelyExpert", action: "Started a discussion on Indian Postal History" },
    { user: "FirstDayFanatic", action: "Shared photos from recent stamp exhibition" },
    { user: "CoverEnthusiast", action: "Asked a question about Airmail covers" },
  ]

  const newsItems = [
    { title: "Philately News #1", content: "New stamp series announced commemorating Indian scientists.", date: "May 11, 2023" },
    { title: "Philately News #2", content: "Upcoming philatelic exhibition in Mumbai showcasing rare Indian stamps.", date: "May 12, 2023" },
    { title: "Philately News #3", content: "India Post releases special cover for World Environment Day.", date: "May 13, 2023" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      

      <main className="container mx-auto px-4 py-8">
      <section className="mb-12 relative">
  <Carousel>
    <CarouselContent style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
      {heroSlides.map((slide, index) => (
        <CarouselItem key={index}>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img src="/placeholder.svg?height=400&width=1200&text=Philately" alt="Philately" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
              <h2 className="text-4xl font-bold mb-4 text-center">{slide.title}</h2>
              <p className="text-xl mb-8 text-center">{slide.description}</p>
              <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-gray-800" onClick={() => scrollToSection(slide.target)}>Learn More</Button>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious onClick={prevSlide} />
    <CarouselNext onClick={nextSlide} />
  </Carousel>
</section>

        <section ref={featuredRef} className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-center">Featured Collection</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
                  <Button variant="secondary" className="w-full bg-black text-white hover:bg-gray-800" onClick={() => alert('Navigating to marketplace')}>View More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section ref={communityRef} className="h-full">
            <h3 className="text-3xl font-semibold mb-6">Community</h3>
            <Card className="h-full flex flex-col">
              <CardContent className="p-6 flex-grow">
                <p className="mb-4">Join our thriving community of philatelists! Share your collection, participate in discussions, and learn from fellow enthusiasts. Our community features include forums and expert Q&A sessions.</p>
                <Button className="bg-black text-white hover:bg-gray-800 mb-6">Join Community</Button>
                <h4 className="font-semibold text-lg mb-2">Recent Activities</h4>
                <ul className="space-y-4">
                  {communityActivities.map((activity, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Avatar className="mt-1">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${activity.user[0]}`} alt={activity.user} />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="h-full">
            <h3 className="text-3xl font-semibold mb-6">News and Updates</h3>
            <Card className="h-full flex flex-col">
              <CardContent className="p-0 flex-grow">
                {newsItems.map((item, index) => (
                  <div key={index} className="p-4 border-b last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">Latest updates from the philatelic world</p>
                      </div>
                      <Badge variant="secondary" className="bg-black text-white">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {item.date}
                      </Badge>
                    </div>
                    <p>{item.content}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All News</Button>
              </CardFooter>
            </Card>
          </section>
          
        </div>
        
        <section ref={aboutRef} className="  p-10">
  <h3 className="text-3xl font-semibold mb-6 text-center">About Us</h3>
  <Card className="bg-black text-white">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6">
          <h4 className="text-2xl font-bold mb-4">Discover the World of Stamps</h4>
          <p>Our platform connects collectors and enthusiasts from across India, providing access to a wide range of philatelic items, from rare stamps to historical covers. We aim to foster a thriving community of philatelists and preserve the rich heritage of Indian postage.</p>
        </div>
        <div className="md:w-1/2">
          <img src="https://via.placeholder.com/800x500?text=About+Us" alt="About Us" className="w-full h-auto object-cover rounded-lg" />
        </div>
      </div>
    </CardContent>
  </Card>
</section>

      </main>

      
    </div>
  )
}