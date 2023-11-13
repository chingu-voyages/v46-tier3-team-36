import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useUpdateUnitMutation, useDeleteUnitMutation } from '@/features/units/unitsSlice';
import { UnitWithPropertyTenants } from '@/features/units/unitType'; 

type UnitCardProps = {
  unit: UnitWithPropertyTenants;
};

export const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(unit.name);
  const [updatedDescription, setUpdatedDescription] = useState(unit.description || '');
  const [updatedRent, setUpdatedRent] = useState(unit.rent.toString());

  const handleUpdateUnitSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUnitData = {
        id: unit.id,
        propertyId: unit.propertyId,
        name: updatedName,
        description: updatedDescription,
        rent: parseFloat(updatedRent),
      };
      await updateUnit(updatedUnitData).unwrap();
      toast.success("Unit updated successfully");
      setEditing(false);
    } catch (error) {
      toast.error("Unit update failed");
    }
  };

  const handleDeleteUnitClick = async () => {
    try {
      await deleteUnit(unit.id!).unwrap();
      toast.success("Unit deleted successfully");
    } catch (error) {
      toast.error("Unit deletion failed");
    }
  };

  return (
    <div className="flex space-x-4 unit-card border p-4 my-2">
      {editing ? (

        <form onSubmit={handleUpdateUnitSubmit}>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Unit Name"
            required
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Unit Description"
            required
          />
          <input
            type="number"
            value={updatedRent}
            onChange={(e) => setUpdatedRent(e.target.value)}
            placeholder="Unit Rent"
            required
          />
          <button type="submit">Update Unit</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (

        <>
          <h4>{unit.name}</h4>
          <p>{unit.description}</p>
          <p>${unit.rent}</p>
          <button className='text-yellow-500' onClick={() => setEditing(true)}>Edit</button>
          <button className='text-red-600' onClick={handleDeleteUnitClick}>Delete</button>
          <div>
          <h5>Tenants:</h5>
            {unit.tenants && unit.tenants.length > 0 ? (
              <ul>
                {unit.tenants.map((tenant) => (
                  <li key={tenant.id}>{tenant.name}</li>
                ))}
              </ul>
            ) : (
              <p>No tenants assigned</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UnitCard;
