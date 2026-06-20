export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  skillsAssociated: string[];
}


export interface SkillCategory {
  title: string;
  skills: { name: string; rating?: number; isKey?: boolean }[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
