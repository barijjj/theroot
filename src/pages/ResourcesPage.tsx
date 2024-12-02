import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import ResourceModal from '../components/ResourceModal';
import DepartmentModal from '../components/DepartmentModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { Resource, Department } from '../types';
import { formatTime } from '../utils/timeUtils';

interface ResourcesPageProps {
  resources: Resource[];
  departments: Department[];
  onAddResource: (resource: Omit<Resource, 'id'>) => void;
  onDeleteResource: (id: string) => void;
  onAddDepartment: (department: Omit<Department, 'id'>) => void;
  onUpdateDepartment: (id: string, updates: Partial<Department>) => void;
  onDeleteDepartment: (id: string) => void;
}

const ResourcesPage = ({
  resources,
  departments,
  onAddResource,
  onDeleteResource,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
}: ResourcesPageProps) => {
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null);

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setShowDepartmentModal(true);
  };

  const handleSaveDepartment = (departmentData: Omit<Department, 'id'>) => {
    if (selectedDepartment) {
      onUpdateDepartment(selectedDepartment.id, departmentData);
    } else {
      onAddDepartment(departmentData);
    }
  };

  const handleDeleteDepartment = (department: Department) => {
    const hasResources = resources.some(r => r.departmentId === department.id);
    if (hasResources) {
      alert('Cannot delete department with assigned resources');
      return;
    }
    setDepartmentToDelete(department);
  };

  const handleConfirmDeleteDepartment = () => {
    if (departmentToDelete) {
      onDeleteDepartment(departmentToDelete.id);
      setDepartmentToDelete(null);
    }
  };

  const handleConfirmDeleteResource = () => {
    if (resourceToDelete) {
      onDeleteResource(resourceToDelete.id);
      setResourceToDelete(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowDepartmentModal(true)}
              className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <Users className="w-4 h-4" />
              <span>Add Department</span>
            </button>
            <button
              onClick={() => setShowResourceModal(true)}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource</span>
            </button>
          </div>
        </div>

        {/* Departments Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Departments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((department) => (
              <div
                key={department.id}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: department.color }}
                    />
                    <h3 className="font-medium text-gray-900">{department.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditDepartment(department)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDepartment(department)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{department.description}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {resources.filter(r => r.departmentId === department.id).length} members
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resources.map((resource) => {
                  const department = departments.find(
                    (d) => d.id === resource.departmentId
                  );
                  return (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                            <span className="text-indigo-600 font-medium">
                              {resource.name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {resource.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{ backgroundColor: `${department?.color}20`, color: department?.color }}
                        >
                          {department?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTime(resource.availability.start)} -{' '}
                        {formatTime(resource.availability.end)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setResourceToDelete(resource)}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showResourceModal && (
        <ResourceModal
          departments={departments}
          onClose={() => setShowResourceModal(false)}
          onSave={onAddResource}
        />
      )}

      {showDepartmentModal && (
        <DepartmentModal
          onClose={() => {
            setShowDepartmentModal(false);
            setSelectedDepartment(null);
          }}
          onSave={handleSaveDepartment}
          initialDepartment={selectedDepartment || undefined}
          mode={selectedDepartment ? 'edit' : 'add'}
        />
      )}

      {departmentToDelete && (
        <ConfirmationModal
          title="Delete Department"
          message={`Are you sure you want to delete "${departmentToDelete.name}"? This action cannot be undone.`}
          onConfirm={handleConfirmDeleteDepartment}
          onCancel={() => setDepartmentToDelete(null)}
        />
      )}

      {resourceToDelete && (
        <ConfirmationModal
          title="Delete Resource"
          message={`Are you sure you want to delete "${resourceToDelete.name}"? This action cannot be undone.`}
          onConfirm={handleConfirmDeleteResource}
          onCancel={() => setResourceToDelete(null)}
        />
      )}
    </div>
  );
};

export default ResourcesPage;