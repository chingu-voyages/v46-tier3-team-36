
"use client"

import React from 'react';
import { PropertyWithOwner } from '@/features/properties/PropertyTypes';
// import { toast } from "react-toastify";
// toast.success("Successfully")
// toast.error("Error")

type PropertyViewProps = {
  property: PropertyWithOwner;
  onEdit: () => void;
  onDelete: () => void;
};

export const PropertyView: React.FC<PropertyViewProps> = ({ property, onEdit, onDelete }) => {
  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg">
      <h3 className="text-xl font-semibold mb-2">Units</h3>
      {property.units?.map(unit => (
        <div key={unit.id} className="mb-4">
          <p className="font-medium">{unit.name} ({unit.description}) - ${unit.rent}</p>
          <p className="text-sm text-gray-500">Tenants: {unit.tenants.map(t => t.name).join(", ")}</p>
        </div>
      ))}
      <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
        Edit
      </button>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700 ml-2">
        Delete
      </button>
      <p className="text-right">View Property</p>
    </div>
  );
};
