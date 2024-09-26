'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Coffee, Utensils, Milk, Beer, Soup, Sandwich, Sun, Snowflake, IceCream2, Search } from 'lucide-react'
import Image from 'next/image'

const shopName = "Steamy Sips & Bites"

const categoriesArray = [
  { key: "Tea", value: "Tea", icon: Coffee },
  { key: "Coffee", value: "Coffee", icon: Coffee },
  { key: "HotMilk", value: "Hot Milk", icon: Milk },
  { key: "Snacks", value: "Snacks", icon: Utensils },
  { key: "Milkshakes", value: "Milkshakes", icon: IceCream2 },
  { key: "Lemonades", value: "Lemonades", icon: Beer },
  { key: "SummerChills", value: "Summer Chills", icon: Sun },
  { key: "ColdCoffee", value: "Cold Coffee", icon: Snowflake },
  { key: "Maggi", value: "Maggi", icon: Soup },
  { key: "Sandwich", value: "Sandwich", icon: Sandwich },
  { key: "Burger", value: "Burger", icon: Utensils },
  { key: "Favorites", value: "Favorites", icon: Heart }
]

const predefinedMenuItems = {
  Tea: [
    { id: 'tea-1', name: "Black Tea", price: "$5", description: "Strong and bold black tea.", category: "Tea" },
    { id: 'tea-2', name: "Green Tea", price: "$5", description: "Light and refreshing green tea.", category: "Tea" },
    { id: 'tea-3', name: "White Tea", price: "$6", description: "Delicate and subtle white tea.", category: "Tea" },
    { id: 'tea-4', name: "Oolong Tea", price: "$6", description: "Complex and aromatic oolong tea.", category: "Tea" },
    { id: 'tea-5', name: "Chai Tea", price: "$5", description: "Spiced Indian-style tea.", category: "Tea" },
    { id: 'tea-6', name: "Earl Grey", price: "$5", description: "Black tea flavored with bergamot.", category: "Tea" },
    { id: 'tea-7', name: "Chamomile", price: "$4", description: "Soothing herbal tea.", category: "Tea" },
    { id: 'tea-8', name: "Peppermint Tea", price: "$4", description: "Refreshing mint herbal tea.", category: "Tea" },
    { id: 'tea-9', name: "Jasmine Tea", price: "$5", description: "Green tea scented with jasmine.", category: "Tea" },
    { id: 'tea-10', name: "Rooibos", price: "$5", description: "Caffeine-free South African red tea.", category: "Tea" }
  ],
  Coffee: [
    { id: 'coffee-1', name: "Espresso", price: "$3", description: "Strong black coffee shot.", category: "Coffee" },
    { id: 'coffee-2', name: "Cappuccino", price: "$4", description: "Espresso with steamed milk and foam.", category: "Coffee" },
    { id: 'coffee-3', name: "Latte", price: "$4", description: "Espresso with lots of steamed milk.", category: "Coffee" },
    { id: 'coffee-4', name: "Americano", price: "$3", description: "Espresso diluted with hot water.", category: "Coffee" },
    { id: 'coffee-5', name: "Mocha", price: "$5", description: "Espresso with chocolate and steamed milk.", category: "Coffee" },
    { id: 'coffee-6', name: "Macchiato", price: "$4", description: "Espresso with a dash of frothy milk.", category: "Coffee" },
    { id: 'coffee-7', name: "Flat White", price: "$4", description: "Espresso with steamed milk, no foam.", category: "Coffee" },
    { id: 'coffee-8', name: "Irish Coffee", price: "$6", description: "Coffee with whiskey and cream.", category: "Coffee" },
    { id: 'coffee-9', name: "Affogato", price: "$5", description: "Espresso poured over ice cream.", category: "Coffee" },
    { id: 'coffee-10', name: "Turkish Coffee", price: "$4", description: "Finely ground coffee brewed in a pot.", category: "Coffee" }
  ],
  HotMilk: [
    { id: 'hot-milk-1', name: "Classic Hot Milk", price: "$3", description: "Warm, comforting plain milk.", category: "Hot Milk" },
    { id: 'hot-milk-2', name: "Turmeric Milk", price: "$4", description: "Hot milk with turmeric and spices.", category: "Hot Milk" },
    { id: 'hot-milk-3', name: "Honey Milk", price: "$4", description: "Hot milk sweetened with honey.", category: "Hot Milk" },
    { id: 'hot-milk-4', name: "Vanilla Milk", price: "$4", description: "Hot milk flavored with vanilla.", category: "Hot Milk" },
    { id: 'hot-milk-5', name: "Cinnamon Milk", price: "$4", description: "Hot milk with a dash of cinnamon.", category: "Hot Milk" },
    { id: 'hot-milk-6', name: "Chocolate Milk", price: "$5", description: "Rich hot chocolate milk.", category: "Hot Milk" },
    { id: 'hot-milk-7', name: "Almond Milk", price: "$5", description: "Warm, nutty almond milk.", category: "Hot Milk" },
    { id: 'hot-milk-8', name: "Soy Milk", price: "$5", description: "Hot soy milk, a dairy alternative.", category: "Hot Milk" },
    { id: 'hot-milk-9', name: "Coconut Milk", price: "$5", description: "Tropical hot coconut milk.", category: "Hot Milk" },
    { id: 'hot-milk-10', name: "Oat Milk", price: "$5", description: "Creamy hot oat milk.", category: "Hot Milk" }
  ],
  Snacks: [
    { id: 'snack-1', name: "Potato Chips", price: "$2", description: "Crispy, salted potato slices.", category: "Snacks" },
    { id: 'snack-2', name: "Popcorn", price: "$3", description: "Freshly popped corn kernels.", category: "Snacks" },
    { id: 'snack-3', name: "Nachos", price: "$5", description: "Tortilla chips with cheese sauce.", category: "Snacks" },
    { id: 'snack-4', name: "Peanuts", price: "$2", description: "Roasted and salted peanuts.", category: "Snacks" },
    { id: 'snack-5', name: "Pretzels", price: "$3", description: "Crunchy, salty pretzel twists.", category: "Snacks" },
    { id: 'snack-6', name: "Cheese Sticks", price: "$4", description: "Breaded and fried mozzarella sticks.", category: "Snacks" },
    { id: 'snack-7', name: "Onion Rings", price: "$4", description: "Battered and fried onion rings.", category: "Snacks" },
    { id: 'snack-8', name: "Chicken Wings", price: "$6", description: "Spicy buffalo chicken wings.", category: "Snacks" },
    { id: 'snack-9', name: "Samosas", price: "$4", description: "Crispy pastry with savory filling.", category: "Snacks" },
    { id: 'snack-10', name: "Spring Rolls", price: "$5", description: "Vegetable-filled crispy rolls.", category: "Snacks" }
  ],
  Milkshakes: [
    { id: 'milkshake-1', name: "Chocolate Shake", price: "$5", description: "Rich, creamy chocolate milkshake.", category: "Milkshakes" },
    { id: 'milkshake-2', name: "Vanilla Shake", price: "$5", description: "Classic vanilla bean milkshake.", category: "Milkshakes" },
    { id: 'milkshake-3', name: "Strawberry Shake", price: "$5", description: "Fresh strawberry milkshake.", category: "Milkshakes" },
    { id: 'milkshake-4', name: "Banana Shake", price: "$5", description: "Creamy banana milkshake.", category: "Milkshakes" },
    { id: 'milkshake-5', name: "Oreo Shake", price: "$6", description: "Cookies and cream milkshake.", category: "Milkshakes" },
    { id: 'milkshake-6', name: "Peanut Butter Shake", price: "$6", description: "Rich peanut butter milkshake.", category: "Milkshakes" },
    { id: 'milkshake-7', name: "Caramel Shake", price: "$6", description: "Sweet caramel milkshake.", category: "Milkshakes" },
    { id: 'milkshake-8', name: "Mint Chocolate Chip Shake", price: "$6", description: "Minty chocolate chip shake.", category: "Milkshakes" },
    { id: 'milkshake-9', name: "Coffee Shake", price: "$6", description: "Coffee-flavored milkshake.", category: "Milkshakes" },
    { id: 'milkshake-10', name: "Mango Shake", price: "$6", description: "Tropical mango milkshake.", category: "Milkshakes" }
  ],
  Lemonades: [
    { id: 'lemonade-1', name: "Classic Lemonade", price: "$3", description: "Freshly squeezed lemon juice with sugar.", category: "Lemonades" },
    { id: 'lemonade-2', name: "Strawberry Lemonade", price: "$4", description: "Lemonade infused with strawberries.", category: "Lemonades" },
    { id: 'lemonade-3', name: "Blueberry Lemonade", price: "$4", description: "Lemonade with blueberry puree.", category: "Lemonades" },
    { id: 'lemonade-4', name: "Mint Lemonade", price: "$4", description: "Refreshing lemonade with fresh mint.", category: "Lemonades" },
    { id: 'lemonade-5', name: "Peach Lemonade", price: "$4", description: "Lemonade with peach flavor.", category: "Lemonades" },
    { id: 'lemonade-6', name: "Raspberry Lemonade", price: "$4", description: "Tangy raspberry lemonade.", category: "Lemonades" },
    { id: 'lemonade-7', name: "Watermelon Lemonade", price: "$5", description: "Lemonade with watermelon juice.", category: "Lemonades" },
    { id: 'lemonade-8', name: "Lavender Lemonade", price: "$5", description: "Lemonade infused with lavender.", category: "Lemonades" },
    { id: 'lemonade-9', name: "Ginger Lemonade", price: "$4", description: "Spicy ginger-infused lemonade.", category: "Lemonades" },
    { id: 'lemonade-10', name: "Cucumber Lemonade", price: "$4", description: "Cool cucumber lemonade.", category: "Lemonades" }
  ],
  SummerChills: [
    { id: 'summer-chill-1', name: "Iced Tea", price: "$3", description: "Chilled black tea over ice.", category: "Summer Chills" },
    { id: 'summer-chill-2', name: "Fruit Punch", price: "$4", description: "Mixed fruit juice blend over ice.", category: "Summer Chills" },
    { id: 'summer-chill-3', name: "Mojito (Non-alcoholic)", price: "$5", description: "Minty lime drink with soda.", category: "Summer Chills" },
    { id: 'summer-chill-4', name: "Slushie", price: "$4", description: "Icy fruit-flavored drink.", category: "Summer Chills" },
    { id: 'summer-chill-5', name: "Coconut Water", price: "$4", description: "Fresh coconut water over ice.", category: "Summer Chills" },
    { id: 'summer-chill-6', name: "Iced Matcha Latte", price: "$5", description: "Chilled green tea latte.", category: "Summer Chills" },
    { id: 'summer-chill-7', name: "Frozen Yogurt Smoothie", price: "$6", description: "Blended yogurt with fruits.", category: "Summer Chills" },
    { id: 'summer-chill-8', name: "Sparkling Limeade", price: "$4", description: "Fizzy lime-flavored drink.", category: "Summer Chills" },
    { id: 'summer-chill-9', name: "Iced Chai", price: "$5", description: "Spiced tea latte over ice.", category: "Summer Chills" },
    { id: 'summer-chill-10', name: "Frozen Hot Chocolate", price: "$6", description: "Blended icy chocolate drink.", category: "Summer Chills" }
  ],
  ColdCoffee: [
    { id: 'cold-coffee-1', name: "Iced Latte", price: "$4", description: "Espresso and milk over ice.", category: "Cold Coffee" },
    { id: 'cold-coffee-2', name: "Cold Brew", price: "$4", description: "Smooth, slow-steeped cold coffee.", category: "Cold Coffee" },
    { id: 'cold-coffee-3', name: "Frappuccino", price: "$5", description: "Blended icy coffee drink.", category: "Cold Coffee" },
    { id: 'cold-coffee-4', name: "Ice Americano", price: "$3", description: "Espresso with cold water and ice.", category: "Cold Coffee" },
    { id: 'cold-coffee-5', name: "Iced Mocha", price: "$5", description: "Iced coffee with chocolate syrup.", category: "Cold Coffee" },
    { id: 'cold-coffee-6', name: "Nitro Cold Brew", price: "$5", description: "Cold brew infused with nitrogen.", category: "Cold Coffee" },
    { id: 'cold-coffee-7', name: "Iced Caramel Macchiato", price: "$5", description: "Iced vanilla latte with caramel.", category: "Cold Coffee" },
    { id: 'cold-coffee-8', name: "Vietnamese Iced Coffee", price: "$4", description: "Strong coffee with condensed milk.", category: "Cold Coffee" },
    { id: 'cold-coffee-9', name: "Affogato", price: "$6", description: "Espresso poured over ice cream.", category: "Cold Coffee" },
    { id: 'cold-coffee-10', name: "Iced Spanish Latte", price: "$5", description: "Iced latte with condensed milk.", category: "Cold Coffee" }
  ],
  Maggi: [
    { id: 'maggi-1', name: "Classic Maggi", price: "$3", description: "Original Maggi noodles.", category: "Maggi" },
    { id: 'maggi-2', name: "Veggie Maggi", price: "$4", description: "Maggi with mixed vegetables.", category: "Maggi" },
    { id: 'maggi-3', name: "Cheese Maggi", price: "$4", description: "Maggi with melted cheese.", category: "Maggi" },
    { id: 'maggi-4', name: "Masala Maggi", price: "$4", description: "Spicy Indian-style Maggi.", category: "Maggi" },
    { id: 'maggi-5', name: "Egg Maggi", price: "$5", description: "Maggi topped with fried egg.", category: "Maggi" },
    { id: 'maggi-6', name: "Chicken Maggi", price: "$5", description: "Maggi with chicken pieces.", category: "Maggi" },
    { id: 'maggi-7', name: "Schezwan Maggi", price: "$4", description: "Maggi with spicy Schezwan sauce.", category: "Maggi" },
    { id: 'maggi-8', name: "Butter Maggi", price: "$4", description: "Maggi cooked with extra butter.", category: "Maggi" },
    { id: 'maggi-9', name: "Maggi Italiano", price: "$5", description: "Maggi with Italian herbs and tomato.", category: "Maggi" },
    { id: 'maggi-10', name: "Maggi Manchurian", price: "$5", description: "Maggi with Manchurian-style sauce.", category: "Maggi" }
  ],
  Sandwich: [
    { id: 'sandwich-1', name: "Grilled Cheese", price: "$4", description: "Classic melted cheese sandwich.", category: "Sandwich" },
    { id: 'sandwich-2', name: "Chicken Club", price: "$6", description: "Triple-decker with chicken and bacon.", category: "Sandwich" },
    { id: 'sandwich-3', name: "Veggie Delight", price: "$5", description: "Assorted vegetables and cheese.", category: "Sandwich" },
    { id: 'sandwich-4', name: "BLT", price: "$5", description: "Bacon, lettuce, and tomato sandwich.", category: "Sandwich" },
    { id: 'sandwich-5', name: "Tuna Salad", price: "$5", description: "Creamy tuna salad sandwich.", category: "Sandwich" },
    { id: 'sandwich-6', name: "Turkey & Avocado", price: "$6", description: "Sliced turkey with fresh avocado.", category: "Sandwich" },
    { id: 'sandwich-7', name: "Egg & Cheese", price: "$4", description: "Scrambled egg with melted cheese.", category: "Sandwich" },
    { id: 'sandwich-8', name: "Philly Cheesesteak", price: "$7", description: "Sliced beef with melted cheese.", category: "Sandwich" },
    { id: 'sandwich-9', name: "Peanut Butter & Jelly", price: "$3", description: "Classic PB&J sandwich.", category: "Sandwich" },
    { id: 'sandwich-10', name: "Mediterranean Veggie", price: "$6", description: "Hummus and roasted vegetables.", category: "Sandwich" }
  ],
  Burger: [
    { id: 'burger-1', name: "Classic Cheeseburger", price: "$5", description: "Beef patty with cheese and veggies.", category: "Burger" },
    { id: 'burger-2', name: "Veggie Burger", price: "$6", description: "Plant-based patty with toppings.", category: "Burger" },
    { id: 'burger-3', name: "Chicken Burger", price: "$6", description: "Grilled chicken breast burger.", category: "Burger" },
    { id: 'burger-4', name: "Bacon Burger", price: "$7", description: "Beef burger topped with crispy bacon.", category: "Burger" },
    { id: 'burger-5', name: "Mushroom Swiss Burger", price: "$7", description: "Beef patty with mushrooms and Swiss cheese.", category: "Burger" },
    { id: 'burger-6', name: "Spicy Jalapeno Burger", price: "$6", description: "Burger with jalapenos and spicy sauce.", category: "Burger" },
    { id: 'burger-7', name: "BBQ Burger", price: "$7", description: "Beef patty with BBQ sauce and onion rings.", category: "Burger" },
    { id: 'burger-8', name: "Fish Burger", price: "$6", description: "Crispy fish fillet burger.", category: "Burger" },
    { id: 'burger-9', name: "Double Cheese Burger", price: "$8", description: "Two beef patties with extra cheese.", category: "Burger" },
    { id: 'burger-10', name: "Avocado Turkey Burger", price: "$7", description: "Turkey patty with fresh avocado.", category: "Burger" }
  ],
  Favorites: []
}

