import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

export interface SelectedAddress {
  addressLine?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AddressAutocompleteProps {
  value: string;
  onSelect: (address: SelectedAddress) => void;
  placeholder?: string;
  className?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onSelect,
  placeholder = "Search address",
  className
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService = useRef<any>(null);
  const placesService = useRef<any>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.maps?.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      const mapDiv = document.createElement('div');
      const map = new window.google.maps.Map(mapDiv);
      placesService.current = new window.google.maps.places.PlacesService(map);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.length > 2 && autocompleteService.current) {
      setIsLoading(true);
      autocompleteService.current.getPlacePredictions(
        {
          input: newValue,
          componentRestrictions: { country: 'IN' },
          types: ['address']
        },
        (predictions: any, status: any) => {
          setIsLoading(false);
          if (status === window.google?.maps?.places?.PlacesServiceStatus?.OK && predictions) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (placeId: string, description: string) => {
    if (placesService.current) {
      placesService.current.getDetails(
        { placeId, fields: ['address_components', 'formatted_address'] },
        (place: any, status: any) => {
          if (status === window.google?.maps?.places?.PlacesServiceStatus?.OK && place) {
            const components = place.address_components || [];
            const parsedAddress: SelectedAddress = {
              addressLine: place.formatted_address || description
            };

            components.forEach((component) => {
              const types = component.types;
              if (types.includes('sublocality') || types.includes('neighborhood')) {
                parsedAddress.area = component.long_name;
              } else if (types.includes('locality')) {
                parsedAddress.city = component.long_name;
              } else if (types.includes('administrative_area_level_1')) {
                parsedAddress.state = component.long_name;
              } else if (types.includes('postal_code')) {
                parsedAddress.pincode = component.long_name;
              }
            });

            setInputValue(description);
            setShowSuggestions(false);
            onSelect(parsedAddress);
          }
        }
      );
    } else {
      // Fallback if Google Maps is not loaded
      setInputValue(description);
      setShowSuggestions(false);
      onSelect({ addressLine: description });
    }
  };

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="px-3 py-2 cursor-pointer hover:bg-muted text-sm"
              onClick={() => handleSuggestionClick(suggestion.place_id, suggestion.description)}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;