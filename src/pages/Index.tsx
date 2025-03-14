
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building, Compass, ListTodo, MapPin } from "lucide-react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import HospitalMap from "../components/HospitalMap";
import LocationCard, { LocationData } from "../components/LocationCard";

// Mock data for locations
const popularLocations: LocationData[] = [
  {
    id: "emergency",
    name: "Emergency Room",
    department: "Emergency",
    floor: "Ground Floor",
    building: "Main Building",
    description: "24/7 emergency medical care for critical conditions requiring immediate attention."
  },
  {
    id: "radiology",
    name: "Radiology Department",
    department: "Diagnostics",
    floor: 2,
    building: "East Wing",
    description: "Advanced imaging services including X-ray, MRI, CT scan, and ultrasound."
  },
  {
    id: "cardiology",
    name: "Cardiology OPD",
    department: "Cardiology",
    floor: 3,
    building: "Specialty Wing",
    description: "Outpatient services for heart-related conditions and consultations."
  },
  {
    id: "pharmacy",
    name: "Main Pharmacy",
    department: "Pharmacy",
    floor: "Ground Floor",
    building: "Central Block",
    description: "Central pharmacy providing prescription and over-the-counter medications."
  }
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger a search against the backend
    console.log("Searching for:", query);
  };

  return (
    <Layout>
      <section className="pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
          >
            Navigate hospitals with ease
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Find your way to any department, doctor, or facility quickly and stress-free.
          </motion.p>
          
          <SearchBar 
            onSearch={handleSearch} 
            className="mb-6"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/directions"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hospital-600 text-white hover:bg-hospital-700 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Get Directions</span>
            </Link>
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Building className="w-4 h-4" />
              <span>Browse Departments</span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative mb-12 md:mb-16"
      >
        <div className="absolute inset-0 bg-hospital-50 -z-10 rounded-xl"></div>
        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 rounded-xl">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              Simplified hospital navigation
            </h2>
            <p className="text-muted-foreground mb-6">
              HospitalGo provides clear, step-by-step directions to help you find your way around any hospital complex. No more getting lost or asking for directions repeatedly.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Interactive hospital maps",
                "Step-by-step navigation",
                "Quick search for departments and facilities",
                "Save favorite locations for repeat visits"
              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-foreground"
                >
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-hospital-100 flex items-center justify-center">
                    <ListTodo className="h-3 w-3 text-hospital-600" />
                  </div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="h-[300px] md:h-auto">
            <HospitalMap className="h-full rounded-lg shadow-md overflow-hidden" />
          </div>
        </div>
      </motion.section>
      
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Popular Destinations
          </h2>
          <Link
            to="/departments"
            className="text-sm font-medium text-hospital-600 hover:text-hospital-700 transition-colors flex items-center"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLocations.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
