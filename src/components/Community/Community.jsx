import React, { useState, useEffect } from 'react'
import { Bell, Calendar, Camera, Check, ChevronDown, ChevronRight, Heart, Home, Image as ImageIcon, Mail, MessageSquare, PlusCircle, Search, Settings, Share2, ThumbsDown, ThumbsUp, User, X, Bookmark, TrendingUp, Gift, Award, Star, Zap, Users, BarChart, HelpCircle, FileText, Tag, Globe, Inbox, MoreHorizontal, Menu } from 'lucide-react'
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as ToastPrimitiveNew from "@radix-ui/react-toast"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import myImage3 from '/src/assets/unnamed3.jpeg'

// Component definitions
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${variant === "default" ? "bg-black text-white hover:bg-gray-800" : ""}
        ${variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
        ${variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : ""}
        ${variant === "secondary" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""}
        ${variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : ""}
        ${variant === "link" ? "underline-offset-4 hover:underline text-primary" : ""}
        ${size === "default" ? "h-12 px-6" : ""}
        ${size === "sm" ? "h-9 px-3" : ""}
        ${size === "lg" ? "h-14 px-8" : ""}
        ${className}`}
      ref={ref}
      {...props}
    />
  )
})

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})

const Card = ({ className, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
)

const CardHeader = ({
  className,
  ...props
}) => (
  <div
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
)

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
))

const CardContent = ({
  className,
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)

const CardFooter = ({
  className,
  ...props
}) => (
  <div
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
)

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
))

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={`aspect-square h-full w-full ${className}`}
    {...props}
  />
))

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
    {...props}
  />
))

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))

const ToastProvider = ToastPrimitiveNew.Provider
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitiveNew.Viewport
    ref={ref}
    className={`fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className}`}
    {...props}
  />
))

const Toast = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <ToastPrimitiveNew.Root
      ref={ref}
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full ${className}`}
      {...props}
    />
  )
})

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitiveNew.Title
    ref={ref}
    className={`text-sm font-semibold ${className}`}
    {...props}
  />
))

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitiveNew.Description
    ref={ref}
    className={`text-sm opacity-90 ${className}`}
    {...props}
  />
))

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitiveNew.Close
    ref={ref}
    className={`absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 ${className}`}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitiveNew.Close>
))

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={`z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
    {...props}
  />
))

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${inset && "pl-8"} ${className}`}
    {...props}
  />
))

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={`px-2 py-1.5 text-sm font-semibold ${inset && "pl-8"} ${className}`}
    {...props}
  />
))

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={`-mx-1 my-1 h-px bg-muted ${className}`}
    {...props}
  />
))

