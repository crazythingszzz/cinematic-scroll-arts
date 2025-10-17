import { Bed, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  image: string;
  description: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
}

export default function PropertyCard({
  image,
  description,
  price,
  beds,
  baths,
  sqft,
}: PropertyCardProps) {
  return (
    <div className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full">
      {/* Property Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Property Details */}
      <div className="p-5 bg-white/10 backdrop-blur-sm">
        {/* Description */}
        <p className="text-black text-sm mb-3 font-normal">
          {description}
        </p>
        
        {/* Price */}
        <p className="text-black font-bold text-lg mb-4">
          {price}
        </p>
        
        {/* Specifications */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span className="font-normal">{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="font-normal">{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span className="font-normal">{sqft}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
