
"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} from '@/features/units/unitsSlice';
import { PropertyWithOwner } from '@/features/properties/PropertyTypes';

// Assuming these types are defined somewhere in your project
interface Tenant {
  id: number;
  name: string;
  // Other tenant properties
}

interface Unit {
  id?: number;
  propertyId: number;
  name: string;
  description: string;
  rent: string;
  tenants: Tenant[];
}

export interface NewUnitData {
  propertyId: number;
  name: string;
  description: string;
  rent: number;
}

interface Property {
  id: number;
  name: string;
  description: string;
  units: Unit[];
  // Other property properties
}

interface UnitsListProps {
  property: PropertyWithOwner;
}

const UnitsList: React.FC<UnitsListProps> = ({ property }) => {
  const [createUnit, { isLoading: isCreating }] = useCreateUnitMutation();
  // const [updateUnit] = useUpdateUnitMutation();
  // const [deleteUnit] = useDeleteUnitMutation();


  // const [newUnit, setNewUnit] = useState({
  //   propertyId: property.id,
  //   name: '',
  //   description: '',
  //   rent: '',
  // });

  // const handleCreateUnit = async () => {
  //   if (!isCreating) {
  //     try {
  //       await createUnit(newUnit).unwrap();
  //       setNewUnit({ propertyId: property.id, name: '', description: '', rent: '' });
  //       toast.success("Unit successfully created");
  //     } catch (error) {
  //       toast.error("Unit creation failed");
  //     }
  //   }
  // };

  // const handleUpdateUnit = async () => {
  //   try {
  //     await updateUnit(editedUnit).unwrap();
  //     setEditedUnit(null); // Clear the edited unit state
  //     refetch(); // Refresh the list
  //     toast.success("Unit successfully updated");
  //   } catch (error) {
  //     toast.error("Unit update failed");
  //   }
  // };

  // const handleDeleteUnit = async (unitId) => {
  //   try {
  //     await deleteUnit(unitId).unwrap();
  //     refetch();
  //     toast.success("Unit successfully deleted");
  //   } catch (error) {
  //     toast.error("Unit deletion failed");
  //   }
  // };

  return (
    <div className="units-list">
      {property.units.map((unit) => (
        <div key={unit.id}>
          <h4>{unit.name}</h4>
          <p>Description: {unit.description}</p>
          <p>Rent: {unit.rent}</p>
          {/* List Tenants */}
          <div>
            {unit.tenants.map(tenant => (
              <p key={tenant.id}>Tenant: {tenant.name}</p>
            ))}
          </div>
          <button onClick={() => {/* Update */}} className="text-blue-500 hover:text-blue-700 mr-2">Edit Unit</button>
          <button onClick={() => {/* Delete */}} className="text-red-500 hover:text-red-700">Delete Unit</button>
        </div>
      ))}
      <div className="new-unit-form">
      </div>
    </div>
  );
};

export default UnitsList;