const allMenuItems = Object.values(predefinedMenuItems).flat()

const emojisList = ['🍵', '🍽️', '👨‍🍳', '🍰', '🍝', '🍕', '🍣', '🍔', '🍹', '🥗']

const dailySpecials = [
  { day: "Monday", item: "Classic Cheeseburger", category: "Burger" },
  { day: "Tuesday", item: "Grilled Chicken Sandwich", category: "Sandwich" },
  { day: "Wednesday", item: "Veggie Burger", category: "Burger" },
  { day: "Thursday", item: "Turkey Club Sandwich", category: "Sandwich" },
  { day: "Friday", item: "Fish Burger", category: "Burger" },
  { day: "Saturday", item: "BLT Sandwich", category: "Sandwich" },
  { day: "Sunday", item: "Deluxe Burger", category: "Burger" },
]

export function EnhancedRestaurantApp() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categoriesArray[0].key)
  const [previousCategory, setPreviousCategory] = useState(categoriesArray[0].key)
  const [showGame, setShowGame] = useState(false)
  const [gameEmojis, setGameEmojis] = useState<string[]>([])
  const [clickedEmojis, setClickedEmojis] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  useEffect(() => {
    resetGame()
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const resetGame = useCallback(() => {
    setGameEmojis(shuffleArray(emojisList.slice(0, 5)))
    setClickedEmojis([])
    setScore(0)
    setGameStatus('playing')
  }, [])

  const handleEmojiClick = useCallback((emoji: string) => {
    if (clickedEmojis.includes(emoji)) {
      setGameStatus('lost')
    } else {
      const newClickedEmojis = [...clickedEmojis, emoji]
      setClickedEmojis(newClickedEmojis)
      setScore(newClickedEmojis.length)
      if (newClickedEmojis.length === gameEmojis.length) {
        setGameStatus('won')
      } else {
        setGameEmojis(shuffleArray([...gameEmojis]))
      }
    }
  }, [clickedEmojis, gameEmojis])

  const handleAdvancedGame = useCallback(() => {
    setGameEmojis(shuffleArray(emojisList))
    setClickedEmojis([])
    setScore(0)
    setGameStatus('playing')
  }, [])

  const handleFavorite = useCallback((itemId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
      
      if (newFavorites.length === 0 && showFavorites) {
        setShowFavorites(false)
        setSelectedCategory(previousCategory)
      }
      
      return newFavorites
    })
  }, [showFavorites, previousCategory])

  const handleCategoryChange = useCallback((category: string) => {
    setPreviousCategory(selectedCategory)
    setSelectedCategory(category)
    setSearchTerm('')
    if (showFavorites) {
      setShowFavorites(false)
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [selectedCategory, showFavorites])

  const handleDragEnd = useCallback((event: any, info: any) => {
    if (info.offset.x > 100) {
      const currentIndex = categoriesArray.findIndex(cat => cat.key === selectedCategory)
      const nextIndex = (currentIndex - 1 + categoriesArray.length) % categoriesArray.length
      handleCategoryChange(categoriesArray[nextIndex].key)
    } else if (info.offset.x < -100) {
      const currentIndex = categoriesArray.findIndex(cat => cat.key === selectedCategory)
      const nextIndex = (currentIndex + 1) % categoriesArray.length
      handleCategoryChange(categoriesArray[nextIndex].key)
    }
  }, [selectedCategory, handleCategoryChange])

  const getCurrentDaySpecial = useCallback(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDay = days[new Date().getDay()]
    return dailySpecials.find(special => special.day === currentDay)
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    if (newSearchTerm === '') {
      setSelectedCategory(previousCategory)
    } else {
      setPreviousCategory(selectedCategory)
      setSelectedCategory('')
    }
    setShowFavorites(false)
  }, [previousCategory, selectedCategory])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory(previousCategory)
  }, [previousCategory])

  const filteredItems = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    if (searchTerm) {
      return allMenuItems.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      )
    }
    if (showFavorites) {
      return allMenuItems.filter(item => favorites.includes(item.id))
    }
    return predefinedMenuItems[selectedCategory] || []
  }, [searchTerm, showFavorites, selectedCategory, favorites])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F3F8] to-[#F0F8FF] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[60px] shadow-2xl p-6 relative overflow-hidden" style={{ height: '932px', width: '430px' }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#007ABD]">{shopName}</h1>
          <motion.div
            animate={{
              y: [0, -5, 0],
              transition: {
                y: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              },
            }}
            className="w-10 h-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007ABD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 110 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
              <motion.path
                d="M 8 8 C 8 8 8 12 12 12 C 16 12 16 8 16 8"
                strokeDasharray="0 1"
                animate={{
                  strokeDasharray: ["0 1", "1 0"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-[60px]"
            >
              <div className="text-center p-8 relative w-full max-w-md">
                <button 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowWelcome(false)}
                >
                  <X size={24} />
                </button>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Restaurant ambiance"
                  width={200}
                  height={200}
                  className="mx-auto mb-6 rounded-full shadow-lg"
                />
                <h2 className="text-3xl font-bold text-[#007ABD] mb-4">Welcome to {shopName}!</h2>
                <p className="text-xl text-gray-700 mb-6 italic">"Where every sip tells a story, and every bite is an adventure."</p>
                <div className="bg-[#E6F3F8] rounded-lg p-4 shadow-md">
                  <h3 className="text-2xl font-semibold text-[#007ABD] mb-2">Weekly Specials</h3>
                  <div className="space-y-2">
                    {dailySpecials.map((special, index) => (
                      <div key={index} className={`flex justify-between items-center ${getCurrentDaySpecial()?.day === special.day ? 'font-bold' : ''}`}>
                        <span>{special.day}:</span>
                        <span>{special.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center ${showFavorites ? 'bg-opacity-80' : ''}`}
            onClick={() => {
              setShowFavorites(!showFavorites)
              setSearchTerm('')
              if (!showFavorites) {
                setPreviousCategory(selectedCategory)
                setSelectedCategory('')
              } else {
                setSelectedCategory(previousCategory)
              }
            }}
          >
            <Heart size={20} className="mr-2" fill={showFavorites ? '#FFF' : 'none'} />
            {showFavorites ? 'All Items' : 'Favorites'}
          </motion.button>
        </div>

        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-[#007ABD]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center mb-4 overflow-x-auto max-h-24 bg-gray-100 rounded-lg p-2">
          {categoriesArray.map((category) => (
            <motion.button
              key={category.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`m-1 px-3 py-2 rounded-full text-sm flex items-center ${
                selectedCategory === category.key ? 'bg-[#007ABD] text-white' : 'bg-white text-gray-700'
              } shadow-sm transition-all duration-200 ease-in-out`}
              onClick={() => handleCategoryChange(category.key)}
            >
              {category.icon && <category.icon size={16} className="mr-2" />}
              {category.value}
            </motion.button>
          ))}
        </div>

        <motion.div
          ref={cardRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, opacity }}
          className="mb-4 overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: 'calc(100% - 380px)' }}
        >
          <div className="bg-[#E6F3F8] rounded-lg overflow-hidden shadow-md h-full">
            <h2 className="text-2xl font-bold text-[#007ABD] p-4 sticky top-0 bg-[#E6F3F8] z-10">
              {showFavorites ? 'Favorites' : searchTerm ? 'Search Results' : categoriesArray.find(cat => cat.key === selectedCategory)?.value}
            </h2>
            <div ref={scrollContainerRef} className="space-y-4 p-4 overflow-y-auto h-full">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-${favorites.includes(item.id) ? 'pink-500' : '[#007ABD]'}`}
                        onClick={() => handleFavorite(item.id)}
                      >
                        <Heart size={20} fill={favorites.includes(item.id) ? '#FF69B4' : 'none'} />
                      </motion.button>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <p className="text-[#007ABD] font-bold mt-2">{item.price}</p>
                    {(searchTerm || showFavorites) && <p className="text-gray-500 text-sm mt-1">Category: {item.category}</p>}
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-xl font-semibold">No items found</p>
                  <p className="mt-2">Try adjusting your search or category selection</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="text-center absolute bottom-6 left-0 right-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={() => setShowGame(true)}
          >
            Play Emoji Game
          </motion.button>
        </div>

        <AnimatePresence>
          {showGame && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
            >
              <div className="bg-white p-6 rounded-2xl max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#007ABD]">Quick Emoji Match</h2>
                  <button onClick={() => setShowGame(false)}>
                    <X className="text-gray-500" />
                  </button>
                </div>
                {gameStatus === 'playing' && (
                  <>
                    <p className="text-lg mb-4">Score: {score} / {gameEmojis.length}</p>
                    <div className="grid grid-cols-5 gap-4 mb-4">
                      {gameEmojis.map((emoji, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-4xl bg-[#E6F3F8] rounded-lg p-2 shadow-md"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 text-center">Click each emoji once to win!</p>
                  </>
                )}
                {gameStatus === 'won' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-500 mb-4">Congratulations!</h3>
                    <p className="text-lg mb-4">
                      {gameEmojis.length === 5 
                        ? "You've matched all 5 emojis!"
                        : "You've matched all 10 emojis! You're a pro!"}
                    </p>
                    {gameEmojis.length === 5 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg mb-2"
                        onClick={handleAdvancedGame}
                      >
                        Try 10 Emoji Challenge
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full shadow-lg"
                      onClick={() => setShowGame(false)}
                    >
                      Close
                    </motion.button>
                  </div>
                )}
                {gameStatus === 'lost' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-red-500 mb-4">Game Over</h3>
                    <p className="text-lg mb-4">You clicked the same emoji twice!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#007ABD] text-white font-bold py-2 px-4 rounded-full shadow-lg"
                      onClick={resetGame}
                    >
                      Try Again
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}