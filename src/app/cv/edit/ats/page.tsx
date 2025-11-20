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
import { FileDown, FileText, Save, Share2 } from "lucide-react";
import Link from "next/link";
import { VitaeForgeLogo } from "@/components/icons";

export default function AtsCvEditorPage() {
    const [cvData, setCvData] = useState({
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (123) 456-7890",
        address: "New York, USA",
        summary: "Results-driven software engineer with 5+ years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js.",
        experience: "Software Engineer at TechCorp (2020-Present)\n- Developed and maintained client-side features using React.\n- Collaborated with product teams to define and implement new functionalities.",
        education: "B.S. in Computer Science, University of Technology (2016-2020)",
        skills: "JavaScript, React, Node.js, Python, SQL, Docker",
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
          <span className="font-headline font-semibold">Vitae Forge / ATS Editor</span>
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
          <Accordion type="multiple" defaultValue={["personal", "summary"]} className="w-full">
            <AccordionItem value="personal">
              <AccordionTrigger>Personal Details</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={cvData.name} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={cvData.email} onChange={handleChange} />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={cvData.phone} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={cvData.address} onChange={handleChange} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary">
              <AccordionTrigger>Professional Summary</AccordionTrigger>
              <AccordionContent>
                <Textarea placeholder="Tell us about yourself" name="summary" value={cvData.summary} onChange={handleChange} rows={5} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="experience">
              <AccordionTrigger>Work Experience</AccordionTrigger>
              <AccordionContent>
                <Textarea placeholder="Your work experience" name="experience" value={cvData.experience} onChange={handleChange} rows={8} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education">
              <AccordionTrigger>Education</AccordionTrigger>
              <AccordionContent>
                 <Textarea placeholder="Your education" name="education" value={cvData.education} onChange={handleChange} rows={4} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills">
              <AccordionTrigger>Skills</AccordionTrigger>
              <AccordionContent>
                 <Textarea placeholder="Comma-separated skills" name="skills" value={cvData.skills} onChange={handleChange} rows={3} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
        
        <main className="overflow-y-auto p-8 lg:p-12 bg-muted/30">
          <div className="bg-white p-12 shadow-lg mx-auto max-w-4xl" style={{ aspectRatio: '8.5 / 11'}}>
            <div className="font-body text-black">
                <h1 className="text-4xl font-bold font-headline border-b-2 pb-2 mb-4">{cvData.name}</h1>
                <div className="flex justify-center text-sm mb-6 space-x-4">
                    <span>{cvData.email}</span>
                    <span>{cvData.phone}</span>
                    <span>{cvData.address}</span>
                </div>
                
                <div className="mb-6">
                    <h2 className="text-lg font-bold font-headline border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                    <p className="text-sm whitespace-pre-wrap">{cvData.summary}</p>
                </div>
                
                <div className="mb-6">
                    <h2 className="text-lg font-bold font-headline border-b pb-1 mb-2">WORK EXPERIENCE</h2>
                    <p className="text-sm whitespace-pre-wrap">{cvData.experience}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-bold font-headline border-b pb-1 mb-2">EDUCATION</h2>
                    <p className="text-sm whitespace-pre-wrap">{cvData.education}</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold font-headline border-b pb-1 mb-2">SKILLS</h2>
                    <p className="text-sm">{cvData.skills}</p>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
