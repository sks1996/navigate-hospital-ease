
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building, Filter, Search, X } from "lucide-react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import LocationCard, { LocationData } from "../components/LocationCard";

// Mock data for departments/locations
const allDepartments: LocationData[] = [
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
  },
  {
    id: "neurology",
    name: "Neurology Department",
    department: "Neurology",
    floor: 4,
    building: "Specialty Wing",
    description: "Specialized care for conditions affecting the nervous system and brain."
  },
  {
    id: "pediatrics",
    name: "Pediatric Care",
    department: "Pediatrics",
    floor: 2,
    building: "Children's Wing",
    description: "Comprehensive healthcare services for infants, children, and adolescents."
  },
  {
    id: "orthopedics",
    name: "Orthopedic Center",
    department: "Orthopedics",
    floor: 3,
    building: "East Wing",
    description: "Specialized care for musculoskeletal injuries and conditions."
  },
  {
    id: "laboratory",
    name: "Clinical Laboratory",
    department: "Diagnostics",
    floor: 1,
    building: "Main Building",
    description: "Full-service laboratory for blood tests and other diagnostic samples."
  }
];

// Filter categories
const buildings = ["All Buildings", "Main Building", "East Wing", "Specialty Wing", "Central Block", "Children's Wing"];
const floors = ["All Floors", "Ground Floor", "Floor 1", "Floor 2", "Floor 3", "Floor 4"];
const departmentTypes = ["All Departments", "Emergency", "Diagnostics", "Cardiology", "Pharmacy", "Neurology", "Pediatrics", "Orthopedics"];

const Departments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState(allDepartments);
  const [selectedBuilding, setSelectedBuilding] = useState("All Buildings");
  const [selectedFloor, setSelectedFloor] = useState("All Floors");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedBuilding, selectedFloor, selectedDepartment);
  };
  
  const applyFilters = (
    query: string = searchQuery, 
    building: string = selectedBuilding, 
    floor: string = selectedFloor, 
    department: string = selectedDepartment
  ) => {
    let filtered = [...allDepartments];
    
    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(dept => 
        dept.name.toLowerCase().includes(lowercaseQuery) || 
        dept.department.toLowerCase().includes(lowercaseQuery) ||
        dept.building.toLowerCase().includes(lowercaseQuery) ||
        (dept.description && dept.description.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Apply building filter
    if (building !== "All Buildings") {
      filtered = filtered.filter(dept => dept.building === building);
    }
    
    // Apply floor filter
    if (floor !== "All Floors") {
      filtered = filtered.filter(dept => dept.floor.toString() === floor.replace("Floor ", ""));
    }
    
    // Apply department filter
    if (department !== "All Departments") {
      filtered = filtered.filter(dept => dept.department === department);
    }
    
    setFilteredDepartments(filtered);
  };
  
  const resetFilters = () => {
    setSelectedBuilding("All Buildings");
    setSelectedFloor("All Floors");
    setSelectedDepartment("All Departments");
    setSearchQuery("");
    setFilteredDepartments(allDepartments);
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Departments</h1>
          <p className="text-muted-foreground">
            Find and get directions to any department in the hospital.
          </p>
        </motion.div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                placeholder="Search departments, specialties, or facilities..."
                onSearch={handleSearch}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 py-3 px-4 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors sm:self-stretch"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
          
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-border/60 shadow-sm p-5 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Filter Departments</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-muted-foreground hover:text-hospital-600 transition-colors"
                >
                  Reset all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Building
                  </label>
                  <select
                    value={selectedBuilding}
                    onChange={(e) => {
                      setSelectedBuilding(e.target.value);
                      applyFilters(searchQuery, e.target.value, selectedFloor, selectedDepartment);
                    }}
                    className="w-full p-2 rounded-md border border-border focus:ring-2 focus:ring-hospital-300 transition-all"
                  >
                    {buildings.map(building => (
                      <option key={building} value={building}>
                        {building}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Floor
                  </label>
                  <select
                    value={selectedFloor}
                    onChange={(e) => {
                      setSelectedFloor(e.target.value);
                      applyFilters(searchQuery, selectedBuilding, e.target.value, selectedDepartment);
                    }}
                    className="w-full p-2 rounded-md border border-border focus:ring-2 focus:ring-hospital-300 transition-all"
                  >
                    {floors.map(floor => (
                      <option key={floor} value={floor}>
                        {floor}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Department Type
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      applyFilters(searchQuery, selectedBuilding, selectedFloor, e.target.value);
                    }}
                    className="w-full p-2 rounded-md border border-border focus:ring-2 focus:ring-hospital-300 transition-all"
                  >
                    {departmentTypes.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Active filters display */}
          {(selectedBuilding !== "All Buildings" || selectedFloor !== "All Floors" || selectedDepartment !== "All Departments" || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <div className="inline-flex items-center gap-2 text-sm bg-hospital-50 text-hospital-700 rounded-full px-3 py-1">
                  <Search className="h-3 w-3" />
                  <span>{searchQuery}</span>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      applyFilters("", selectedBuilding, selectedFloor, selectedDepartment);
                    }}
                    className="ml-1 hover:text-hospital-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {selectedBuilding !== "All Buildings" && (
                <div className="inline-flex items-center gap-2 text-sm bg-hospital-50 text-hospital-700 rounded-full px-3 py-1">
                  <Building className="h-3 w-3" />
                  <span>{selectedBuilding}</span>
                  <button
                    onClick={() => {
                      setSelectedBuilding("All Buildings");
                      applyFilters(searchQuery, "All Buildings", selectedFloor, selectedDepartment);
                    }}
                    className="ml-1 hover:text-hospital-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {selectedFloor !== "All Floors" && (
                <div className="inline-flex items-center gap-2 text-sm bg-hospital-50 text-hospital-700 rounded-full px-3 py-1">
                  <span>{selectedFloor}</span>
                  <button
                    onClick={() => {
                      setSelectedFloor("All Floors");
                      applyFilters(searchQuery, selectedBuilding, "All Floors", selectedDepartment);
                    }}
                    className="ml-1 hover:text-hospital-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {selectedDepartment !== "All Departments" && (
                <div className="inline-flex items-center gap-2 text-sm bg-hospital-50 text-hospital-700 rounded-full px-3 py-1">
                  <span>{selectedDepartment}</span>
                  <button
                    onClick={() => {
                      setSelectedDepartment("All Departments");
                      applyFilters(searchQuery, selectedBuilding, selectedFloor, "All Departments");
                    }}
                    className="ml-1 hover:text-hospital-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div>
          {filteredDepartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((department, index) => (
                <LocationCard key={department.id} location={department} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No departments found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-md bg-hospital-50 text-hospital-700 hover:bg-hospital-100 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Departments;
