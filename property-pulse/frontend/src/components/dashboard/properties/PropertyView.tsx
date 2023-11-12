
"use client"

import React, {useState} from 'react';
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
  const [newUnit, setNewUnit] = useState({ name: '', description: '', rent: 0 });

  const handleCreate = async () => {
    // Call your API to create a new unit
    // You might want to handle errors and show a success message
  };

  const handleUpdate = async (unitId:number) => {
    // Call your API to update the unit with the given id
    // You might want to handle errors and show a success message
  };

  const handleDelete = async (unitId:number) => {
    // Call your API to delete the unit with the given id
    // You might want to handle errors and show a success message
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg">
      <h3 className="text-xl font-semibold mb-2">Units</h3>
      {property.units?.map(unit => (
        <div key={unit.id} className="mb-4">
          <p className="font-medium">{unit.name} ({unit.description}) - ${unit.rent}</p>
          <p className="text-sm text-gray-500">Tenants: {unit.tenants.map(t => t.name).join(", ")}</p>
          <button onClick={() => handleUpdate(Number(unit.id))} className="text-blue-500 hover:text-blue-700">
            Edit
          </button>
          <button onClick={() => handleDelete(Number(unit.id))} className="text-red-500 hover:text-red-700 ml-2">
            Delete
          </button>
        </div>
      ))}
      <div>
        <input type="text" value={newUnit.name} onChange={e => setNewUnit({ ...newUnit, name: e.target.value })} placeholder="Unit name" />
        <input type="text" value={newUnit.description} onChange={e => setNewUnit({ ...newUnit, description: e.target.value })} placeholder="Unit description" />
        <input type="number" value={newUnit.rent} onChange={e => setNewUnit({ ...newUnit, rent: Number(e.target.value) })} placeholder="Unit rent" />
        <button onClick={handleCreate} className="text-green-500 hover:text-green-700">
          Create
        </button>
      </div>
    </div>
  );
};
