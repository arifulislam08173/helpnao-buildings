import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isInShortlist, toggleShortlist } from '@/lib/shortlist';
import { toast } from 'sonner';

interface ShortlistButtonProps {
  id: string;
  type: 'building' | 'flat';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ShortlistButton = ({ id, type, className = '', size = 'md' }: ShortlistButtonProps) => {
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    setIsShortlisted(isInShortlist(id, type));
  }, [id, type]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = toggleShortlist(id, type);
    setIsShortlisted(result.isShortlisted);
    
    toast.success(
      result.isShortlisted 
        ? `Added to shortlist` 
        : `Removed from shortlist`,
      { duration: 2000 }
    );
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
        isShortlisted 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-card/90 backdrop-blur-sm text-muted-foreground hover:bg-card hover:text-foreground'
      } ${className}`}
      aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
    >
      <Heart 
        size={iconSizes[size]} 
        className={isShortlisted ? 'fill-current' : ''} 
      />
    </button>
  );
};
