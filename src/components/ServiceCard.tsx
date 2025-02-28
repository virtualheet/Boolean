import { Heart } from "lucide-react"
import Image from "next/image"

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

const ServiceCard = ({
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
  }: ServiceCardProps) => {
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

  export default ServiceCard
  
  