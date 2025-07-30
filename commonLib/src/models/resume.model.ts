export class Resume {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Resume> = {}) {
    this.personalInfo = data.personalInfo || new PersonalInfo();
    this.education = data.education || [];
    this.experience = data.experience || [];
    this.skills = data.skills || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export class PersonalInfo {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  location: string;

  constructor(data: Partial<PersonalInfo> = {}) {
    this.fullName = data.fullName || '';
    this.position = data.position || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.location = data.location || '';
  }
}

export class Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description?: string;

  constructor(data: Partial<Education> = {}) {
    this.institution = data.institution || '';
    this.degree = data.degree || '';
    this.fieldOfStudy = data.fieldOfStudy || '';
    this.startDate = data.startDate || '';
    this.endDate = data.endDate || '';
    this.description = data.description;
  }
}

export class Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;

  constructor(data: Partial<Experience> = {}) {
    this.company = data.company || '';
    this.position = data.position || '';
    this.startDate = data.startDate || '';
    this.endDate = data.endDate || '';
    this.description = data.description || '';
  }
}