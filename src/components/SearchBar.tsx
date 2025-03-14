
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for departments, doctors, or facilities...",
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative w-full max-w-xl mx-auto ${className}`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-center overflow-hidden transition-all duration-300 bg-white rounded-xl shadow-sm ${
            isFocused ? "ring-2 ring-hospital-300" : "ring-1 ring-border/50"
          }`}
        >
          <Search
            className={`absolute left-3 h-5 w-5 transition-colors ${
              isFocused ? "text-hospital-600" : "text-muted-foreground"
            }`}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="search-bar w-full pl-10 pr-10 py-3 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/70"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
