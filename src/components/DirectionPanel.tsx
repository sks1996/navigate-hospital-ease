
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowDown, Map, Navigation } from "lucide-react";

export interface Direction {
  step: number;
  instruction: string;
  distance?: string;
  icon: "right" | "left" | "up" | "down" | "straight" | "arrive";
  landmark?: string;
}

interface DirectionPanelProps {
  directions: Direction[];
  startLocation: string;
  endLocation: string;
  estimatedTime?: string;
  className?: string;
}

const DirectionPanel: React.FC<DirectionPanelProps> = ({
  directions,
  startLocation,
  endLocation,
  estimatedTime,
  className = "",
}) => {
  const renderIcon = (icon: Direction["icon"]) => {
    switch (icon) {
      case "right":
        return (
          <div className="rotate-90 bg-hospital-50 rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-hospital-600" />
          </div>
        );
      case "left":
        return (
          <div className="-rotate-90 bg-hospital-50 rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-hospital-600" />
          </div>
        );
      case "up":
        return (
          <div className="bg-hospital-50 rounded-full p-2">
            <ArrowUp className="w-5 h-5 text-hospital-600" />
          </div>
        );
      case "down":
        return (
          <div className="bg-hospital-50 rounded-full p-2">
            <ArrowDown className="w-5 h-5 text-hospital-600" />
          </div>
        );
      case "straight":
        return (
          <div className="-rotate-90 bg-hospital-50 rounded-full p-2">
            <Navigation className="w-5 h-5 text-hospital-600" />
          </div>
        );
      case "arrive":
        return (
          <div className="bg-hospital-50 rounded-full p-2">
            <Map className="w-5 h-5 text-hospital-600" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-5 border-b border-border/60 bg-hospital-50/30">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">Your Route</h2>
          {estimatedTime && (
            <span className="text-sm text-muted-foreground">~{estimatedTime}</span>
          )}
        </div>
        <div className="mt-2 flex flex-col space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-hospital-300" />
            From: {startLocation}
          </p>
          <p className="text-sm text-foreground font-medium flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-hospital-600" />
            To: {endLocation}
          </p>
        </div>
      </div>

      <div className="py-2">
        {directions.map((direction, index) => (
          <motion.div
            key={direction.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-start p-4 gap-4 relative ${
              index !== directions.length - 1 ? "border-b border-border/20" : ""
            }`}
          >
            <div className="flex-shrink-0">
              {renderIcon(direction.icon)}
              {index !== directions.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-px bg-hospital-100" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{direction.instruction}</span>
                {direction.distance && (
                  <span className="ml-auto text-sm text-muted-foreground">
                    {direction.distance}
                  </span>
                )}
              </div>
              {direction.landmark && (
                <p className="text-sm text-muted-foreground mt-1">
                  Landmark: {direction.landmark}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DirectionPanel;
