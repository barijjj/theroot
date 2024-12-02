import { useState } from 'react';
import { Resource } from '../types';
import { generateId } from '../utils/helpers';

export const useResources = (initialResources: Resource[]) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = {
      ...resource,
      id: generateId(),
    };
    setResources((prev) => [...prev, newResource]);
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === id ? { ...resource, ...updates } : resource
      )
    );
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id));
  };

  return {
    resources,
    addResource,
    updateResource,
    deleteResource,
  };
};