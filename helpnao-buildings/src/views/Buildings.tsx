"use client";
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { BuildingCard } from '@/components/buildings/BuildingCard';
// import { FilterSidebar, FilterState } from '@/components/buildings/FilterSidebar';
import { FilterSidebar, type FilterState } from "@/components/buildings/FilterSidebar";
import { SkeletonBuildingCard } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { buildings } from '@/data/mockData';

type SortOption = 'newest' | 'units' | 'floors' | 'name';

const initialFilters: FilterState = {
  search: '',
  facilities: [],
  minFloors: 0,
  maxFloors: 50,
  minUnits: 0,
  maxUnits: 200,
  minSqft: 0,
  maxSqft: 5000,
  bedrooms: [],
  cities: [],
};

const Buildings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    search: searchParams.get('search') || '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Sync search param
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setFilters(prev => ({ ...prev, search }));
    }
  }, [searchParams]);

  const allCities = useMemo(() => 
    [...new Set(buildings.map(b => b.city))].sort(),
    []
  );

  const filteredBuildings = useMemo(() => {
    let result = [...buildings];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(searchLower) ||
        b.area.toLowerCase().includes(searchLower) ||
        b.city.toLowerCase().includes(searchLower)
      );
    }

    // City filter
    if (filters.cities.length > 0) {
      result = result.filter(b => filters.cities.includes(b.city));
    }

    // Facilities filter
    if (filters.facilities.length > 0) {
      result = result.filter(b => 
        filters.facilities.every(f => b.facilities[f])
      );
    }

    // Floors filter
    result = result.filter(b => 
      b.totalFloors >= filters.minFloors && 
      b.totalFloors <= filters.maxFloors
    );

    // Units filter
    result = result.filter(b => 
      b.totalUnits >= filters.minUnits && 
      b.totalUnits <= filters.maxUnits
    );

    // Bedrooms filter (check if any flat matches)
    if (filters.bedrooms.length > 0) {
      result = result.filter(b =>
        b.flats.some(flat => 
          filters.bedrooms.some(bed => flat.bedrooms >= bed)
        )
      );
    }

    // Sqft filter (check if any flat matches)
    if (filters.minSqft > 0 || filters.maxSqft < 5000) {
      result = result.filter(b =>
        b.flats.some(flat => 
          flat.sqft >= filters.minSqft && flat.sqft <= filters.maxSqft
        )
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      case 'units':
        result.sort((a, b) => b.totalUnits - a.totalUnits);
        break;
      case 'floors':
        result.sort((a, b) => b.totalFloors - a.totalFloors);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [filters, sortBy]);

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen">
        <div className="container-page py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Explore Buildings
            </h1>
            <p className="text-muted-foreground">
              {filteredBuildings.length} buildings found
            </p>
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, area, or city..."
                value={filters.search}
                onChange={e => handleSearch(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="input-field pl-12 pr-10 appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="newest">Newest First</option>
                <option value="units">Most Units</option>
                <option value="floors">Most Floors</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="btn-secondary lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Content */}
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleReset}
              allCities={allCities}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Results */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <SkeletonBuildingCard key={i} />
                  ))}
                </div>
              ) : filteredBuildings.length === 0 ? (
                <EmptyState
                  title="No buildings found"
                  description="Try adjusting your filters or search terms to find what you're looking for."
                  action={{
                    label: 'Reset Filters',
                    onClick: handleReset,
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBuildings.map((building, index) => (
                    <div 
                      key={building.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <BuildingCard building={building} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Buildings;
