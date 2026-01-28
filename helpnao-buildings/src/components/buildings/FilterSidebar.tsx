import { X } from 'lucide-react';
// import { Building, facilityLabels } from '@/data/mockData';
import { facilityLabels } from "@/data/mockData";
import type { Building } from "@/data/mockData";
import { FacilityIcon } from '@/components/icons/FacilityIcons';

export interface FilterState {
  search: string;
  facilities: (keyof Building['facilities'])[];
  minFloors: number;
  maxFloors: number;
  minUnits: number;
  maxUnits: number;
  minSqft: number;
  maxSqft: number;
  bedrooms: number[];
  cities: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  allCities: string[];
  isOpen?: boolean;
  onClose?: () => void;
}

export const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onReset, 
  allCities,
  isOpen,
  onClose 
}: FilterSidebarProps) => {
  const facilities = Object.keys(facilityLabels) as (keyof Building['facilities'])[];

  const toggleFacility = (facility: keyof Building['facilities']) => {
    const newFacilities = filters.facilities.includes(facility)
      ? filters.facilities.filter(f => f !== facility)
      : [...filters.facilities, facility];
    onFilterChange({ ...filters, facilities: newFacilities });
  };

  const toggleBedroom = (bedroom: number) => {
    const newBedrooms = filters.bedrooms.includes(bedroom)
      ? filters.bedrooms.filter(b => b !== bedroom)
      : [...filters.bedrooms, bedroom];
    onFilterChange({ ...filters, bedrooms: newBedrooms });
  };

  const toggleCity = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter(c => c !== city)
      : [...filters.cities, city];
    onFilterChange({ ...filters, cities: newCities });
  };

  const hasActiveFilters = 
    filters.facilities.length > 0 ||
    filters.bedrooms.length > 0 ||
    filters.cities.length > 0 ||
    filters.minFloors > 0 ||
    filters.maxFloors < 50 ||
    filters.minUnits > 0 ||
    filters.maxUnits < 200 ||
    filters.minSqft > 0 ||
    filters.maxSqft < 5000;

  const content = (
    <div className="space-y-6">
      {/* Header (Mobile) */}
      {onClose && (
        <div className="flex items-center justify-between pb-4 border-b border-border lg:hidden">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="w-full py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Reset all filters
        </button>
      )}

      {/* Cities */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">City</h4>
        <div className="flex flex-wrap gap-2">
          {allCities.map(city => (
            <button
              key={city}
              onClick={() => toggleCity(city)}
              className={`filter-chip text-xs ${filters.cities.includes(city) ? 'filter-chip-active' : ''}`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Facilities</h4>
        <div className="grid grid-cols-2 gap-2">
          {facilities.map(facility => (
            <button
              key={facility}
              onClick={() => toggleFacility(facility)}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-sm transition-all ${
                filters.facilities.includes(facility)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              <FacilityIcon facility={facility} size={16} />
              <span className="truncate">{facilityLabels[facility]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Bedrooms</h4>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(bedroom => (
            <button
              key={bedroom}
              onClick={() => toggleBedroom(bedroom)}
              className={`w-10 h-10 rounded-xl border text-sm font-medium transition-all ${
                filters.bedrooms.includes(bedroom)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              {bedroom}+
            </button>
          ))}
        </div>
      </div>

      {/* Floors Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Floors</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minFloors || ''}
            onChange={e => onFilterChange({ ...filters, minFloors: parseInt(e.target.value) || 0 })}
            className="input-field text-sm"
            min={0}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxFloors < 50 ? filters.maxFloors : ''}
            onChange={e => onFilterChange({ ...filters, maxFloors: parseInt(e.target.value) || 50 })}
            className="input-field text-sm"
            min={0}
          />
        </div>
      </div>

      {/* Sqft Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Size (sqft)</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minSqft || ''}
            onChange={e => onFilterChange({ ...filters, minSqft: parseInt(e.target.value) || 0 })}
            className="input-field text-sm"
            min={0}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxSqft < 5000 ? filters.maxSqft : ''}
            onChange={e => onFilterChange({ ...filters, maxSqft: parseInt(e.target.value) || 5000 })}
            className="input-field text-sm"
            min={0}
          />
        </div>
      </div>
    </div>
  );

  // Mobile drawer
  if (isOpen !== undefined) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Drawer */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="p-6">
            {content}
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-6">Filters</h3>
            {content}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>
      {content}
    </div>
  );
};
