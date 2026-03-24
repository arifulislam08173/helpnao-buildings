'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  MapPin,
  CalendarDays,
  Building2,
  PlayCircle,
  ArrowUpRight,
  HardHat,
  Hammer,
  Clock3,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  FileText,
  CirclePlay,
  Maximize2,
} from 'lucide-react';

type MediaItem = {
  type: 'image' | 'video';
  title: string;
  src: string;
  thumbnail?: string;
};

const projectMedia: MediaItem[] = [
  {
    type: 'image',
    title: 'Main Building View',
    src: '/projects-images/ongoing-building.jpg',
  },
  {
    type: 'image',
    title: 'Front Elevation',
    src: '/projects-images/gallery-1.png',
  },
  {
    type: 'image',
    title: 'Construction Progress View',
    src: '/projects-images/gallery-2.png',
  },
  {
    type: 'image',
    title: 'Side Perspective',
    src: '/projects-images/gallery-3.png',
  },
  {
    type: 'image',
    title: 'Detailed Exterior View',
    src: '/projects-images/gallery-4.png',
  },
  {
    type: 'video',
    title: 'Foundation & Structure Work',
    src: '/projects/ongoing/progress-1.mp4',
    thumbnail: '/projects-images/ongoing-building.jpg',
  },
  {
    type: 'video',
    title: 'Latest Site Progress',
    src: '/projects/ongoing/progress-2.mp4',
    thumbnail: '/projects-images/gallery-2.png',
  },
];

const projectStats = [
  {
    icon: Building2,
    label: 'Project Type',
    value: 'Residential Tower',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Shwapno Area, Dhaka',
  },
  {
    icon: CalendarDays,
    label: 'Expected Handover',
    value: 'December 2027',
  },
  {
    icon: HardHat,
    label: 'Current Stage',
    value: 'Structural Work Ongoing',
  },
];

const milestones = [
  'Site preparation completed',
  'Foundation work completed',
  'Ground floor and core structure in progress',
  'Exterior and finishing work upcoming',
];

const projectDetails = [
  { label: 'Land Area', value: 'Approx. 12 Katha' },
  { label: 'Floors', value: 'G + 12' },
  { label: 'Apartment Type', value: 'Premium Residential Units' },
  { label: 'Architectural Style', value: 'Modern Contemporary' },
  { label: 'Parking', value: 'Basement / Ground Level' },
  { label: 'Developer Status', value: 'Active Construction Phase' },
];

