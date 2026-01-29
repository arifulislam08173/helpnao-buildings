import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { buildings } from '@/data/mockData';
import { BuildingCard } from '@/components/buildings/BuildingCard';

export const FeaturedBuildings = () => {
  const featuredBuildings = buildings.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Buildings
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Explore our handpicked selection of premium residential properties across Bangladesh
            </p>
          </div>
          <Link 
            to="/buildings" 
            className="btn-outline self-start md:self-auto"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBuildings.map((building, index) => (
            <div 
              key={building.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BuildingCard building={building} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
