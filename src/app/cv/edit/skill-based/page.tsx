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
import { FileDown, FileText, Share2 } from "lucide-react";
import Link from "next/link";
import { VitaeForgeLogo } from "@/components/icons";

export default function SkillBasedCvEditorPage() {
    const [cvData, setCvData] = useState({
        fullName: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1 234 567 890",
        linkedin: "linkedin.com/in/janedoe",
        github: "github.com/janedoe",
        summary: "A passionate computer science student with a strong foundation in software development and a keen interest in AI and machine learning. Seeking opportunities to apply my skills to real-world challenges.",
        technicalSkills: "Python, JavaScript, React, Node.js, PostgreSQL",
        softSkills: "Teamwork, Communication, Problem-Solving, Leadership",
        projects: "Academic Repository | Role: Lead Developer\n- Built an academic repository using Python & PostgreSQL; enabled 50+ students to access lecture notes online, reducing search time by 40%.",
        education: "B.S. in Computer Science | University of Technology | 2024\n- GPA: 3.8/4.0",
        leadership: "President | Coding Club | 2022-2023\n- Organized weekly meetings and workshops for 50+ members.",
        certifications: "Certified Python Developer | Python Institute | 2022",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({...prev, [name]: value}));
    }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2">
          <VitaeForgeLogo className="h-6 w-6" />
          <span className="font-headline font-semibold">Vitae Forge / Skill-Based Editor</span>
        </Link>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Saved</span>
            <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>
            <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Export PDF
            </Button>
            <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Export DOCX
            </Button>
        </div>
      </header>
      <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
        <aside className="overflow-y-auto p-6 border-r">
          <h2 className="text-2xl font-headline font-bold mb-6">Edit Content</h2>
          <Accordion type="multiple" defaultValue={["personal", "skills"]} className="w-full">
            <AccordionItem value="personal">
              <AccordionTrigger>Personal Info</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" value={cvData.fullName} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={cvData.email} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={cvData.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input id="linkedin" name="linkedin" value={cvData.linkedin} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input id="github" name="github" value={cvData.github} onChange={handleChange} />
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary">
              <AccordionTrigger>Professional Summary</AccordionTrigger>
              <AccordionContent>
                <Textarea placeholder="1-2 sentence self-description" name="summary" value={cvData.summary} onChange={handleChange} rows={3} />
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="skills">
              <AccordionTrigger>Core Skills</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="technicalSkills">Technical Skills</Label>
                    <Textarea placeholder="Comma-separated technical skills" name="technicalSkills" value={cvData.technicalSkills} onChange={handleChange} rows={3} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="softSkills">Soft Skills</Label>
                    <Textarea placeholder="Comma-separated soft skills" name="softSkills" value={cvData.softSkills} onChange={handleChange} rows={3} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="projects">
              <AccordionTrigger>Projects / Initiatives</AccordionTrigger>
              <AccordionContent>
                <Textarea placeholder="Title | Role&#10;- Outcome / metric" name="projects" value={cvData.projects} onChange={handleChange} rows={8} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education">
              <AccordionTrigger>Education</AccordionTrigger>
              <AccordionContent>
                 <Textarea placeholder="Degree | School | Year&#10;- GPA / Honors" name="education" value={cvData.education} onChange={handleChange} rows={4} />
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="leadership">
              <AccordionTrigger>Leadership & Involvement</AccordionTrigger>
              <AccordionContent>
                 <Textarea placeholder="Role | Organization | Timeframe&#10;- Key contribution" name="leadership" value={cvData.leadership} onChange={handleChange} rows={4} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="certifications">
              <AccordionTrigger>Certifications / Awards</AccordionTrigger>
              <AccordionContent>
                 <Textarea placeholder="Name | Issuer | Year" name="certifications" value={cvData.certifications} onChange={handleChange} rows={3} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
        
        <main className="overflow-y-auto p-8 lg:p-12 bg-muted/30">
          <div className="bg-white p-12 shadow-lg mx-auto max-w-4xl font-body text-black" style={{ aspectRatio: '8.5 / 11'}}>
            <h1 className="text-4xl font-bold font-headline text-center mb-2">{cvData.fullName}</h1>
            <div className="flex justify-center text-xs mb-6 space-x-3">
                <span>{cvData.email}</span>
                <span>|</span>
                <span>{cvData.phone}</span>
                <span>|</span>
                <span>{cvData.linkedin}</span>
                <span>|</span>
                <span>{cvData.github}</span>
            </div>
            
            {cvData.summary && <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">Professional Summary</h2>
                <p className="text-sm">{cvData.summary}</p>
            </div>}
            
            <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">Core Skills</h2>
                <p className="text-sm"><strong>Technical:</strong> {cvData.technicalSkills}</p>
                <p className="text-sm"><strong>Soft:</strong> {cvData.softSkills}</p>
            </div>

             <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">Projects</h2>
                <div className="text-sm whitespace-pre-wrap">{cvData.projects}</div>
            </div>

            <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">Education</h2>
                <p className="text-sm whitespace-pre-wrap">{cvData.education}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">Leadership & Involvement</h2>
                <p className="text-sm whitespace-pre-wrap">{cvData.leadership}</p>
            </div>

            <div>
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">Certifications & Awards</h2>
                <p className="text-sm whitespace-pre-wrap">{cvData.certifications}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
