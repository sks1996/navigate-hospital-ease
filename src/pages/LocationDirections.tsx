import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Navigation } from "lucide-react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import HospitalMap from "../components/HospitalMap";
import DirectionPanel, { Direction } from "../components/DirectionPanel";
import { LocationData } from "../components/LocationCard";
import { toast } from "@/components/ui/use-toast";

const mockLocations: Record<string, LocationData> = {
  "emergency": {
    id: "emergency",
    name: "Emergency Room",
    department: "Emergency",
    floor: "Ground Floor",
    building: "Main Building",
    description: "24/7 emergency medical care for critical conditions requiring immediate attention."
  },
  "radiology": {
    id: "radiology",
    name: "Radiology Department",
    department: "Diagnostics",
    floor: 2,
    building: "East Wing",
    description: "Advanced imaging services including X-ray, MRI, CT scan, and ultrasound."
  },
  "cardiology": {
    id: "cardiology",
    name: "Cardiology OPD",
    department: "Cardiology",
    floor: 3,
    building: "Specialty Wing",
    description: "Outpatient services for heart-related conditions and consultations."
  },
  "pharmacy": {
    id: "pharmacy",
    name: "Main Pharmacy",
    department: "Pharmacy",
    floor: "Ground Floor",
    building: "Central Block",
    description: "Central pharmacy providing prescription and over-the-counter medications."
  }
};

const getDirectionsForLocation = (locationId: string): Direction[] => {
  const baseDirections: Direction[] = [
    {
      step: 1,
      instruction: "Enter through the main entrance",
      icon: "straight",
      landmark: "Information Desk",
    },
    {
      step: 2,
      instruction: "Walk straight ahead",
      distance: "50m",
      icon: "straight",
      landmark: "Cafeteria on the right",
    }
  ];

  switch(locationId) {
    case "emergency":
      return [
        ...baseDirections,
        {
          step: 3,
          instruction: "Turn left at the corridor",
          distance: "10m",
          icon: "left",
          landmark: "Security Desk",
        },
        {
          step: 4,
          instruction: "Emergency Room is straight ahead",
          icon: "arrive",
        }
      ];
    case "radiology":
      return [
        ...baseDirections,
        {
          step: 3,
          instruction: "Take the elevator to floor 2",
          icon: "up",
          landmark: "Elevator Bank B",
        },
        {
          step: 4,
          instruction: "Turn right out of the elevator",
          distance: "5m",
          icon: "right",
        },
        {
          step: 5,
          instruction: "Radiology Department is at the end of the corridor",
          icon: "arrive",
        }
      ];
    case "cardiology":
      return [
        ...baseDirections,
        {
          step: 3,
          instruction: "Take the elevator to floor 3",
          icon: "up",
          landmark: "Elevator Bank A",
        },
        {
          step: 4,
          instruction: "Turn left out of the elevator",
          distance: "5m",
          icon: "left",
        },
        {
          step: 5,
          instruction: "Walk to the end of the corridor",
          distance: "30m",
          icon: "straight",
          landmark: "Nursing Station",
        },
        {
          step: 6,
          instruction: "Cardiology Department is on your right",
          icon: "arrive",
        }
      ];
    case "pharmacy":
      return [
        ...baseDirections,
        {
          step: 3,
          instruction: "Turn right at the corridor",
          distance: "15m",
          icon: "right",
          landmark: "Gift Shop",
        },
        {
          step: 4,
          instruction: "Main Pharmacy is on your left",
          icon: "arrive",
        }
      ];
    default:
      return baseDirections;
  }
};

const LocationDirections: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("Main Entrance");
  const [showDirections, setShowDirections] = useState(true);

  const location = locationId ? mockLocations[locationId] : null;
  const directions = locationId ? getDirectionsForLocation(locationId) : [];

  useEffect(() => {
    if (!location && locationId) {
      toast({
        title: "Location not found",
        description: `We couldn't find the location with ID: ${locationId}`,
        variant: "destructive",
      });
      navigate("/directions");
    }
  }, [location, locationId, navigate]);

  const handleStartSearch = (query: string) => {
    if (query) {
      setStartLocation(query);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Directions{location ? ` to ${location.name}` : ""}</h1>
          <p className="text-muted-foreground">
            {location 
              ? `Find your way to ${location.name} in ${location.building}, Floor ${location.floor}`
              : "Find your way around the hospital with step-by-step directions."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-border/60 shadow-sm p-5 mb-6"
            >
              <h2 className="text-lg font-semibold mb-4">Your Route Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Starting Point
                  </label>
                  <SearchBar
                    placeholder="Current location or starting point..."
                    onSearch={handleStartSearch}
                    className="mb-2"
                  />
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-hospital-50 rounded-full p-1.5">
                    <ArrowDown className="w-4 h-4 text-hospital-600" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Destination
                  </label>
                  <div className="px-4 py-3 border border-border rounded-lg bg-muted/30">
                    <span className="font-medium">{location ? location.name : "Select a destination"}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate("/directions")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Change Destination</span>
                </button>
              </div>
            </motion.div>
            
            {showDirections && location && (
              <DirectionPanel
                directions={directions}
                startLocation={startLocation}
                endLocation={location.name}
                estimatedTime="5 min"
                className="mb-6 md:mb-0"
              />
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 relative rounded-xl overflow-hidden border border-border/60 shadow-sm"
            style={{ minHeight: "600px" }}
          >
            <HospitalMap 
              className="absolute inset-0" 
              highlightedPath={showDirections} 
              floorInfo={location ? location.floor : "1"}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationDirections;
