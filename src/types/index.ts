export interface Resource {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  avatar?: string;
  availability: {
    start: string;
    end: string;
  };
}

export interface Department {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface Booking {
  id: string;
  resourceId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  clientName: string;
  startDate?: string;
  endDate?: string;
  billable: boolean;
  activityTypes: string[];
  description?: string;
  budget?: number;
  status: 'active' | 'completed' | 'on-hold';
}