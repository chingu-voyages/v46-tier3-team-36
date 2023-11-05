
"use client"

import React, { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import { toast } from "react-toastify";
import { PropertyCard } from '@/components/dashboard/properties/PropertyCard';
import { NewPropertyData } from '@/features/properties/PropertyTypes';
import {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
} from '@/features/properties/propertiesSlice';

const PropertiesPage: React.FC = () => {
  const { data: properties, isLoading, isSuccess } = useGetPropertiesQuery();
  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation();
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyDescription, setNewPropertyDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddFormVisibility = () => setShowAddForm(!showAddForm);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newProperty: NewPropertyData = {
        name: newPropertyName,
        description: newPropertyDescription,
      };
      await createProperty(newProperty).unwrap();
      setNewPropertyName('');
      setNewPropertyDescription('');
      toast.success("Property successfully created")
      
    } catch (error) {
      toast.error("Error by creating new Property")
      console.error(error);
    }
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isSuccess) {
    return <ErrorDisplay message="Failed to fetch properties." />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Properties</h1>
        <button
          onClick={toggleAddFormVisibility}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          {showAddForm ? 'Cancel' : 'Add New Property'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              className="w-full p-2 border rounded-md"
              name="name"
              value={newPropertyName}
              onChange={(e) => setNewPropertyName(e.target.value)}
              required
              placeholder="Name"
            />
            <textarea
              className="w-full p-2 border rounded-md"
              name="description"
              value={newPropertyDescription}
              onChange={(e) => setNewPropertyDescription(e.target.value)}
              required
              placeholder="Description"
            />
            <button
              type="submit"
              disabled={isCreating}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
              Create Property
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-wrap -m-2">
        {properties.map(property => (
          <div key={property.id} className="w-full pb-10">
            <PropertyCard key={property.id} property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
