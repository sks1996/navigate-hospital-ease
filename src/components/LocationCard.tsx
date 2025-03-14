
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export interface LocationData {
  id: string;
  name: string;
  department: string;
  floor: string | number;
  building: string;
  description?: string;
  distance?: string;
  imageUrl?: string;
}

interface LocationCardProps {
  location: LocationData;
  index?: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1, 
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      whileHover={{ y: -4 }}
      className="relative group rounded-xl overflow-hidden bg-white border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="p-5">
        <div className="flex items-center mb-2">
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md bg-hospital-50 text-hospital-700">
            {location.department}
          </span>
          {location.distance && (
            <span className="ml-2 text-xs text-muted-foreground">
              {location.distance}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-1">{location.name}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Building className="w-3.5 h-3.5 mr-1.5" />
          <span>
            {location.building}, Floor {location.floor}
          </span>
        </div>
        
        {location.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {location.description}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/directions/${location.id}`}
            className="inline-flex items-center text-sm font-medium text-hospital-600 hover:text-hospital-700 transition-colors"
          >
            <MapPin className="w-4 h-4 mr-1.5" />
            Get Directions
            <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-70 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
