import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ResourceList from './components/ResourceList';
import Timeline from './components/Timeline';
import DailyView from './components/DailyView';
import BookingModal from './components/BookingModal';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import ProjectsPage from './pages/ProjectsPage';
import { useResources } from './hooks/useResources';
import { useBookings } from './hooks/useBookings';
import { useDepartments } from './hooks/useDepartments';
import { useProjects } from './hooks/useProjects';
import { useUser } from './hooks/useUser';

// Sample departments
const sampleDepartments = [
  {
    id: 'dev',
    name: 'Development',
    color: '#818cf8',
    description: 'Software Development Team'
  },
  {
    id: 'design',
    name: 'Design',
    color: '#34d399',
    description: 'UI/UX Design Team'
  }
];

// Sample data
const sampleResources = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Frontend Developer',
    departmentId: 'dev',
    availability: { start: '09:00', end: '17:00' },
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'UI Designer',
    departmentId: 'design',
    availability: { start: '09:00', end: '17:00' },
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Backend Developer',
    departmentId: 'dev',
    availability: { start: '09:00', end: '17:00' },
  },
];

const sampleBookings = [
  {
    id: '1',
    resourceId: '1',
    projectName: 'Website Redesign',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    startTime: '09:00',
    endTime: '17:00',
    color: '#818cf8',
  },
  {
    id: '2',
    resourceId: '2',
    projectName: 'Mobile App UI',
    startDate: '2024-03-21',
    endDate: '2024-03-23',
    startTime: '10:00',
    endTime: '16:00',
    color: '#34d399',
  },
];

// Sample projects with status
const sampleProjects = [
  {
    id: 'PROJ1',
    name: 'Website Redesign',
    color: '#818cf8',
    clientName: 'Acme Corp',
    status: 'active',
    billable: true,
    activityTypes: ['Development', 'Design'],
    description: 'Complete website redesign for Acme Corp',
    budget: 50000
  },
  {
    id: 'PROJ2',
    name: 'Mobile App UI',
    color: '#34d399',
    clientName: 'TechStart Inc',
    status: 'completed',
    billable: true,
    activityTypes: ['Design'],
    description: 'Mobile app UI design for TechStart Inc',
    budget: 25000
  },
];

// Sample user
const sampleUser = {
  name: 'John Doe',
  email: 'john@example.com',
};

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentView, setCurrentView] = useState<'schedule' | 'resources' | 'projects' | 'settings'>('schedule');
  const [scheduleView, setScheduleView] = useState<'week' | 'day'>('week');
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useDepartments(sampleDepartments);
  const { resources, addResource, updateResource, deleteResource } = useResources(sampleResources);
  const { bookings, addBooking, deleteBooking, updateBooking } = useBookings(sampleBookings);
  const { projects, addProject, deleteProject, updateProject } = useProjects(sampleProjects);
  const { user, updateProfile, changePassword } = useUser(sampleUser);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - (scheduleView === 'week' ? 7 : 1));
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (scheduleView === 'week' ? 7 : 1));
    setCurrentDate(newDate);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return (
          <SettingsPage
            user={user}
            onUpdateProfile={updateProfile}
            onChangePassword={changePassword}
          />
        );
      case 'resources':
        return (
          <ResourcesPage
            resources={resources}
            departments={departments}
            onAddResource={addResource}
            onDeleteResource={deleteResource}
            onAddDepartment={addDepartment}
            onUpdateDepartment={updateDepartment}
            onDeleteDepartment={deleteDepartment}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            projects={projects}
            onAddProject={addProject}
            onDeleteProject={deleteProject}
            onUpdateProject={updateProject}
          />
        );
      default:
        return (
          <>
            <Header
              currentDate={currentDate}
              onPreviousWeek={handlePreviousWeek}
              onNextWeek={handleNextWeek}
              onAddBooking={() => setShowBookingModal(true)}
              view={scheduleView}
              onViewChange={setScheduleView}
            />
            <div className="flex-1 flex overflow-hidden">
              <ResourceList
                resources={resources}
                departments={departments}
                onResourceClick={(resource) => console.log('Resource clicked:', resource)}
              />
              {scheduleView === 'week' ? (
                <Timeline
                  resources={resources}
                  bookings={bookings}
                  startDate={currentDate}
                  daysToShow={7}
                  onDeleteBooking={deleteBooking}
                />
              ) : (
                <DailyView
                  resources={resources}
                  bookings={bookings}
                  currentDate={currentDate}
                  onDeleteBooking={deleteBooking}
                />
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>

      {showBookingModal && (
        <BookingModal
          resources={resources}
          onClose={() => setShowBookingModal(false)}
          onSave={addBooking}
        />
      )}
    </div>
  );
}

export default App;