export const OngoingProjectSection = () => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'videos' | 'details'>('gallery');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = useMemo(
    () => projectMedia.filter((item) => item.type === 'image'),
    []
  );

  const videos = useMemo(
    () => projectMedia.filter((item) => item.type === 'video'),
    []
  );

  const selectedMedia = projectMedia[selectedMediaIndex];

  const openLightbox = (index: number) => {
    setSelectedMediaIndex(index);
    setIsLightboxOpen(true);
  };

  const showPrev = () => {
    setSelectedMediaIndex((prev) => (prev === 0 ? projectMedia.length - 1 : prev - 1));
  };

  const showNext = () => {
    setSelectedMediaIndex((prev) => (prev === projectMedia.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container-page">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ongoing Signature Development
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Building Tomorrow, Today
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-7">
              Discover our latest under-construction project with modern architectural planning,
              premium design intent, and real-time construction progress updates.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Left section */}
            <div className="xl:col-span-7">
              <div className="overflow-hidden rounded-[28px] bg-card border border-border shadow-[0_20px_80px_-20px_rgba(0,0,0,0.18)]">
                <div className="relative">
                  <div
                    className="relative h-[320px] md:h-[520px] w-full cursor-zoom-in"
                    onClick={() => openLightbox(0)}
                  >
                    <Image
                      src="/projects-images/ongoing-building.jpg"
                      alt="Ongoing building project"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  </div>

                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground shadow-lg">
                    <Hammer className="w-4 h-4 text-primary" />
                    Under Construction
                  </div>

                  <button
                    onClick={() => openLightbox(0)}
                    className="absolute top-5 right-5 inline-flex items-center gap-2 rounded-full bg-black/55 text-white px-4 py-2 text-sm font-medium backdrop-blur-md hover:bg-black/70 transition"
                  >
                    <Maximize2 className="w-4 h-4" />
                    View Full
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Shwapno Heights Premium Residences
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shwapno Area, Dhaka, Bangladesh
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock3 className="w-4 h-4" />
                          Work in active progress
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {projectStats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-4 hover:bg-accent/40 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                            <h4 className="font-semibold text-foreground">{item.value}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-3xl bg-secondary/50 border border-border p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        Project Overview
                      </h4>
                      <p className="text-muted-foreground leading-7 text-sm md:text-base">
                        A contemporary residential project crafted for comfort, elegance, and
                        long-term value. The design emphasizes spacious layouts, natural light,
                        modern façade treatment, premium materials, and reliable construction
                        standards for a refined urban lifestyle.
                      </p>
                    </div>

                    <div className="rounded-3xl bg-secondary/50 border border-border p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        Construction Milestones
                      </h4>

                      <div className="space-y-4">
                        {milestones.map((item, index) => (
                          <div key={item} className="flex items-start gap-3">
                            <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center leading-none shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm md:text-base leading-7 text-muted-foreground pt-0.5">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          Construction Progress
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Current completion status based on the latest site update
                        </p>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-primary">42%</div>
                    </div>

                    <div className="mt-4 w-full h-3 rounded-full bg-primary/10 overflow-hidden">
                      <div className="h-full w-[42%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="xl:col-span-5">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.14)]">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Project Media & Details
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Gallery, videos, and project information
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-secondary/60 border border-border mb-6">
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        activeTab === 'gallery'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Images className="w-4 h-4" />
                      Gallery
                    </button>

                    <button
                      onClick={() => setActiveTab('videos')}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        activeTab === 'videos'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <CirclePlay className="w-4 h-4" />
                      Videos
                    </button>

                    <button
                      onClick={() => setActiveTab('details')}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        activeTab === 'details'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Details
                    </button>
                  </div>

                  {activeTab === 'gallery' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((item) => {
                          const globalIndex = projectMedia.findIndex(
                            (media) => media.src === item.src
                          );

                          return (
                            <button
                              key={item.src}
                              onClick={() => openLightbox(globalIndex)}
                              className="group text-left rounded-2xl overflow-hidden border border-border bg-secondary/30"
                            >
                              <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                  src={item.src}
                                  alt={item.title}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                              </div>
                              <div className="p-3">
                                <p className="text-sm font-medium text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Click to view full image
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'videos' && (
                    <div className="space-y-5">
                      {videos.map((video) => (
                        <div
                          key={video.src}
                          className="rounded-2xl overflow-hidden border border-border bg-secondary/30"
                        >
                          <div className="aspect-video bg-black">
                            <video
                              className="w-full h-full object-cover"
                              controls
                              preload="metadata"
                            >
                              <source src={video.src} type="video/mp4" />
                            </video>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-foreground">{video.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      {projectDetails.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-secondary/30 px-4 py-4"
                        >
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-medium text-foreground text-right">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[28px] border border-border bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-[0_20px_60px_-24px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl font-semibold mb-2">
                    Interested in this project?
                  </h3>
                  <p className="text-sm text-primary-foreground/85 leading-6 mb-5">
                    Stay connected for progress updates, unit availability, and early booking
                    information.
                  </p>

                  <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/90">
                    Contact For Updates
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && selectedMedia && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={showNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="h-full w-full flex items-center justify-center px-4 md:px-12 py-20">
            <div className="w-full max-w-6xl">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
                {selectedMedia.type === 'image' ? (
                  <div className="relative w-full h-[60vh] md:h-[78vh]">
                    <Image
                      src={selectedMedia.src}
                      alt={selectedMedia.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[60vh] md:h-[78vh] bg-black">
                    <video
                      className="w-full h-full"
                      controls
                      autoPlay
                    >
                      <source src={selectedMedia.src} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-semibold text-lg">{selectedMedia.title}</h4>
                  <p className="text-white/60 text-sm">
                    {selectedMedia.type === 'image' ? 'Image preview' : 'Video preview'}
                  </p>
                </div>
                <div className="text-white/60 text-sm">
                  {selectedMediaIndex + 1} / {projectMedia.length}
                </div>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {projectMedia.map((item, index) => (
                  <button
                    key={`${item.src}-${index}`}
                    onClick={() => setSelectedMediaIndex(index)}
                    className={`relative shrink-0 w-24 h-20 rounded-2xl overflow-hidden border transition ${
                      selectedMediaIndex === index
                        ? 'border-white'
                        : 'border-white/15'
                    }`}
                  >
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <Image
                          src={item.thumbnail || '/projects/ongoing/cover.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-white" />
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};