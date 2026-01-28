import { Link } from 'react-router-dom';
import { Building2, Layers, Users, ArrowRight } from 'lucide-react';
// import { Building, facilityLabels } from '@/data/mockData';
import { facilityLabels } from "@/data/mockData";
import type { Building } from "@/data/mockData";
import { FacilityIcon } from '@/components/icons/FacilityIcons';
import { ShortlistButton } from '@/components/ui/ShortlistButton';

interface BuildingCardProps {
  building: Building;
}

export const BuildingCard = ({ building }: BuildingCardProps) => {
  const activeFacilities = Object.entries(building.facilities)
    .filter(([_, value]) => value)
    .slice(0, 4);

  const availableFlats = building.flats.filter(f => f.status === 'Available').length;

  return (
    <Link to={`/buildings/${building.id}`} className="card-building group block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={building.images[0]}
          alt={building.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Shortlist Button */}
        <ShortlistButton 
          id={building.id} 
          type="building" 
          className="absolute top-3 right-3 shadow-lg"
          size="sm"
        />
        
        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <span className="badge-facility bg-card/90 backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5" />
            {building.area}
          </span>
          <span className="badge-facility bg-card/90 backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5" />
            {building.totalFloors} Floors
          </span>
          <span className="badge-facility bg-card/90 backdrop-blur-sm">
            <Users className="w-3.5 h-3.5" />
            {building.totalUnits} Units
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Location */}
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {building.name}
          </h3>
          <p className="text-sm text-muted-foreground">{building.city}</p>
        </div>

        {/* Facilities */}
        <div className="flex gap-2">
          {activeFacilities.map(([key]) => (
            <div 
              key={key}
              className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center"
              title={facilityLabels[key as keyof typeof facilityLabels]}
            >
              <FacilityIcon facility={key} className="text-accent-foreground" size={18} />
            </div>
          ))}
          {Object.values(building.facilities).filter(Boolean).length > 4 && (
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
              +{Object.values(building.facilities).filter(Boolean).length - 4}
            </div>
          )}
        </div>

        {/* Available Flats & CTA */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{availableFlats}</span> flats available
          </span>
          <span className="btn-primary text-sm py-2 px-4">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};
