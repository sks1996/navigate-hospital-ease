import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface HospitalMapProps {
  className?: string;
  highlightedPath?: boolean;
  floorInfo?: string | number;
}

const HospitalMap: React.FC<HospitalMapProps> = ({
  className = "",
  highlightedPath = false,
  floorInfo = "1",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Draw a simplified hospital layout
    const drawMap = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Set styles
      ctx.strokeStyle = "#E0EFFF"; // hospital-100
      ctx.lineWidth = 1;
      ctx.fillStyle = "#F0F7FF"; // hospital-50
      
      // Draw background grid
      ctx.beginPath();
      for (let x = 0; x < width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      
      // Draw buildings
      const buildings = [
        { x: width * 0.1, y: height * 0.2, w: width * 0.25, h: height * 0.3, label: "Main Building" },
        { x: width * 0.45, y: height * 0.1, w: width * 0.2, h: height * 0.4, label: "Emergency" },
        { x: width * 0.7, y: height * 0.2, w: width * 0.2, h: height * 0.25, label: "Radiology" },
        { x: width * 0.2, y: height * 0.6, w: width * 0.3, h: height * 0.25, label: "Outpatient" },
        { x: width * 0.6, y: height * 0.6, w: width * 0.25, h: height * 0.3, label: "Pharmacy" },
      ];
      
      buildings.forEach(building => {
        // Building
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#B8DDFF"; // hospital-200
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(building.x, building.y, building.w, building.h);
        ctx.fill();
        ctx.stroke();
        
        // Building label
        ctx.fillStyle = "#002C66"; // hospital-900
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(building.label, building.x + building.w / 2, building.y + building.h / 2);
      });
      
      // Draw paths between buildings
      ctx.strokeStyle = "#8AC7FF"; // hospital-300
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      // Horizontal path
      ctx.moveTo(buildings[0].x + buildings[0].w, buildings[0].y + buildings[0].h / 2);
      ctx.lineTo(buildings[1].x, buildings[1].y + buildings[1].h / 2);
      
      ctx.moveTo(buildings[1].x + buildings[1].w, buildings[1].y + buildings[1].h / 2);
      ctx.lineTo(buildings[2].x, buildings[2].y + buildings[2].h / 2);
      
      // Vertical path
      ctx.moveTo(buildings[0].x + buildings[0].w / 2, buildings[0].y + buildings[0].h);
      ctx.lineTo(buildings[0].x + buildings[0].w / 2, buildings[3].y);
      
      ctx.moveTo(buildings[1].x + buildings[1].w / 2, buildings[1].y + buildings[1].h);
      ctx.lineTo(buildings[1].x + buildings[1].w / 2, buildings[4].y);
      
      // Diagonal path
      ctx.moveTo(buildings[3].x + buildings[3].w, buildings[3].y + buildings[3].h / 2);
      ctx.lineTo(buildings[4].x, buildings[4].y + buildings[4].h / 2);
      
      ctx.stroke();
      
      // Draw highlighted path if needed
      if (highlightedPath) {
        ctx.strokeStyle = "#0070F3"; // hospital-600
        ctx.lineWidth = 4;
        ctx.beginPath();
        
        // Example path from Main Building to Pharmacy
        ctx.moveTo(buildings[0].x + buildings[0].w / 2, buildings[0].y + buildings[0].h);
        ctx.lineTo(buildings[0].x + buildings[0].w / 2, buildings[3].y);
        ctx.lineTo(buildings[3].x + buildings[3].w, buildings[3].y + buildings[3].h / 2);
        ctx.lineTo(buildings[4].x, buildings[4].y + buildings[4].h / 2);
        
        ctx.stroke();
        
        // Animated dots along path
        const dotRadius = 4;
        ctx.fillStyle = "#0070F3"; // hospital-600
        
        // Calculate position based on time for animation
        const time = Date.now() / 1000;
        const position = (time % 2) / 2; // 0 to 1 over 2 seconds
        
        // Position on the path (this is simplified)
        const x = buildings[3].x + buildings[3].w * position;
        const y = buildings[3].y + buildings[3].h / 2;
        
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    drawMap();
    
    // Animation loop for the map
    let animationFrameId: number;
    
    const animate = () => {
      drawMap();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    if (highlightedPath) {
      animate();
    }
    
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [highlightedPath]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>
      
      <div className="absolute bottom-4 right-4 glass rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-hospital-600" />
          <span className="font-medium">
            Currently viewing: Floor {floorInfo}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default HospitalMap;
