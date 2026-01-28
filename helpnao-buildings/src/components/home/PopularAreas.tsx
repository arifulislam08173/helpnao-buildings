import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { popularAreas } from '@/data/mockData';

export const PopularAreas = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Popular Areas
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover the most sought-after neighborhoods with premium properties
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularAreas.map((area, index) => (
            <Link
              key={area.name}
              to={`/buildings?search=${encodeURIComponent(area.name)}`}
              className="group relative h-64 rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {area.name}
                </h3>
                <p className="text-white/80 text-sm mb-3">{area.city}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-white/90">
                    <Building2 className="w-4 h-4" />
                    {area.buildingCount} Buildings
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
