import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
        <Building2 className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground leading-tight">Helpnao</span>
        <span className="text-xs text-muted-foreground leading-tight">Buildings</span>
      </div>
    </Link>
  );
};
