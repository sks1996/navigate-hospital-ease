import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import MapDisplay from "./MapDisplay";

interface HospitalMapProps {
  className?: string;
  highlightedPath?: boolean;
  floorInfo?: string | number;
  userLocation?: GeolocationCoordinates | null;
  showGoogleMap?: boolean;
}

// Mock hospital destination coordinates
const HOSPITAL_DESTINATIONS = {
  "emergency": { lat: 37.773972, lng: -122.431297, name: "Emergency Room" },
  "radiology": { lat: 37.775172, lng: -122.432597, name: "Radiology Department" },
  "cardiology": { lat: 37.774372, lng: -122.433197, name: "Cardiology OPD" },
  "pharmacy": { lat: 37.772972, lng: -122.430297, name: "Main Pharmacy" },
};

const HospitalMap: React.FC<HospitalMapProps> = ({
  className = "",
  highlightedPath = false,
  floorInfo = "1",
  userLocation = null,
  showGoogleMap = true,
}) => {
  // Get current path to determine which destination to use
  const pathname = window.location.pathname;
  const locationId = pathname.split('/').pop() as keyof typeof HOSPITAL_DESTINATIONS;
  const destination = HOSPITAL_DESTINATIONS[locationId] || null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        {showGoogleMap ? (
          <MapDisplay 
            userLocation={userLocation} 
            destination={destination}
            highlightedPath={highlightedPath}
          />
        ) : (
          <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 glass rounded-lg px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-hospital-600" />
          <span className="font-medium">
            Currently viewing: Floor {floorInfo}
          </span>
        </div>
      </div>
      
      {userLocation && (
        <div className="absolute top-4 left-4 glass rounded-lg px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm z-10">
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="h-4 w-4 text-hospital-600" />
            <span className="font-medium">
              Using your current location
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HospitalMap;
