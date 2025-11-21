import templates from './cv-templates.json';

// ATS Template Types
export type CvTemplateContact = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export type CvTemplateExperience = {
    role: string;
    company: string;
    dates: string;
    location: string;
    bullets: string[];
}

export type CvTemplateEducation = {
    degree: string;
    school: string;
    dates: string;
    location: string;
}

export type CvTemplate = {
    id: string;
    contact: CvTemplateContact;
    summary: string;
    skills: string;
    experience: CvTemplateExperience[];
    education: CvTemplateEducation[];
}

// Skill-Based Template Types
export type SkillBasedCvTemplatePersonal = {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
}

export type SkillBasedCvTemplateSkills = {
    technical: string;
    soft: string;
}

export type SkillBasedCvTemplateProject = {
    name: string;
    role: string;
    tools: string;
    impact: string;
}

export type SkillBasedCvTemplateEducation = {
    degree: string;
    school: string;
    year: string;
    honors: string;
}

export type SkillBasedCvTemplateLeadership = {
    role: string;
    organization: string;
    timeframe: string;
    contribution: string;
}

export type SkillBasedCvTemplateCertification = {
    name: string;
    issuer: string;
    year: string;
}

export type SkillBasedCvTemplate = {
    id: string;
    personal: SkillBasedCvTemplatePersonal;
    summary: string;
    skills: SkillBasedCvTemplateSkills;
    projects: SkillBasedCvTemplateProject[];
    education: SkillBasedCvTemplateEducation[];
    leadership: SkillBasedCvTemplateLeadership[];
    certifications: SkillBasedCvTemplateCertification[];
}


export function getTemplateData(templateId: string): CvTemplate | null {
    const template = templates.ats.find(t => t.id === templateId);
    return template as CvTemplate || null;
}

export function getSkillBasedTemplateData(templateId: string): SkillBasedCvTemplate | null {
    const template = templates.skillBased.find(t => t.id === templateId);
    return template as SkillBasedCvTemplate || null;
}
