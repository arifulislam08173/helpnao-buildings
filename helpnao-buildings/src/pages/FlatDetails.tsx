import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bed, 
  Bath, 
  Square, 
  Compass, 
  Layers,
  Home,
  Maximize,
  Grid3X3,
  Calendar
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategorizedGallery } from '@/components/gallery/CategorizedGallery';
import { ShortlistButton } from '@/components/ui/ShortlistButton';
import { InquiryModal } from '@/components/forms/InquiryModal';
import { SkeletonGallery } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { buildings, type Room } from '@/data/mockData';

const FlatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Find the flat and its building
  const flatData = (() => {
    for (const building of buildings) {
      const flat = building.flats.find(f => f.id === id);
      if (flat) {
        return { flat, building };
      }
    }
    return null;
  })();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (!flatData) {
    return (
      <Layout>
        <div className="container-page py-16">
          <EmptyState
            title="Flat Not Found"
            description="The flat you're looking for doesn't exist or has been removed."
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

  const { flat, building } = flatData;

  const roomTypeIcons: Record<Room['type'], typeof Bed> = {
    living: Home,
    bedroom: Bed,
    kitchen: Grid3X3,
    bathroom: Bath,
    balcony: Maximize,
    dining: Grid3X3,
    study: Square,
  };

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen">
        <div className="container-page py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Buildings', href: '/buildings' },
                { label: building.name, href: `/buildings/${building.id}` },
                { label: flat.flatCode },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                {isLoading ? (
                  <SkeletonGallery />
                ) : (
                  <CategorizedGallery images={flat.images} alt={flat.title} />
                )}
              </div>

              {/* Rooms Section */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                <h2 className="text-xl font-semibold text-foreground mb-6">Rooms & Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flat.rooms.map((room, index) => {
                    const RoomIcon = roomTypeIcons[room.type] || Square;
                    return (
                      <div 
                        key={room.id}
                        className="border border-border rounded-xl p-5 hover:border-primary/30 hover:bg-primary/5 transition-colors animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Room Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                            <RoomIcon className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{room.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {room.dimensions} • {room.sqft} sqft
                            </p>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Flooring</span>
                            <span className="text-foreground">{room.flooring}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Paint</span>
                            <span className="text-foreground text-right max-w-[60%]">{room.paint}</span>
                          </div>
                          {room.windows > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Windows</span>
                              <span className="text-foreground">{room.windows}</span>
                            </div>
                          )}
                        </div>

                        {/* Fittings */}
                        {room.fittings.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="text-xs text-muted-foreground mb-2">Fittings</div>
                            <div className="flex flex-wrap gap-1.5">
                              {room.fittings.map((fitting, i) => (
                                <span 
                                  key={i}
                                  className="px-2 py-1 bg-secondary rounded text-xs text-secondary-foreground"
                                >
                                  {fitting}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {room.notes && (
                          <p className="mt-3 text-xs text-muted-foreground italic">
                            {room.notes}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Flat Info Card */}
              <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`badge-status ${
                      flat.status === 'Available' ? 'badge-status-available' : 'badge-status-booked'
                    }`}>
                      {flat.status}
                    </span>
                  </div>
                  <ShortlistButton id={flat.id} type="flat" />
                </div>

                <h1 className="text-xl font-bold text-foreground mb-2">{flat.title}</h1>
                <Link 
                  to={`/buildings/${building.id}`}
                  className="text-sm text-primary hover:underline mb-4 block"
                >
                  {building.name}
                </Link>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                      <Bed className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{flat.bedrooms}</div>
                      <div className="text-xs text-muted-foreground">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                      <Bath className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{flat.bathrooms}</div>
                      <div className="text-xs text-muted-foreground">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                      <Square className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{flat.sqft}</div>
                      <div className="text-xs text-muted-foreground">Sqft</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                      <Layers className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{flat.floorNumber}</div>
                      <div className="text-xs text-muted-foreground">Floor</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Compass className="w-4 h-4" />
                      Facing
                    </span>
                    <span className="font-medium text-foreground">{flat.facing}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Maximize className="w-4 h-4" />
                      Balconies
                    </span>
                    <span className="font-medium text-foreground">{flat.balconies}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Grid3X3 className="w-4 h-4" />
                      Unit Code
                    </span>
                    <span className="font-medium text-foreground">{flat.flatCode}</span>
                  </div>
                </div>

                {/* CTA Button */}
                {flat.status === 'Available' ? (
                  <button
                    onClick={() => setIsInquiryOpen(true)}
                    className="w-full btn-primary py-3.5 text-base mt-4"
                  >
                    <Calendar className="w-5 h-5" />
                    Request a Visit
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 text-base bg-muted text-muted-foreground rounded-xl cursor-not-allowed mt-4"
                  >
                    Currently Booked
                  </button>
                )}

                {/* Building Link */}
                <Link 
                  to={`/buildings/${building.id}`}
                  className="block w-full btn-secondary mt-3 text-center"
                >
                  View Building Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        flatId={flat.id}
        buildingId={building.id}
        flatTitle={flat.title}
      />
    </Layout>
  );
};

export default FlatDetails;
