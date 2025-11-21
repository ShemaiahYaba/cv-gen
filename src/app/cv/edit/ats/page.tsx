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
import { FileDown, FileText, Trash2, Save, LayoutDashboard, Printer, FileImage } from "lucide-react";
import Link from "next/link";
import { VitaeForgeLogo } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type ContactInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

type Bullet = {
    text: string;
    useFramework: boolean;
    action: string;
    method: string;
    result: string;
}

type Experience = {
    role: string;
    company: string;
    dates: string;
    location: string;
    bullets: Bullet[];
}

type Education = {
    degree: string;
    school: string;
    dates: string;
    location: string;
}

const initialData = {
    contact: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (123) 456-7890",
        address: "New York, USA",
    },
    summary: "Results-driven software engineer with 5+ years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js, with a track record of delivering high-quality code and collaborating effectively in agile environments.",
    skills: "JavaScript, React, Node.js, Python, SQL, Docker, TypeScript, AWS, CI/CD, Agile Methodologies",
    experience: [
        {
            role: "Software Engineer",
            company: "TechCorp",
            dates: "Jan 2020 – Present",
            location: "San Francisco, CA",
            bullets: [
                {
                    text: "Developed and maintained client-side features for a high-traffic e-commerce platform using React and TypeScript, improving user engagement by 15%.",
                    useFramework: false, action: "", method: "", result: ""
                },
                {
                    text: "Collaborated with product teams to define and implement new functionalities, resulting in a 20% reduction in cart abandonment.",
                    useFramework: false, action: "", method: "", result: ""
                },
                {
                    text: "Built and consumed RESTful APIs with Node.js and Express, improving data retrieval times by 30%.",
                    useFramework: false, action: "", method: "", result: ""
                }
            ]
        },
        {
            role: "Junior Developer",
            company: "Innovate LLC",
            dates: "Jun 2018 – Dec 2019",
            location: "Austin, TX",
            bullets: [
                 {
                    text: "Assisted in the development of a customer relationship management (CRM) system using JavaScript and SQL.",
                    useFramework: false, action: "", method: "", result: ""
                },
                 {
                    text: "Fixed over 100 bugs and improved application performance by 10% through systematic code reviews and testing.",
                    useFramework: false, action: "", method: "", result: ""
                }
            ]
        }
    ],
    education: [
        {
            degree: "B.S. in Computer Science",
            school: "University of Technology",
            dates: "2014-2018",
            location: "Metropolis, USA"
        }
    ]
}

