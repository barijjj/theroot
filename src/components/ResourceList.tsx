import React, { useState } from 'react';
import { Resource, Department } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ResourceListProps {
  resources: Resource[];
  departments: Department[];
  onResourceClick: (resource: Resource) => void;
}

const ResourceList = ({ resources, departments, onResourceClick }: ResourceListProps) => {
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set(departments.map(d => d.id)));

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(departmentId)) {
        newSet.delete(departmentId);
      } else {
        newSet.add(departmentId);
      }
      return newSet;
    });
  };

  const resourcesByDepartment = departments.map(department => ({
    ...department,
    resources: resources.filter(resource => resource.departmentId === department.id)
  }));

  return (
    <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Resources</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {resourcesByDepartment.map(({ id, name, color, resources: departmentResources }) => (
          <div key={id} className="bg-gray-50">
            <button
              onClick={() => toggleDepartment(id)}
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                {expandedDepartments.has(id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <span className="font-medium text-sm" style={{ color }}>
                  {name}
                </span>
                <span className="text-xs text-gray-500">
                  ({departmentResources.length})
                </span>
              </div>
            </button>
            {expandedDepartments.has(id) && (
              <div className="divide-y divide-gray-100">
                {departmentResources.map((resource) => (
                  <div
                    key={resource.id}
                    onClick={() => onResourceClick(resource)}
                    className="pl-8 pr-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        {resource.avatar ? (
                          <img
                            src={resource.avatar}
                            alt={resource.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <span className="text-indigo-600 font-medium">
                            {resource.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {resource.name}
                        </h3>
                        <p className="text-xs text-gray-500">{resource.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;