import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Building2, 
  Layers, 
  Users, 
  Calendar,
  ExternalLink,
  Home
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { FlatCard } from '@/components/buildings/FlatCard';
import { ShortlistButton } from '@/components/ui/ShortlistButton';
import { FacilityIcon } from '@/components/icons/FacilityIcons';
import { SkeletonGallery, SkeletonFlatCard } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { buildings, facilityLabels } from '@/data/mockData';

type TabType = 'flats' | 'facilities' | 'location' | 'about';

const BuildingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('flats');
  const [isLoading, setIsLoading] = useState(true);

  const building = buildings.find(b => b.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  const availableFlats = useMemo(() => 
    building?.flats.filter(f => f.status === 'Available') || [],
    [building]
  );

  const activeFacilities = useMemo(() => 
    building 
      ? Object.entries(building.facilities).filter(([_, v]) => v)
      : [],
    [building]
  );

  if (!building) {
    return (
      <Layout>
        <div className="container-page py-16">
          <EmptyState
            title="Building Not Found"
            description="The building you're looking for doesn't exist or has been removed."
            icon="building"
            action={{
              label: 'Browse Buildings',
              onClick: () => window.location.href = '/buildings',
            }}
          />
        </div>
      </Layout>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'flats', label: `Flats (${building.flats.length})` },
    { id: 'facilities', label: 'Facilities' },
    { id: 'location', label: 'Location' },
    { id: 'about', label: 'About' },
  ];

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen">
        <div className="container-page py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Buildings', href: '/buildings' },
                { label: building.name },
              ]}
            />
          </div>

          {/* Gallery */}
          <div className="mb-8">
            {isLoading ? (
              <SkeletonGallery />
            ) : (
              <ImageGallery images={building.images} alt={building.name} />
            )}
          </div>

          {/* Header Info */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {building.name}
                  </h1>
                  <ShortlistButton id={building.id} type="building" />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{building.address}</span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Layers className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{building.totalFloors}</div>
                      <div className="text-xs text-muted-foreground">Floors</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{building.totalUnits}</div>
                      <div className="text-xs text-muted-foreground">Total Units</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Home className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{availableFlats.length}</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{building.yearBuilt}</div>
                      <div className="text-xs text-muted-foreground">Built</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facilities */}
              <div className="flex gap-2 flex-wrap md:max-w-xs">
                {activeFacilities.slice(0, 6).map(([key]) => (
                  <div 
                    key={key}
                    className="badge-facility"
                    title={facilityLabels[key as keyof typeof facilityLabels]}
                  >
                    <FacilityIcon facility={key} size={14} />
                    <span className="hidden sm:inline">{facilityLabels[key as keyof typeof facilityLabels]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-border overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {/* Flats Tab */}
              {activeTab === 'flats' && (
                <div>
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <SkeletonFlatCard key={i} />
                      ))}
                    </div>
                  ) : building.flats.length === 0 ? (
                    <EmptyState
                      title="No flats available"
                      description="There are currently no flats listed for this building."
                      icon="building"
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {building.flats.map((flat, index) => (
                        <div 
                          key={flat.id}
                          className="animate-slide-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <FlatCard flat={flat} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Facilities Tab */}
              {activeTab === 'facilities' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(building.facilities).map(([key, available]) => (
                    <div 
                      key={key}
                      className={`flex items-center gap-3 p-4 rounded-xl border ${
                        available 
                          ? 'border-primary/30 bg-primary/5' 
                          : 'border-border bg-muted/30 opacity-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        available ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <FacilityIcon 
                          facility={key} 
                          size={20} 
                          className={available ? 'text-primary' : 'text-muted-foreground'}
                        />
                      </div>
                      <div>
                        <div className={`font-medium ${available ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {facilityLabels[key as keyof typeof facilityLabels]}
                        </div>
                        <div className={`text-xs ${available ? 'text-primary' : 'text-muted-foreground'}`}>
                          {available ? 'Available' : 'Not Available'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Location Tab */}
              {activeTab === 'location' && (
                <div className="space-y-6">
                  {/* Map Placeholder */}
                  <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-muted">
                    <img
                      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${building.lng},${building.lat},14,0/800x400?access_token=placeholder`}
                      alt="Map location"
                      className="w-full h-full object-cover opacity-60"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-card rounded-2xl p-6 shadow-elevated text-center max-w-sm">
                        <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold text-foreground mb-2">{building.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{building.address}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${building.lat},${building.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground mb-1">Full Address</div>
                      <div className="font-medium text-foreground">{building.address}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground mb-1">Coordinates</div>
                      <div className="font-medium text-foreground font-mono text-sm">
                        {building.lat.toFixed(4)}, {building.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-foreground mb-4">About {building.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {building.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50 text-center">
                      <div className="text-2xl font-bold text-foreground">{building.totalFloors}</div>
                      <div className="text-sm text-muted-foreground">Floors</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 text-center">
                      <div className="text-2xl font-bold text-foreground">{building.totalUnits}</div>
                      <div className="text-sm text-muted-foreground">Units</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 text-center">
                      <div className="text-2xl font-bold text-foreground">{building.yearBuilt}</div>
                      <div className="text-sm text-muted-foreground">Year Built</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 text-center">
                      <div className="text-2xl font-bold text-primary">{availableFlats.length}</div>
                      <div className="text-sm text-muted-foreground">Available</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuildingDetails;
