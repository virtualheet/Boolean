import Image from "next/image"
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

export default function HomeProducts() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Based on browsing history section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Based on your browsing history</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400">
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="font-medium">Keep exploring</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-yellow-400"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Bhavik C"
            isTopRated={true}
            title="I will do 3 modern minimalist logo design for your business"
            rating={4.8}
            reviews="1k+"
            price="₹4,129"
            hasVideoConsultation={true}
          />

          {/* Card 2 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-gray-100"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Louis Key"
            isPro={true}
            title="I will design a timeless logo"
            rating={4.8}
            reviews="1k+"
            price="₹11,926"
            hasVideoConsultation={false}
          />

          {/* Card 3 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-gray-800"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Abhi C"
            isTopRated={true}
            title="I will do modern line art text or badge logo design"
            rating={4.8}
            reviews="1k+"
            price="₹2,294"
            hasVideoConsultation={true}
          />

          {/* Card 4 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-gradient-to-r from-blue-600 to-purple-600"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Bojan Sandic"
            isPro={true}
            title="I will design creative logo with all files in 72h"
            rating={4.9}
            reviews="1k+"
            price="₹11,009"
            hasVideoConsultation={true}
          />
        </div>
      </section>

      {/* Gigs you may like section */}
      <section>
        <div className="flex relative justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Gigs you may like</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-gray-800"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Abhi C"
            isTopRated={true}
            title="I will do modern line art text or badge logo design"
            rating={4.8}
            reviews="1k+"
            price="₹2,294"
            hasVideoConsultation={true}
          />

          {/* Card 2 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-gradient-to-r from-blue-600 to-purple-600"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Bojan Sandic"
            isPro={true}
            title="I will design creative logo with all files in 72h"
            rating={4.9}
            reviews="1k+"
            price="₹11,009"
            hasVideoConsultation={true}
          />

          {/* Card 3 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-orange-100"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Alestra Sol"
            isTopRated={true}
            title="I will do modern business logo design with copyrights"
            rating={4.9}
            reviews="1k+"
            price="₹4,129"
            hasVideoConsultation={false}
          />

          {/* Card 4 */}
          <ServiceCard
            image="/placeholder.svg?height=200&width=300"
            bgColor="bg-gray-200"
            sellerImage="/placeholder.svg?height=40&width=40"
            sellerName="Martina D"
            isTopRated={true}
            title="I will create a professional minimalist business logo design"
            rating={4.9}
            reviews="1k+"
            price="₹2,294"
            hasVideoConsultation={false}
          />
        </div>
      </section>

      {/* Generate with Fiverr Go button */}
      <div className="fixed bottom-6 left-6">
        <button className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md"></div>
          <span className="font-medium">Generate with Fiverr Go</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  )
}

interface ServiceCardProps {
  image: string
  bgColor: string
  sellerImage: string
  sellerName: string
  isTopRated?: boolean
  isPro?: boolean
  title: string
  rating: number
  reviews: string
  price: string
  hasVideoConsultation: boolean
}

function ServiceCard({
  image,
  bgColor,
  sellerImage,
  sellerName,
  isTopRated = false,
  isPro = false,
  title,
  rating,
  reviews,
  price,
  hasVideoConsultation,
}: ServiceCardProps) {
  return (
    <div className="rounded-md overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className={`relative h-48 ${bgColor}`}>
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain p-4" />
        <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={sellerImage || "/placeholder.svg"} alt={sellerName} fill className="object-cover" />
          </div>
          <span className="font-medium">{sellerName}</span>
          {isTopRated && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-sm ml-auto">Top Rated ⭐⭐⭐</span>
          )}
          {isPro && <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full ml-auto">Pro</span>}
        </div>
        <h3 className="text-sm mb-2 line-clamp-2 h-10">{title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{rating}</span>
          <span className="text-gray-500">({reviews})</span>
        </div>
        <div className="font-medium mb-2">From {price}</div>
        {hasVideoConsultation && (
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">
              <span className="block w-2 h-2 bg-gray-400 rounded-full"></span>
            </span>
            Offers video consultations
          </div>
        )}
      </div>
    </div>
  )
}

