import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, Bed, Square } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    location: '',
    buildingName: '',
    bedrooms: '',
    sqftRange: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.location) params.set('search', searchForm.location);
    if (searchForm.buildingName) params.set('search', searchForm.buildingName);
    if (searchForm.bedrooms) params.set('bedrooms', searchForm.bedrooms);
    navigate(`/buildings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
          alt="Modern building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-page py-20 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 10,000+ home seekers
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect Home in
            <span className="text-primary block mt-2">Premium Buildings</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Discover exceptional residential properties across India's top cities. 
            Browse, compare, and connect with your dream home.
          </p>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-3 md:p-4 shadow-elevated max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location or Area"
                  value={searchForm.location}
                  onChange={e => setSearchForm({ ...searchForm, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Building Name */}
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Building Name"
                  value={searchForm.buildingName}
                  onChange={e => setSearchForm({ ...searchForm, buildingName: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Bedrooms */}
              <div className="relative">
                <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={searchForm.bedrooms}
                  onChange={e => setSearchForm({ ...searchForm, bedrooms: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary rounded-xl text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="btn-primary py-3.5 text-base"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-10">
            {[
              { value: '500+', label: 'Buildings' },
              { value: '5000+', label: 'Apartments' },
              { value: '8', label: 'Cities' },
              { value: '99%', label: 'Happy Customers' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
