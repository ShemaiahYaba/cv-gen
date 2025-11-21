"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FileDown, FileText, Trash2, Save, LayoutDashboard, Printer, FileImage, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { Form2CVLogo } from "@/components/icons";

// --- Type Definitions for Micro-Inputs ---

type PersonalInfo = {
    name: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
};

type SummaryInputs = {
    role: string;
    experience: string;
    strength1: string;
    strength2: string;
    strength3: string;
};

type Skills = {
    technical: string;
    tools: string;
    workflow: string;
};

type Experience = {
    role: string;
    company: string;
    location: string;
    dates: string;
    bullets: string[];
};

type Project = {
    name: string;
    description: string;
    tech: string;
    outcome: string;
};

type Education = {
    degree: string;
    institution: string;
    year: string;
};

type Leadership = {
    role: string;
    organization: string;
    dates: string;
    impact: string;
};

// --- Initial Data ---

const initialData = {
    personal: {
        name: "Alex Doe",
        phone: "123-456-7890",
        email: "alex.doe@example.com",
        linkedin: "linkedin.com/in/alexdoe",
        github: "github.com/alexdoe",
    },
    summaryInputs: {
        role: "Software Engineer",
        experience: "3+ years",
        strength1: "building scalable web applications",
        strength2: "shipping clean frontend interfaces",
        strength3: "leading small engineering teams to deliver high-impact features",
    },
    skills: {
        technical: "JavaScript, TypeScript, Python",
        tools: "React, Node.js, Docker, PostgreSQL",
        workflow: "Agile, CI/CD, TDD",
    },
    experience: [
        {
            role: "Software Engineer",
            company: "Tech Solutions Inc.",
            location: "San Francisco, CA",
            dates: "Jan 2022 – Present",
            bullets: [
                "Built a customer-facing analytics dashboard (React + D3.js), increasing user engagement by 25%.",
                "Improved backend API performance by 40% through Redis-based caching.",
                "Led a team of three junior developers to deliver a real-time chat feature, reducing customer support tickets by 15%.",
            ],
        },
    ],
    projects: [
        {
            name: "AI-Powered Task Manager",
            description: "Built an NLP-based system that automatically prioritizes tasks.",
            tech: "Python, TensorFlow, Flask",
            outcome: "Achieved 95% classification accuracy on user-submitted inputs."
        }
    ],
    education: [
        {
            degree: "B.S. in Computer Science",
            institution: "State University",
            year: "2021",
        },
    ],
    leadership: [
        {
            role: "President",
            organization: "University Coding Club",
            dates: "2020 – 2021",
            impact: "Organized weekly workshops and a university-wide hackathon, growing club membership by 50%.",
        },
    ],
};


// --- Main Component ---

