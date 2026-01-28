import { Link } from 'react-router-dom';
import { Bed, Bath, Square, Compass, ArrowRight } from 'lucide-react';
import type { Flat } from '@/data/mockData';
import { ShortlistButton } from '@/components/ui/ShortlistButton';

interface FlatCardProps {
  flat: Flat;
  buildingName?: string;
}

export const FlatCard = ({ flat, buildingName }: FlatCardProps) => {
  const mainImage = flat.images[0]?.url || 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800';

  return (
    <Link to={`/flats/${flat.id}`} className="card-building group block">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={mainImage}
          alt={flat.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <span className={`absolute top-3 left-3 badge-status ${
          flat.status === 'Available' ? 'badge-status-available' : 'badge-status-booked'
        }`}>
          {flat.status}
        </span>

        {/* Shortlist */}
        <ShortlistButton 
          id={flat.id} 
          type="flat" 
          className="absolute top-3 right-3 shadow-lg"
          size="sm"
        />

        {/* Floor Badge */}
        <span className="absolute bottom-3 left-3 badge-facility bg-card/90 backdrop-blur-sm">
          Floor {flat.floorNumber}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {flat.title}
          </h3>
          {buildingName && (
            <p className="text-sm text-muted-foreground">{buildingName}</p>
          )}
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            {flat.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            {flat.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1.5">
            <Square className="w-4 h-4" />
            {flat.sqft} sqft
          </span>
          <span className="flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            {flat.facing}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-foreground">{flat.flatCode}</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            View Flat
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};
