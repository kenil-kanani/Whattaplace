'use client';

import { HiChevronDown, HiChevronRight } from 'react-icons/hi2';
import { useAppContext } from '@/contexts/AppContext';

export default function LocationFilter() {
  const { locationFilter, isLoadingHierarchy, hierarchyError } = useAppContext();
  const {
    filters,
    expandedCountries,
    expandedStates,
    toggleCountryExpansion,
    toggleStateExpansion,
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredLocationHierarchy,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    isCountryIndeterminate,
    isStateIndeterminate,
    clearAllFilters,
    hasActiveFilters,
  } = locationFilter;

  return (
    <div className="bg-white rounded-4xl p-4 mt-3 max-w-[250px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-black">Location</h3>
        {hasActiveFilters && !isLoadingHierarchy && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-medium hover:text-black"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoadingHierarchy}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        {searchQuery && !isLoadingHierarchy && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Location Hierarchy */}
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {isLoadingHierarchy ? (
          <div className="py-8 text-center text-sm text-gray-500">
            <div className="animate-pulse">Loading locations...</div>
          </div>
        ) : hierarchyError ? (
          <div className="py-8 text-center text-sm text-red-500">
            <div className="mb-2">Failed to load locations</div>
            <div className="text-xs text-gray-400">{hierarchyError}</div>
          </div>
        ) : filteredLocationHierarchy.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No locations found
          </div>
        ) : (
          filteredLocationHierarchy.map((countryData) => (
            <div key={countryData.country}>
              {/* Country Level */}
              <div className="flex items-center space-x-2 py-2 hover:bg-gray-50 rounded-lg">
                <button
                  onClick={() => toggleCountryExpansion(countryData.country)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedCountries.has(countryData.country) ? 
                    <HiChevronDown className="w-4 h-4" /> : 
                    <HiChevronRight className="w-4 h-4" />
                  }
                </button>
                <label className="flex items-center space-x-2 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={filters.countries.has(countryData.country)}
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = isCountryIndeterminate(countryData.country);
                      }
                    }}
                    onChange={(e) => handleCountryChange(countryData.country, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-black">{countryData.country}</span>
                </label>
              </div>

              {/* States Level */}
              {expandedCountries.has(countryData.country) && (
                <div className="ml-6 space-y-1">
                  {countryData.states.map((stateData) => (
                    <div key={stateData.state}>
                      <div className="flex items-center space-x-2 py-1 hover:bg-gray-50 rounded-lg">
                        <button
                          onClick={() => toggleStateExpansion(`${countryData.country}-${stateData.state}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedStates.has(`${countryData.country}-${stateData.state}`) ? 
                            <HiChevronDown className="w-4 h-4" /> : 
                            <HiChevronRight className="w-4 h-4" />
                          }
                        </button>
                        <label className="flex items-center space-x-2 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={filters.states.has(stateData.state)}
                            ref={(input) => {
                              if (input) {
                                input.indeterminate = isStateIndeterminate(countryData.country, stateData.state);
                              }
                            }}
                            onChange={(e) => handleStateChange(countryData.country, stateData.state, e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{stateData.state}</span>
                        </label>
                      </div>

                      {/* Cities Level */}
                      {expandedStates.has(`${countryData.country}-${stateData.state}`) && (
                        <div className="ml-6 space-y-1">
                          {stateData.cities.map((city) => (
                            <label key={city} className="flex items-center space-x-2 cursor-pointer py-1 hover:bg-gray-50 rounded-lg">
                              <input
                                type="checkbox"
                                checked={filters.cities.has(city)}
                                onChange={(e) => handleCityChange(city, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-600">{city}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
