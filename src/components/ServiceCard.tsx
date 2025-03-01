import { Heart } from "lucide-react"
import image from "next/image"
import Image from "next/image"

// lets make an service card with fixed with of style={{}} with using clamp property

interface ServiceCardProps {
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
      <div className="w-full  pop bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col"
        style={{
          padding: 'clamp(1rem, 1vw, 200rem)',
          gap: 'clamp(0.5rem, 1vw, 200rem)',
        }}
        >
          <div className="flex items-center ">
            <div className="w-8 h-8 rounded-full bg-purple-100 overflow-hidden mr-2 flex-shrink-0">
              <Image src={sellerImage} alt={sellerName} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-base">{sellerName}</span>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="text-4xl inter font-bold truncate">{price}</h2>
          </div>
          <div className="flex items-center ">
            <div className="flex items-center text-gray-500 text-sm mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>14 Oct - 2024</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>89.5% Match</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 ">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
              <span className="mr-1">★</span>
              {rating}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Web Design</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Responsive</span>
          </div>
          <div className="">
            <p className="text-gray-700 truncate"><span className="font-semibold">Need Responsive Website:</span> showcase product Modern and visually appealing design.</p>
          </div>
          <div className="flex flex-col gap-2 ">
            <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800">Send Offer</button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-100">Chat with Seller</button>
          </div>
        </div>
      </div>
    )
  }

  export default ServiceCard
  
  