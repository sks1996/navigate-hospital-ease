
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Navigation } from "lucide-react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import HospitalMap from "../components/HospitalMap";
import DirectionPanel, { Direction } from "../components/DirectionPanel";

// Mock directions data
const mockDirections: Direction[] = [
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
  },
  {
    step: 3,
    instruction: "Turn right at the corridor",
    distance: "10m",
    icon: "right",
    landmark: "Water fountain",
  },
  {
    step: 4,
    instruction: "Take the elevator to floor 3",
    icon: "up",
    landmark: "Elevator Bank A",
  },
  {
    step: 5,
    instruction: "Turn left out of the elevator",
    distance: "5m",
    icon: "left",
  },
  {
    step: 6,
    instruction: "Walk to the end of the corridor",
    distance: "30m",
    icon: "straight",
    landmark: "Nursing Station",
  },
  {
    step: 7,
    instruction: "Cardiology Department is on your right",
    icon: "arrive",
  },
];

const Directions: React.FC = () => {
  const [startLocation, setStartLocation] = useState("Main Entrance");
  const [endLocation, setEndLocation] = useState("Cardiology Department");
  const [showDirections, setShowDirections] = useState(true);

  const handleStartSearch = (query: string) => {
    if (query) {
      setStartLocation(query);
    }
  };

  const handleEndSearch = (query: string) => {
    if (query) {
      setEndLocation(query);
    }
  };

  const getDirections = () => {
    // In a real app, this would fetch directions from the backend
    console.log(`Getting directions from ${startLocation} to ${endLocation}`);
    setShowDirections(true);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Get Directions</h1>
          <p className="text-muted-foreground">
            Find your way around the hospital with step-by-step directions.
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
              <h2 className="text-lg font-semibold mb-4">Where are you going?</h2>
              
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
                  <SearchBar
                    placeholder="Where are you going?..."
                    onSearch={handleEndSearch}
                    className="mb-4"
                  />
                </div>
                
                <button
                  onClick={getDirections}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-hospital-600 text-white hover:bg-hospital-700 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </motion.div>
            
            {showDirections && (
              <DirectionPanel
                directions={mockDirections}
                startLocation={startLocation}
                endLocation={endLocation}
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
            <HospitalMap className="absolute inset-0" highlightedPath={showDirections} />
            
            <div className="absolute bottom-4 right-4 glass rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-hospital-600" />
                <span className="font-medium">Currently viewing: Floor 1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Directions;
