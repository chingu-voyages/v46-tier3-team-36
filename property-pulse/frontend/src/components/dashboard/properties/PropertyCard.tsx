
"use client"

import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useUpdatePropertyMutation, useDeletePropertyMutation } from '@/features/properties/propertiesSlice';
import { useCreateUnitMutation, useGetUnitsForPropertyQuery, useUpdateUnitMutation, useDeleteUnitMutation } from '@/features/units/unitsSlice';
import { PropertyWithOwner } from '@/features/properties/PropertyTypes';
import { NewUnitData } from './UnitsList'; 
import UnitCard from './UnitCard';

type PropertyCardProps = {
  property: PropertyWithOwner;
  refetch: () => void;
};


export const PropertyCard: React.FC<PropertyCardProps> = ({ property, refetch }) => {
  const { data: units } = useGetUnitsForPropertyQuery(property.id);
  const [updateProperty] = useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const [createUnit] = useCreateUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();
const [deleteUnit] = useDeleteUnitMutation();

  const [showUnits, setShowUnits] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newUnitName, setNewUnitName] = useState('');
  const [newUnitDescription, setNewUnitDescription] = useState('');
  const [newUnitRent, setNewUnitRent] = useState('');

  const [updatedName, setUpdatedName] = useState(property.name);
  const [updatedDescription, setUpdatedDescription] = useState(property.description || '');

  const handleToggleUnits = () => setShowUnits(!showUnits);

  const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedData = {
        id: property.id,
        ownerId: property.ownerId,
        name: updatedName,
        description: updatedDescription,
      };
      await updateProperty(updatedData).unwrap();
      toast.success("Property successfully updated");
      setEditing(false);
    } catch (error) {
      toast.error("Property update failed");
    }
  };

  const handleCreateUnitSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUnitData: NewUnitData = {
        propertyId: property.id,
        name: newUnitName,
        description: newUnitDescription,
        rent: parseFloat(newUnitRent),
      };
      await createUnit(newUnitData).unwrap();
      setNewUnitName('');
      setNewUnitDescription('');
      setNewUnitRent('');
      toast.success("Unit successfully created");
      refetch()
    } catch (error) {
      toast.error("Unit creation failed");
    }
  };

  const handleDeletePropertyClick = async () => {
    try {
      await deleteProperty(property.id).unwrap();
      toast.success("Property successfully deleted");
    } catch (error) {
      toast.error("Property deletion failed");
    }
  };

  return (
    <div className="border border-gray-300 rounded shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <span className="text-sm text-gray-600">Owned by: {property.owner.name}</span>
      </div>

      {editing ? (
        <form onSubmit={handleUpdateSubmit} className="p-4">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Property Name"
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Property Description"
            className="border p-2"
            required
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
          <button type="button" onClick={() => setEditing(false)} className="ml-2 px-4 py-2 text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </form>
      ) : (
        <div className="p-4">
          <p className="text-gray-600">{property.description}</p>
          <button onClick={() => setEditing(true)} className="text-blue-500 hover:text-blue-700 mr-2">
            Edit Property
          </button>
          <button onClick={handleDeletePropertyClick} className="text-red-500 hover:text-red-700">
            Delete Property
          </button>
        </div>
      )}

      {/* Units section */}
      {showUnits && (
          <div>
            {/* Replace this comment with the code to map over the units and display them */}
            {units?.map((unit) => (
              <UnitCard key={unit.id} unit={unit} updateUnit={updateUnit} deleteUnit={deleteUnit} refetch={refetch} />
            ))}
          </div>
        )}
      <button
        onClick={handleToggleUnits}
        className="w-full text-blue-500 hover:text-blue-700 p-4"
      >
        {showUnits ? 'Hide Units' : 'Show Units'}
      </button>

      {showUnits && (
        <form onSubmit={handleCreateUnitSubmit} className="p-4 border-t border-gray-300">
          <input
            type="text"
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
            placeholder="New Unit Name"
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            value={newUnitDescription}
            onChange={(e) => setNewUnitDescription(e.target.value)}
            placeholder="New Unit Description"
            className="border p-2"
            required
          />
          <input
            type="number"
            value={newUnitRent}
            onChange={(e) => setNewUnitRent(e.target.value)}
            placeholder="New Unit Rent"
            className="border p-2"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add New Unit
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyCard;
