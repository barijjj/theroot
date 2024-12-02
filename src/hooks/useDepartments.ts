import { useState } from 'react';
import { Department } from '../types';
import { generateId } from '../utils/helpers';

export const useDepartments = (initialDepartments: Department[]) => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment = {
      ...department,
      id: generateId(),
    };
    setDepartments((prev) => [...prev, newDepartment]);
  };

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    setDepartments((prev) =>
      prev.map((department) =>
        department.id === id ? { ...department, ...updates } : department
      )
    );
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((department) => department.id !== id));
  };

  return {
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  };
};