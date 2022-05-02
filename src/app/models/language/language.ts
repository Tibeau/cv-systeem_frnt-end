export interface Language {
  id: number;
  name: string;
  reading: string;
  writing: string;
  speaking: string;
  nativeLanguage: string;
  active: boolean;
  candidateId: number;
}
