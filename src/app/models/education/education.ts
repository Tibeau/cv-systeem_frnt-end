export interface Education {
  id: number;
  fieldOfStudy: string;
  website?: string;
  description?: string;
  diploma: string;
  school: string;
  country: string;
  startDate: string;
  endDate: string;
  active: boolean;
  candidateId: number;
}
