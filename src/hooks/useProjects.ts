import { useState } from 'react';
import { Project } from '../types';
import { generateId } from '../utils/helpers';

export const useProjects = (initialProjects: Project[] = []) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects.map(project => ({
    ...project,
    status: project.status || 'active'
  })));

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: generateId(),
      status: project.status || 'active'
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  return {
    projects,
    addProject,
    deleteProject,
    updateProject,
  };
};