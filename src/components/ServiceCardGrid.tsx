'use client'

// components/ServiceCardGrid.tsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

interface ServiceCardGridProps {
  title: string;
  services: ServiceItem[];
}

interface ServiceItem {
  id: string;
  bgColor: string;
  sellerImage: string;
  sellerName: string;
  isPro: boolean;
  isTopRated?: boolean;
  title: string;
  rating: number;
  reviews: string;
  price: string;
  hasVideoConsultation: boolean;
}

const ServiceCardGrid: React.FC<ServiceCardGridProps> = ({ title, services }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 330; // Approximate width of one card + gap
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-[] py-8">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div
        className="overflow-x-auto scrollbar-hidden whitespace-nowrap ml-3 mr-2"
        ref={scrollRef}
      >
        <div className="flex gap-1 md:gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="inline-block md:w-[24%] w-[49%] mx-auto"
            >
              <ServiceCard
                bgColor={service.bgColor}
                sellerImage={service.sellerImage}
                sellerName={service.sellerName}
                isPro={service.isPro}
                isTopRated={service.isTopRated}
                title={service.title}
                rating={service.rating}
                reviews={service.reviews}
                price={service.price}
                hasVideoConsultation={service.hasVideoConsultation}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCardGrid;
