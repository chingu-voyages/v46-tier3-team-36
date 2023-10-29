"use client"

import React from 'react';
import { mockProperties } from './mockData';  // Some hardcoded mock data

type Tenant = {
  id: number;
  name: string;
};

type Unit = {
  id: number;
  name: string;
  description: string;
  rent: number;
  tenants: Tenant[];
};

type Property = {
  id: number;
  name: string;
  description: string;
  owner: {
    id: number;
    name: string;
  };
  units: Unit[];
};

type PropertyCardProps = {
  property: Property;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [showUnits, toggleUnits] = React.useState(false);

  return (
    <div 
      className="m-4 cursor-pointer w-full"
      onClick={() => toggleUnits(!showUnits)}
    >
      {!showUnits ? (
        <div className="p-4 border border-gray-300 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">{property.name}</h2>
          <p className="text-gray-600 mb-2">{property.description}</p>
          <p className="text-sm text-gray-500">Owner: {property.owner.name}</p>
          <p className="text-right">View Units</p>
        </div>
      ) : (
        <div className="p-4 border border-gray-300 rounded shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Units</h3>
          {property.units.map(unit => (
            <div key={unit.id} className="mb-4">
              <p className="font-medium">{unit.name} ({unit.description}) - ${unit.rent}</p>
              <p className="text-sm text-gray-500">Tenants: {unit.tenants.map(t => t.name).join(", ")}</p>
            </div>
          ))}
          <p className="text-right">View Property</p>
        </div>
      )}
    </div>
  );
};

const PropertiesPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="flex flex-wrap -m-2">
        {mockProperties.map(property => (
          <div key={property.id} className="w-full md:w-1/2 p-2">
            <PropertyCard key={property.id} property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;