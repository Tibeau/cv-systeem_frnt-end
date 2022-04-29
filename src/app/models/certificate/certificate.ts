export interface Certificate {
  id: number;
  name: string;
  description?: string;
  length: string;
  dateEarned: string;
  active: boolean;
  candidateId: number;
}
