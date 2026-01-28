import { useState } from 'react';
import { ImageGallery } from './ImageGallery';

interface CategorizedImage {
  category: string;
  url: string;
}

interface CategorizedGalleryProps {
  images: CategorizedImage[];
  alt?: string;
}

export const CategorizedGallery = ({ images, alt = 'Gallery image' }: CategorizedGalleryProps) => {
  const categories = [...new Set(images.map(img => img.category))];
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  const filteredImages = selectedCategory === 'All' 
    ? images.map(img => img.url)
    : images.filter(img => img.category === selectedCategory).map(img => img.url);

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`filter-chip ${selectedCategory === 'All' ? 'filter-chip-active' : ''}`}
        >
          All ({images.length})
        </button>
        {categories.map(category => {
          const count = images.filter(img => img.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-chip ${selectedCategory === category ? 'filter-chip-active' : ''}`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Gallery */}
      <ImageGallery images={filteredImages} alt={alt} />
    </div>
  );
};
