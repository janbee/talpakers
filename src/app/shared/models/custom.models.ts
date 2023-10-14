import { SemanticICONS } from 'semantic-ui-react';

export enum AlertTypeModel {
  Success = 'Success',
  Failed = 'Failed',
  Warning = 'Warning',
}

export interface AlertModel {
  message: string;
  type: AlertTypeModel;
  duration?: number;
}

export interface ContactsModel {
  text: string;
  icon?: SemanticICONS | string;
}

export interface WorkExperiencesModel {
  company: string;
  position: string;
  duration: string;
  jobDescription: string;
}

export interface SkillsModel {
  name: string;
  level: number;
}

export interface DataModel {
  name: string;
  intro: string;
  contacts: ContactsModel[];
  workExperiences: WorkExperiencesModel[];
  skills: SkillsModel[];
}