export default function CustomCvEditorPage() {
    const [personal, setPersonal] = useState<PersonalInfo>(initialData.personal);
    const [summaryInputs, setSummaryInputs] = useState<SummaryInputs>(initialData.summaryInputs);
    const [skills, setSkills] = useState<Skills>(initialData.skills);
    const [experiences, setExperiences] = useState<Experience[]>(initialData.experience);
    const [projects, setProjects] = useState<Project[]>(initialData.projects);
    const [education, setEducation] = useState<Education[]>(initialData.education);
    const [leadership, setLeadership] = useState<Leadership[]>(initialData.leadership);
    
    // --- Helper Functions for Dynamic Lists ---
    const handleListChange = <T,>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>, index: number, field: keyof T, value: any) => {
        const updatedList = [...list];
        updatedList[index] = {...updatedList[index], [field]: value };
        setList(updatedList);
    };

    const addListItem = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, newItem: T) => {
        setList(prev => [...prev, newItem]);
    };

    const removeListItem = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
        setList(prev => prev.filter((_, i) => i !== index));
    };
    
    const handleBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[expIndex].bullets[bulletIndex] = value;
        setExperiences(updatedExperiences);
    };
    
    const addBullet = (expIndex: number) => {
        const updatedExperiences = [...experiences];
        if (updatedExperiences[expIndex].bullets.length < 5) {
            updatedExperiences[expIndex].bullets.push('');
            setExperiences(updatedExperiences);
        }
    };

    const removeBullet = (expIndex: number, bulletIndex: number) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[expIndex].bullets = updatedExperiences[expIndex].bullets.filter((_, i) => i !== bulletIndex);
        setExperiences(updatedExperiences);
    };

    // --- CV Generation Logic ---
    const generateSummary = () => {
        const { role, experience, strength1, strength2, strength3 } = summaryInputs;
        if (!role && !experience && !strength1) return "";
        return `${role} with ${experience} experience building ${strength1}. Skilled in ${strength2} and ${strength3}.`;
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Form2CVLogo className="h-6 w-6" />
                        <span className="font-headline font-semibold hidden sm:inline">Form2CV</span>
                    </Link>
                    <span className="text-muted-foreground hidden sm:inline">/</span>
                    <span className="font-semibold">Custom Editor</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm">
                          <FileDown className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Export as PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Export as DOCX</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileImage className="mr-2 h-4 w-4" />
                          <span>Export as Image</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
                {/* --- Micro-Inputs Panel --- */}
                <aside className="overflow-y-auto p-6 md:p-8 border-r">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-headline font-bold">Edit Content</h2>
                    </div>
                    <Accordion type="multiple" defaultValue={["personal", "experience"]} className="w-full space-y-4">
                        <AccordionItem value="personal">
                            <AccordionTrigger>Contact Information</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                <div className="grid gap-2"><Label>Full Name</Label><Input value={personal.name} onChange={(e) => setPersonal(p => ({...p, name: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>Email</Label><Input type="email" value={personal.email} onChange={(e) => setPersonal(p => ({...p, email: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>Phone</Label><Input value={personal.phone} onChange={(e) => setPersonal(p => ({...p, phone: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>LinkedIn Profile URL</Label><Input value={personal.linkedin} onChange={(e) => setPersonal(p => ({...p, linkedin: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>GitHub Profile URL</Label><Input value={personal.github} onChange={(e) => setPersonal(p => ({...p, github: e.target.value}))} /></div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="summary">
                            <AccordionTrigger>Professional Summary Inputs</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                <div className="grid gap-2"><Label>Current Role</Label><Input placeholder="e.g., Software Engineer" value={summaryInputs.role} onChange={(e) => setSummaryInputs(s => ({...s, role: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>Years of Experience</Label><Input placeholder="e.g., 5+ years" value={summaryInputs.experience} onChange={(e) => setSummaryInputs(s => ({...s, experience: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>Top Strength/Skill #1</Label><Input placeholder="e.g., building scalable APIs" value={summaryInputs.strength1} onChange={(e) => setSummaryInputs(s => ({...s, strength1: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>Top Strength/Skill #2</Label><Input placeholder="e.g., optimizing database performance" value={summaryInputs.strength2} onChange={(e) => setSummaryInputs(s => ({...s, strength2: e.target.value}))} /></div>
                                <div className="grid gap-2"><Label>Top Strength/Skill #3</Label><Input placeholder="e.g., mentoring junior developers" value={summaryInputs.strength3} onChange={(e) => setSummaryInputs(s => ({...s, strength3: e.target.value}))} /></div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="skills">
                            <AccordionTrigger>Core Skills</AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                                <div className="grid gap-2"><Label>Technical Skills (Languages)</Label><Textarea placeholder="Comma-separated, e.g., Python, JavaScript" value={skills.technical} onChange={(e) => setSkills(s => ({...s, technical: e.target.value}))} rows={2}/></div>
                                <div className="grid gap-2"><Label>Tools & Frameworks</Label><Textarea placeholder="Comma-separated, e.g., React, Docker" value={skills.tools} onChange={(e) => setSkills(s => ({...s, tools: e.target.value}))} rows={2}/></div>
                                <div className="grid gap-2"><Label>Workflow & Practices</Label><Textarea placeholder="Comma-separated, e.g., Agile, CI/CD" value={skills.workflow} onChange={(e) => setSkills(s => ({...s, workflow: e.target.value}))} rows={2}/></div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="experience">
                            <AccordionTrigger>Work Experience</AccordionTrigger>
                            <AccordionContent className="space-y-6 pt-4">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="space-y-4 p-4 border rounded-md relative">
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeListItem(setExperiences, i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                        <div className="grid gap-2"><Label>Role</Label><Input value={exp.role} onChange={(e) => handleListChange(experiences, setExperiences, i, 'role', e.target.value)} /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2"><Label>Company</Label><Input value={exp.company} onChange={(e) => handleListChange(experiences, setExperiences, i, 'company', e.target.value)} /></div>
                                            <div className="grid gap-2"><Label>Location</Label><Input value={exp.location} onChange={(e) => handleListChange(experiences, setExperiences, i, 'location', e.target.value)} /></div>
                                        </div>
                                        <div className="grid gap-2"><Label>Dates</Label><Input value={exp.dates} onChange={(e) => handleListChange(experiences, setExperiences, i, 'dates', e.target.value)} /></div>
                                        <div className="grid gap-2">
                                            <Label>Key Achievements (Max 5)</Label>
                                            {exp.bullets.map((bullet, bulletIndex) => (
                                                <div key={bulletIndex} className="flex items-center gap-2">
                                                    <Textarea value={bullet} onChange={e => handleBulletChange(i, bulletIndex, e.target.value)} rows={2} placeholder="Action Verb → What you did → Quantified outcome"/>
                                                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeBullet(i, bulletIndex)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                                </div>
                                            ))}
                                            {exp.bullets.length < 5 && <Button variant="outline" size="sm" onClick={() => addBullet(i)}>Add Achievement</Button>}
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => addListItem(setExperiences, {role: '', company: '', location: '', dates: '', bullets: ['']})}>Add Experience</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="projects">
                            <AccordionTrigger>Projects</AccordionTrigger>
                            <AccordionContent className="space-y-6 pt-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className="space-y-4 p-4 border rounded-md relative">
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeListItem(setProjects, i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                        <div className="grid gap-2"><Label>Project Name</Label><Input value={proj.name} onChange={(e) => handleListChange(projects, setProjects, i, 'name', e.target.value)} /></div>
                                        <div className="grid gap-2"><Label>One-line Description</Label><Textarea value={proj.description} onChange={(e) => handleListChange(projects, setProjects, i, 'description', e.target.value)} rows={2} /></div>
                                        <div className="grid gap-2"><Label>Tech Stack</Label><Input value={proj.tech} onChange={(e) => handleListChange(projects, setProjects, i, 'tech', e.target.value)} /></div>
                                        <div className="grid gap-2"><Label>Quantified Outcome</Label><Textarea value={proj.outcome} onChange={(e) => handleListChange(projects, setProjects, i, 'outcome', e.target.value)} rows={2} /></div>
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => addListItem(setProjects, {name: '', description: '', tech: '', outcome: ''})}>Add Project</Button>
                            </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="education">
                           <AccordionTrigger>Education</AccordionTrigger>
                            <AccordionContent className="space-y-6 pt-4">
                                {education.map((edu, i) => (
                                <div key={i} className="space-y-4 p-4 border rounded-md relative">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeListItem(setEducation, i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                    <div className="grid gap-2"><Label>Degree</Label><Input value={edu.degree} onChange={(e) => handleListChange(education, setEducation, i, 'degree', e.target.value)} /></div>
                                    <div className="grid gap-2"><Label>Institution</Label><Input value={edu.institution} onChange={(e) => handleListChange(education, setEducation, i, 'institution', e.target.value)} /></div>
                                    <div className="grid gap-2"><Label>Graduation Year</Label><Input value={edu.year} onChange={(e) => handleListChange(education, setEducation, i, 'year', e.target.value)} /></div>
                                </div>
                                ))}
                                <Button variant="outline" onClick={() => addListItem(setEducation, {degree: '', institution: '', year: ''})}>Add Education</Button>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="leadership">
                            <AccordionTrigger>Leadership & Involvement</AccordionTrigger>
                            <AccordionContent className="space-y-6 pt-4">
                                {leadership.map((item, i) => (
                                    <div key={i} className="space-y-4 p-4 border rounded-md relative">
                                         <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeListItem(setLeadership, i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                        <div className="grid gap-2"><Label>Role</Label><Input value={item.role} onChange={(e) => handleListChange(leadership, setLeadership, i, 'role', e.target.value)} /></div>
                                        <div className="grid gap-2"><Label>Organization</Label><Input value={item.organization} onChange={(e) => handleListChange(leadership, setLeadership, i, 'organization', e.target.value)} /></div>
                                        <div className="grid gap-2"><Label>Dates</Label><Input value={item.dates} onChange={(e) => handleListChange(leadership, setLeadership, i, 'dates', e.target.value)} /></div>
                                        <div className="grid gap-2"><Label>Key Impact</Label><Textarea value={item.impact} onChange={(e) => handleListChange(leadership, setLeadership, i, 'impact', e.target.value)} rows={2} /></div>
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => addListItem(setLeadership, {role: '', organization: '', dates: '', impact: ''})}>Add Involvement</Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </aside>

                {/* --- Live CV Preview --- */}
                <main className="overflow-y-auto p-8 lg:p-12 bg-muted/30 print:p-0">
                    <div id="cv-preview" className="bg-white p-10 shadow-lg mx-auto max-w-4xl font-body text-black print:shadow-none" style={{ aspectRatio: '8.5 / 11' }}>
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold font-headline">{personal.name}</h1>
                            <p className="text-xs text-gray-600 mt-1">
                                {personal.phone} | {personal.email} | {personal.linkedin} | {personal.github}
                            </p>
                        </div>
                        
                        {/* Summary */}
                        <div className="mb-6">
                            <h2 className="text-xs font-bold font-headline uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Professional Summary</h2>
                            <p className="text-sm">{generateSummary()}</p>
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                            <h2 className="text-xs font-bold font-headline uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Core Skills</h2>
                            <div className="text-sm flex gap-x-4">
                                <p><strong>Languages:</strong> {skills.technical}</p>
                                <p><strong>Frameworks/Tools:</strong> {skills.tools}</p>
                                <p><strong>Workflow:</strong> {skills.workflow}</p>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="mb-6">
                             <h2 className="text-xs font-bold font-headline uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Work Experience</h2>
                             {experiences.map((exp, i) => (
                                 <div key={i} className="mb-4">
                                     <div className="flex justify-between items-end">
                                        <p className="text-sm"><strong>{exp.role}</strong> — {exp.company}, {exp.location}</p>
                                        <p className="text-sm text-gray-600">{exp.dates}</p>
                                     </div>
                                     <ul className="list-disc pl-5 mt-1 space-y-0.5">
                                         {exp.bullets.map((bullet, bulletIndex) => (
                                             bullet && <li key={bulletIndex} className="text-sm">{bullet}</li>
                                         ))}
                                     </ul>
                                 </div>
                             ))}
                        </div>

                        {/* Projects */}
                        {projects.length > 0 && projects[0].name && <div className="mb-6">
                             <h2 className="text-xs font-bold font-headline uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Projects</h2>
                             {projects.map((proj, i) => (
                                <div key={i} className="mb-2">
                                    <p className="text-sm"><strong>{proj.name}</strong> — {proj.tech}</p>
                                     <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                                        <li className="text-sm">{proj.description} {proj.outcome}</li>
                                     </ul>
                                </div>
                             ))}
                        </div>}

                        {/* Education */}
                        <div className="mb-6">
                            <h2 className="text-xs font-bold font-headline uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Education</h2>
                            {education.map((edu, i) => (
                                <p key={i} className="text-sm"><strong>{edu.degree}</strong> — {edu.institution} ({edu.year})</p>
                            ))}
                        </div>

                        {/* Leadership */}
                        {leadership.length > 0 && leadership[0].role && <div>
                             <h2 className="text-xs font-bold font-headline uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Leadership & Involvement</h2>
                             {leadership.map((item, i) => (
                                <div key={i} className="mb-2">
                                    <p className="text-sm"><strong>{item.role},</strong> {item.organization} ({item.dates})</p>
                                     <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                                         <li className="text-sm">{item.impact}</li>
                                     </ul>
                                </div>
                             ))}
                        </div>}

                    </div>
                </main>
            </div>
        </div>
    );
}