export default function AtsCvEditorPage() {
    const [contact, setContact] = useState<ContactInfo>(initialData.contact);
    const [summary, setSummary] = useState<string>(initialData.summary);
    const [skills, setSkills] = useState<string>(initialData.skills);
    const [experiences, setExperiences] = useState<Experience[]>(initialData.experience);
    const [educations, setEducations] = useState<Education[]>(initialData.education);

    const handleListChange = <T,>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>, index: number, field: keyof T, value: any) => {
        const updatedList = [...list];
        updatedList[index] = {...updatedList[index], [field]: value };
        setList(updatedList);
    };

    const handleBulletChange = (expIndex: number, bulletIndex: number, field: keyof Bullet, value: string | boolean) => {
        const updatedExperiences = [...experiences];
        const updatedBullets = [...updatedExperiences[expIndex].bullets];
        updatedBullets[bulletIndex] = { ...updatedBullets[bulletIndex], [field]: value };
        updatedExperiences[expIndex].bullets = updatedBullets;
        setExperiences(updatedExperiences);
    };
    
    const addListItem = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, newItem: T) => {
        setList(prev => [...prev, newItem]);
    };

    const removeListItem = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
        setList(prev => prev.filter((_, i) => i !== index));
    };

    const addBullet = (expIndex: number) => {
        const updatedExperiences = [...experiences];
        if (updatedExperiences[expIndex].bullets.length < 5) {
             updatedExperiences[expIndex].bullets.push({ text: '', useFramework: false, action: '', method: '', result: '' });
            setExperiences(updatedExperiences);
        }
    }

    const removeBullet = (expIndex: number, bulletIndex: number) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[expIndex].bullets = updatedExperiences[expIndex].bullets.filter((_, i) => i !== bulletIndex);
        setExperiences(updatedExperiences);
    }
    
    const formatBullet = (bullet: Bullet) => {
        if (bullet.useFramework) {
            let text = '';
            if (bullet.action) text += `${bullet.action}`;
            if (bullet.method) text += ` using ${bullet.method}`;
            if (bullet.result) text += `, which led to ${bullet.result}`;
            return text.trim() ? text + '.' : '';
        }
        return bullet.text;
    }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <VitaeForgeLogo className="h-6 w-6" />
            <span className="font-headline font-semibold hidden sm:inline">Vitae Forge</span>
          </Link>
          <span className="text-muted-foreground hidden sm:inline">/</span>
          <span className="font-semibold">ATS Editor</span>
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
        <aside className="overflow-y-auto p-6 md:p-8 border-r">
          <h2 className="text-2xl font-headline font-bold mb-6">Edit Content</h2>
          <Accordion type="multiple" defaultValue={["contact", "experience"]} className="w-full space-y-4">
            <AccordionItem value="contact">
              <AccordionTrigger>Contact Information</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={contact.name} onChange={(e) => setContact(c => ({...c, name: e.target.value}))} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={contact.email} onChange={(e) => setContact(c => ({...c, email: e.target.value}))} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={contact.phone} onChange={(e) => setContact(c => ({...c, phone: e.target.value}))} />
                    </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address (City, State)</Label>
                  <Input id="address" name="address" value={contact.address} onChange={(e) => setContact(c => ({...c, address: e.target.value}))} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary">
              <AccordionTrigger>Professional Summary</AccordionTrigger>
              <AccordionContent className="pt-4">
                <Textarea placeholder="A 2-3 line summary of your skills and career focus." name="summary" value={summary} onChange={e => setSummary(e.target.value)} rows={4} />
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="skills">
              <AccordionTrigger>Skills / Core Competencies</AccordionTrigger>
              <AccordionContent className="pt-4">
                 <Textarea placeholder="Comma-separated skills (e.g. Skill 1, Skill 2, Skill 3)" name="skills" value={skills} onChange={e => setSkills(e.target.value)} rows={3} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="experience">
              <AccordionTrigger>Experience & Projects</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {experiences.map((exp, expIndex) => (
                  <div key={expIndex} className="space-y-4 p-4 border rounded-md relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeListItem(setExperiences, expIndex)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Role / Project Name</Label>
                            <Input value={exp.role} onChange={e => handleListChange(experiences, setExperiences, expIndex, 'role', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Company / Context</Label>
                            <Input value={exp.company} onChange={e => handleListChange(experiences, setExperiences, expIndex, 'company', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Dates (e.g., Jan 2024 – Present)</Label>
                            <Input value={exp.dates} onChange={e => handleListChange(experiences, setExperiences, expIndex, 'dates', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Location (Optional)</Label>
                            <Input value={exp.location} onChange={e => handleListChange(experiences, setExperiences, expIndex, 'location', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Achievements / Bullets (Max 5)</Label>
                        {exp.bullets.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="p-3 border rounded-md space-y-3 relative">
                                <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 shrink-0" onClick={() => removeBullet(expIndex, bulletIndex)}>
                                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                                </Button>

                                <div className="flex items-center space-x-2">
                                    <Switch id={`use-framework-${expIndex}-${bulletIndex}`} checked={bullet.useFramework} onCheckedChange={(checked) => handleBulletChange(expIndex, bulletIndex, 'useFramework', checked)} />
                                    <Label htmlFor={`use-framework-${expIndex}-${bulletIndex}`}>Use Action-Method-Result Framework</Label>
                                </div>
                                
                                <div className={cn("space-y-4", bullet.useFramework ? 'hidden' : 'block')}>
                                    <Textarea 
                                        value={bullet.text}
                                        onChange={e => handleBulletChange(expIndex, bulletIndex, 'text', e.target.value)}
                                        rows={2}
                                        placeholder={`Action verb -> what you built/solved -> outcome (max 22 words)`}
                                    />
                                </div>
                                
                                <div className={cn("space-y-2", bullet.useFramework ? 'block' : 'hidden')}>
                                    <div className="grid gap-1">
                                        <Label>Action</Label>
                                        <Input placeholder="What did you do?" value={bullet.action} onChange={(e) => handleBulletChange(expIndex, bulletIndex, 'action', e.target.value)} />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>Method</Label>
                                        <Input placeholder="What tools/process did you use?" value={bullet.method} onChange={(e) => handleBulletChange(expIndex, bulletIndex, 'method', e.target.value)} />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>Result</Label>
                                        <Input placeholder="What was the outcome?" value={bullet.result} onChange={(e) => handleBulletChange(expIndex, bulletIndex, 'result', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                         {exp.bullets.length < 5 && <Button variant="outline" size="sm" onClick={() => addBullet(expIndex)}>Add Bullet</Button>}
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addListItem(setExperiences, {role: '', company: '', dates: '', location: '', bullets: [{text: '', useFramework: false, action: '', method: '', result: ''}]})}>Add Experience/Project</Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education">
              <AccordionTrigger>Education</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                 {educations.map((edu, i) => (
                    <div key={i} className="space-y-4 p-4 border rounded-md relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeListItem(setEducations, i)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Degree / Program</Label>
                                <Input value={edu.degree} onChange={e => handleListChange(educations, setEducations, i, 'degree', e.target.value)} />
                            </div>
                             <div className="grid gap-2">
                                <Label>School / University</Label>
                                <Input value={edu.school} onChange={e => handleListChange(educations, setEducations, i, 'school', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="grid gap-2">
                              <Label>Dates</Label>
                              <Input value={edu.dates} onChange={e => handleListChange(educations, setEducations, i, 'dates', e.target.value)} />
                           </div>
                           <div className="grid gap-2">
                              <Label>Location</Label>
                              <Input value={edu.location} onChange={e => handleListChange(educations, setEducations, i, 'location', e.target.value)} />
                           </div>
                        </div>
                    </div>
                ))}
                 <Button variant="outline" onClick={() => addListItem(setEducations, {degree: '', school: '', dates: '', location: ''})}>Add Education</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
        
        <main className="overflow-y-auto p-8 lg:p-12 bg-muted/30">
          <div className="bg-white p-12 shadow-lg mx-auto max-w-4xl font-body text-black" style={{ aspectRatio: '8.5 / 11'}}>
            <div className="text-sm">
                <h1 className="text-3xl font-bold font-headline text-center">{contact.name}</h1>
                <div className="text-center text-xs mt-2 text-gray-600 flex flex-col items-center">
                    <span>{contact.email}</span>
                    <span>{contact.phone}</span>
                    <span>{contact.address}</span>
                </div>
                
                <div className="mt-6">
                    <h2 className="text-sm font-bold font-headline border-b-2 border-black pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                    <p className="text-xs">{summary}</p>
                </div>
                
                 <div className="mt-6">
                    <h2 className="text-sm font-bold font-headline border-b-2 border-black pb-1 mb-2">SKILLS / CORE COMPETENCIES</h2>
                    <p className="text-xs">{skills.split(',').map(s => s.trim()).join(' · ')}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-bold font-headline border-b-2 border-black pb-1 mb-2">EXPERIENCE & PROJECTS</h2>
                    {experiences.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-start">
                                <p className="font-bold">{exp.role} | {exp.company}</p>
                                <p className="font-bold text-right">{exp.dates}</p>
                            </div>
                            <div className="flex justify-between items-start">
                                <p className="italic text-gray-600">{exp.location}</p>
                            </div>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                {exp.bullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex} className="text-xs">{formatBullet(bullet)}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-bold font-headline border-b-2 border-black pb-1 mb-2">EDUCATION</h2>
                    {educations.map((edu, i) => (
                         <div key={i} className="mb-2">
                             <div className="flex justify-between items-start">
                                <p className="font-bold">{edu.degree}</p>
                                <p className="text-right">{edu.dates}</p>
                            </div>
                            <div className="flex justify-between items-start">
                                <p className="italic text-gray-600">{edu.school}</p>
                                <p className="italic text-gray-600 text-right">{edu.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
