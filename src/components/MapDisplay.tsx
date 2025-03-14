
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { toast } from "@/components/ui/use-toast";

// This would normally be stored in environment variables
// Since this is a public API key for demonstration, we can include it directly
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

interface MapDisplayProps {
  userLocation: GeolocationCoordinates | null;
  destination: { lat: number; lng: number; name: string } | null;
  highlightedPath?: boolean;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  userLocation,
  destination,
  highlightedPath = false,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places", "directions"],
    });

    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
        toast({
          title: "Error",
          description: "Failed to load Google Maps. Please try again later.",
          variant: "destructive",
        });
      });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // Set the center to a default hospital location if user location is not available
    const hospitalLocation = { lat: 37.773972, lng: -122.431297 }; // Example hospital coordinates
    const mapOptions: google.maps.MapOptions = {
      center: userLocation
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : hospitalLocation,
      zoom: 16,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: "poi.medical",
          elementType: "geometry",
          stylers: [{ visibility: "on" }, { color: "#f0f7ff" }],
        },
        {
          featureType: "poi.medical",
          elementType: "labels.text.fill",
          stylers: [{ color: "#002c66" }],
        },
      ],
    };

    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Create a directions renderer
    const renderer = new google.maps.DirectionsRenderer({
      map: newMap,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#0070F3",
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });
    setDirectionsRenderer(renderer);

    // Add a marker for the hospital
    new google.maps.Marker({
      position: hospitalLocation,
      map: newMap,
      title: "Hospital",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

  }, [isLoaded, userLocation]);

  // Add user location marker and calculate directions
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear previous directions
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
      directionsRenderer.setMap(map);
    }

    if (userLocation) {
      const userLatLng = new google.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      );

      // Add user location marker
      new google.maps.Marker({
        position: userLatLng,
        map: map,
        title: "Your Location",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });

      // If we have a destination and we want to show the path
      if (destination && highlightedPath && directionsRenderer) {
        const directionsService = new google.maps.DirectionsService();
        
        directionsService.route(
          {
            origin: userLatLng,
            destination: new google.maps.LatLng(destination.lat, destination.lng),
            travelMode: google.maps.TravelMode.WALKING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
              directionsRenderer.setDirections(result);
              toast({
                title: "Directions Ready",
                description: `Walking directions to ${destination.name} are now available.`,
              });
            } else {
              toast({
                title: "Directions Error",
                description: "Could not calculate directions. Please try again.",
                variant: "destructive",
              });
            }
          }
        );
      }
    }
  }, [map, userLocation, destination, highlightedPath, directionsRenderer, isLoaded]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "100%" }}
    />
  );
};

export default MapDisplay;