// Main Dashboard Component
const PhilatelistDashboard = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Rare 1856 British Guiana", content: "Just acquired this gem!", likes: 42, comments: [
      { id: 1, author: "StampMaster", content: "Wow, that's an incredible find!", replies: [
        { id: 1, author: "CurrentUser", content: "Thanks! I'm really excited about it." }
      ]},
      { id: 2, author: "CollectorPro", content: "How much did it cost you?", replies: [] }
    ], author: "StampMaster", tags: ["#RareStamps", "#BritishGuiana"], image: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Upcoming Philatelic Exhibition", content: "Don't miss the annual exhibition next month!", likes: 28, comments: [], author: "EventOrganizer", tags: ["#Events", "#Exhibition"] },
    { id: 3, title: "Stamp Collecting Tips", content: "Here are some tips for preserving your stamps...", likes: 35, comments: [], author: "CollectorPro", tags: ["#Tips", "#Preservation"] },
  ])

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', image: null })
  const [newComment, setNewComment] = useState('')
  const [activePost, setActivePost] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])
  const [trendingTopics, setTrendingTopics] = useState(['#RareStamps', '#VintageCollections', '#StampCare'])
  const [userPoints, setUserPoints] = useState(100)
  const [userBadges, setUserBadges] = useState(['Novice Collector', 'Active Commenter'])
  const [userLevel, setUserLevel] = useState(1)
  const [userExperience, setUserExperience] = useState(0)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const [toasts, setToasts] = useState([])

  const addToast = (title, description) => {
    const id = Date.now()
    setToasts(prevToasts => [...prevToasts, { id, title, description }])
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
    }, 3000)
  }

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      addToast("Error", "Please fill in both title and content for your post.")
      return
    }
    const newPostObj = {
      id: posts.length + 1,
      ...newPost,
      likes: 0,
      comments: [],
      author: "CurrentUser",
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      image: newPost.image ? URL.createObjectURL(newPost.image) : null
    }
    setPosts([newPostObj, ...posts])
    setIsCreatePostOpen(false)
    setNewPost({ title: '', content: '', tags: '', image: null })
    addToast("Post Created", "Your post has been successfully created and shared with the community.")
    addExperience(20)
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
    addToast("Post Liked", "You've successfully liked this post.")
    addExperience(1)
  }

  const handleComment = () => {
    if (activePost) {
      const newCommentObj = {
        id: activePost.comments.length + 1,
        author: "CurrentUser",
        content: newComment,
        replies: []
      }
      setPosts(posts.map(post => 
        post.id === activePost.id 
          ? { ...post, comments: [...post.comments, newCommentObj] } 
          : post
      ))
      setActivePost(null)
      setNewComment('')
      addToast("Comment Added", "Your comment has been successfully added to the post.")
      addExperience(5)
    }
  }

  const handleReply = () => {
    if (activePost && replyingTo) {
      const newReply = {
        id: replyingTo.replies.length + 1,
        author: "CurrentUser",
        content: newComment
      }
      setPosts(posts.map(post => 
        post.id === activePost.id 
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === replyingTo.id
                  ? { ...comment, replies: [...comment.replies, newReply] }
                  : comment
              )
            }
          : post
      ))
      setReplyingTo(null)
      setNewComment('')
      addToast("Reply Added", "Your reply has been successfully added to the comment.")
      addExperience(3)
    }
  }

  const handleShare = (postId) => {
    setIsShareModalOpen(true)
    setActivePost(posts.find(post => post.id === postId))
  }

  const handleBookmark = (postId) => {
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId))
      addToast("Post Unbookmarked", "The post has been removed from your bookmarks.")
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId])
      addToast("Post Bookmarked", "The post has been added to your bookmarks.")
      addExperience(2)
    }
  }

  const addExperience = (amount) => {
    const newExperience = userExperience + amount
    setUserExperience(newExperience)
    if (newExperience >= userLevel * 100) {
      setUserLevel(prevLevel => prevLevel + 1)
      setUserExperience(newExperience - (userLevel * 100))
      addToast("Level Up!", `Congratulations! You've reached level ${userLevel + 1}.`)
    }
  }

  const handleAwardBadge = () => {
    if (userPoints >= 500 && !userBadges.includes('Expert Collector')) {
      setUserBadges([...userBadges, 'Expert Collector'])
      addToast("New Badge Earned", "Congratulations! You've earned the 'Expert Collector' badge.")
    }
  }

  const startChallenge = () => {
    setActiveChallenge({
      title: "Daily Collector",
      description: "Create 3 posts in a day",
      progress: 0,
      target: 3,
      reward: 50
    })
    addToast("Challenge Started", "You've started the 'Daily Collector' challenge. Good luck!")
  }

  useEffect(() => {
    handleAwardBadge()
  }, [userPoints])

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Card className="mb-6 bg-gradient-to-r from-gray-100 to-gray-200">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800">Create a Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="border-2 border-gray-300 focus:border-black"
                  />
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                    className="border-2 border-gray-300 focus:border-black"
                  />
                  <Input
                    placeholder="Add tags (comma-separated)"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    className="border-2 border-gray-300 focus:border-black"
                  />
                  <div>
                    <label htmlFor="post-image" className="block text-sm font-medium text-gray-700 mb-2">Add an image</label>
                    <Input
                      id="post-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
                      className="border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                  <Button onClick={handleCreatePost} className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200">Post</Button>
                </div>
              </CardContent>
            </Card>

            {posts.map((post) => (
              <Card key={post.id} className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>Posted by {post.author}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleShare(post.id)}>Share</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBookmark(post.id)}>
                          {bookmarkedPosts.includes(post.id) ? 'Remove Bookmark' : 'Bookmark'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                  {post.image && (
                    <img src={myImage3} alt="Post image" className="mt-4 rounded-lg" />
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setActivePost(post)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {post.comments.length}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(post.id)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardFooter>
                {activePost && activePost.id === post.id && (
                  <div className="px-6 pb-6">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2 border-2 border-gray-300 focus:border-black"
                    />
                    <Button onClick={handleComment} className="bg-black text-white hover:bg-gray-800">Post Comment</Button>
                    <div className="mt-4 space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold">{comment.author}</p>
                          <p>{comment.content}</p>
                          <div className="mt-2">
                            <Button variant="ghost" size="sm" onClick={() => setReplyingTo(comment)}>
                              Reply
                            </Button>
                          </div>
                          {replyingTo && replyingTo.id === comment.id && (
                            <div className="mt-2">
                              <Textarea
                                placeholder="Write a reply..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="mb-2 border-2 border-gray-300 focus:border-black"
                              />
                              <Button onClick={handleReply} className="bg-black text-white hover:bg-gray-800">Post Reply</Button>
                            </div>
                          )}
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="ml-4 mt-2 bg-white p-2 rounded-lg">
                              <p className="font-semibold">{reply.author}</p>
                              <p>{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </>
        )
      case 'explore':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Explore Stamps</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Here you can explore various stamps from different countries and eras.</p>
              {/* Add stamp exploration functionality here */}
            </CardContent>
          </Card>
        )
      case 'messages':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your messages will appear here.</p>
              {/* Add messaging functionality here */}
            </CardContent>
          </Card>
        )
      case 'bookmarks':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {bookmarkedPosts.length > 0 ? (
                posts.filter(post => bookmarkedPosts.includes(post.id)).map(post => (
                  <div key={post.id} className="mb-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p>{post.content.substring(0, 100)}...</p>
                  </div>
                ))
              ) : (
                <p>You haven't bookmarked any posts yet.</p>
              )}
            </CardContent>
          </Card>
        )
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src="src/assets/unmaned.jpeg" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-500">Stamp Enthusiast</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>Level: {userLevel}</p>
                <Progress value={(userExperience / (userLevel * 100)) * 100} />
                <p>Experience: {userExperience} / {userLevel * 100}</p>
                <p>Points: {userPoints}</p>
                <div>
                  <p className="font-semibold">Badges:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userBadges.map((badge, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Adjust your account settings here.</p>
              {/* Add settings options here */}
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className={`bg-white w-64 fixed h-full z-20 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6"></h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Button variant="ghost" className={`w-full justify-start ${activeSection === 'home' ? 'bg-gray-100' : ''}`} onClick={() => setActiveSection('home')}>
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Button>
              </li>
              <li>
                <Button variant="ghost" className={`w-full justify-start ${activeSection === 'explore' ? 'bg-gray-100' : ''}`} onClick={() => setActiveSection('explore')}>
                  <Search className="mr-2 h-5 w-5" />
                  Explore
                </Button>
              </li>
              <li>
                <Button variant="ghost" className={`w-full justify-start ${activeSection === 'messages' ? 'bg-gray-100' : ''}`} onClick={() => setActiveSection('messages')}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Messages
                </Button>
              </li>
              <li>
                <Button variant="ghost" className={`w-full justify-start ${activeSection === 'bookmarks' ? 'bg-gray-100' : ''}`} onClick={() => setActiveSection('bookmarks')}>
                  <Bookmark className="mr-2 h-5 w-5" />
                  Bookmarks
                </Button>
              </li>
              <li>
                <Button variant="ghost" className={`w-full justify-start ${activeSection === 'profile' ? 'bg-gray-100' : ''}`} onClick={() => setActiveSection('profile')}>
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>
              </li>
              <li>
                <Button variant="ghost" className={`w-full justify-start ${activeSection === 'settings' ? 'bg-gray-100' : ''}`} onClick={() => setActiveSection('settings')}>
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Philatelist Community</h1>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setIsNotificationOpen(true)}>
                      <Bell className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setIsMessageOpen(true)}>
                      <Mail className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveSection('profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveSection('settings')}>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2">
              {renderContent()}
            </div>

            {/* Right Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Active Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  {activeChallenge ? (
                    <div>
                      <h3 className="font-semibold">{activeChallenge.title}</h3>
                      <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                      <Progress value={(activeChallenge.progress / activeChallenge.target) * 100} className="mt-2" />
                      <p className="text-sm mt-1">Progress: {activeChallenge.progress} / {activeChallenge.target}</p>
                      <p className="text-sm">Reward: {activeChallenge.reward} points</p>
                    </div>
                  ) : (
                    <Button onClick={startChallenge} className="w-full bg-black text-white hover:bg-gray-800">Start a Challenge</Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {/* Notification Modal */}
      {isNotificationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <p>You have no new notifications.</p>
            <Button onClick={() => setIsNotificationOpen(false)} className="mt-4 bg-black text-white hover:bg-gray-800">Close</Button>
          </div>
        </div>
      )}

      <ToastProvider>
        <ToastViewport />
        {toasts.map(({ id, title, description }) => (
          <Toast key={id}>
            <div className="grid gap-1">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        ))}
      </ToastProvider>
    </div>
  )
}

// Wrap the main component with ErrorBoundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default function Community() {
  return (
    <ErrorBoundary>
      <PhilatelistDashboard />
    </ErrorBoundary>
  )
}