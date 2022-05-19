export interface User {
  id: string;
  candidateId?: number;
  companyId?: number;
  username: string;
  email: string;
  phone?: string;
  password: string;
  firstname?: string;
  lastname?: string;
  country?: string;
  street?: string;
  city?: string;
  category: string;
  description?: string;
  linkedIn?: string;
  imgUrl?: string;
  driversLicence?: string;
  role: string;
  token?: string;
  number?: string;
  postalCode?: string;
  active: boolean;
  firstLogin?: boolean;



}
