import { 
  ArrowUpDown, 
  Flame, 
  Droplets, 
  Car, 
  Shield, 
  Zap, 
  Cctv, 
  FireExtinguisher,
} from 'lucide-react';

import type { LucideIcon } from "lucide-react";

export const facilityIcons: Record<string, LucideIcon> = {
  lift: ArrowUpDown,
  gas: Flame,
  water: Droplets,
  parking: Car,
  security: Shield,
  generator: Zap,
  cctv: Cctv,
  fireSafety: FireExtinguisher,
};

interface FacilityIconProps {
  facility: string;
  className?: string;
  size?: number;
}

export const FacilityIcon = ({ facility, className = '', size = 16 }: FacilityIconProps) => {
  const Icon = facilityIcons[facility];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
};
