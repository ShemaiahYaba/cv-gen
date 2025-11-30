"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
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
} from "@/components/ui/dropdown-menu";
import {
  FileDown,
  FileText,
  Trash2,
  Save,
  LayoutDashboard,
  Printer,
  FileImage,
  MoreHorizontal,
  Eye,
  Pencil,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Form2CVLogo } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  getSkillBasedTemplateData,
  SkillBasedCvTemplate,
} from "@/lib/cv-templates";
import {
  exportToPdfAdvanced,
  generatePdfFilename,
} from "@/lib/pdf-export-advanced";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cvController } from "@/controllers/cv.controller";

// Type definitions for structured CV data
type Project = {
  name: string;
  role: string;
  tools: string;
  impact: string;
  useStar: boolean;
  situation: string;
  task: string;
  action: string;
  result: string;
};

type Education = {
  degree: string;
  school: string;
  year: string;
  honors: string;
};

type Leadership = {
  role: string;
  organization: string;
  timeframe: string;
  contribution: string;
  useStar: boolean;
  situation: string;
  task: string;
  action: string;
  result: string;
};

type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export default function SkillBasedCvEditor() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [initialData, setInitialData] = useState<SkillBasedCvTemplate | null>(
    null
  );

  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState({ technical: "", soft: "" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  // Add this at the top of your SkillBasedCvEditor component
  const id = searchParams.get("id");

  useEffect(() => {
    const loadCvData = async () => {
      try {
        if (id) {
          const cvData = await cvController.getCv(id);
          if (cvData) {
            // Set all the state from cvData.content
            const content = cvData.content;
            setPersonal(content.personal);
            setSummary(content.summary);
            setSkills(content.skills);
            setProjects(content.projects);
            setEducation(content.education);
            setLeadership(content.leadership);
            setCertifications(content.certifications);
          }
        } else if (templateId) {
          const template = getSkillBasedTemplateData(templateId);
          setInitialData(template);
        }
      } catch (error) {
        console.error("Error loading CV data:", error);
        // Handle error (e.g., show error toast)
      }
    };

    loadCvData();
  }, [id, templateId]);

  useEffect(() => {
    const data = getSkillBasedTemplateData(templateId || "student-skill-based");
    setInitialData(data);
  }, [templateId]);

  useEffect(() => {
    if (initialData) {
      setPersonal(initialData.personal);
      setSummary(initialData.summary);
      setSkills(initialData.skills);
      setProjects(
        initialData.projects.map((p) => ({
          ...p,
          useStar: false,
          situation: "",
          task: "",
          action: "",
          result: "",
        }))
      );
      setEducation(initialData.education);
      setLeadership(
        initialData.leadership.map((l) => ({
          ...l,
          useStar: false,
          situation: "",
          task: "",
          action: "",
          result: "",
        }))
      );
      setCertifications(initialData.certifications);
    }
  }, [initialData]);

  const handleListChange = <T,>(
    list: T[],
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    field: keyof T,
    value: string | boolean
  ) => {
    const updatedList = [...list];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setList(updatedList);
  };

  const addListItem = <T,>(
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    newItem: T
  ) => {
    setList((prev) => [...prev, newItem]);
  };

  const removeListItem = <T,>(
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    index: number
  ) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const formatProjectBullet = (proj: Project) => {
    if (proj.useStar) {
      let bullet = "";
      if (proj.situation) bullet += `${proj.situation}. `;
      if (proj.task) bullet += `${proj.task}. `;
      if (proj.action)
        bullet += `Took initiative by ${
          proj.action.charAt(0).toLowerCase() + proj.action.slice(1)
        }. `;
      if (proj.result)
        bullet += `This resulted in ${
          proj.result.charAt(0).toLowerCase() + proj.result.slice(1)
        }.`;
      return bullet.trim();
    }
    return `Developed a ${proj.name.toLowerCase()}, which ${
      proj.impact.charAt(0).toLowerCase() + proj.impact.slice(1)
    }`;
  };

  const formatLeadershipBullet = (item: Leadership) => {
    if (item.useStar) {
      let bullet = "";
      if (item.situation) bullet += `${item.situation}. `;
      if (item.task) bullet += `${item.task}. `;
      if (item.action)
        bullet += `Took initiative by ${
          item.action.charAt(0).toLowerCase() + item.action.slice(1)
        }. `;
      if (item.result)
        bullet += `This resulted in ${
          item.result.charAt(0).toLowerCase() + item.result.slice(1)
        }.`;
      return bullet.trim();
    }
    return item.contribution;
  };

  const handleExportPdf = async () => {
    if (!cvPreviewRef.current) return;

    setIsExporting(true);
    let originalStyles = {};

    try {
      const element = cvPreviewRef.current;

      originalStyles = {
        position: element.style.position,
        visibility: element.style.visibility,
        opacity: element.style.opacity,
        height: element.style.height,
        width: element.style.width,
        overflow: element.style.overflow,
      };

      element.style.position = "relative";
      element.style.visibility = "visible";
      element.style.opacity = "1";
      element.style.height = "auto";
      element.style.width = "100%";
      element.style.overflow = "visible";

      const reflow = element.offsetHeight;

      await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filename = generatePdfFilename(personal.fullName);
      await exportToPdfAdvanced(element, filename);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      if (cvPreviewRef.current && Object.keys(originalStyles).length > 0) {
        Object.assign(cvPreviewRef.current.style, originalStyles);
      }
      setIsExporting(false);
    }
  };

  if (!initialData) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Form2CVLogo className="h-6 w-6" />
            <span className="font-headline font-semibold hidden sm:inline">
              Form2CV
            </span>
          </Link>
          <span className="text-muted-foreground hidden sm:inline">/</span>
          <span className="font-semibold">Skill-Based Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
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
                <Button size="sm" disabled={isExporting}>
                  {isExporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="mr-2 h-4 w-4" />
                  )}
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleExportPdf}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  <span>
                    {isExporting ? "Generating PDF..." : "Export as PDF"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Export as DOCX</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <FileImage className="mr-2 h-4 w-4" />
                  <span>Export as Image</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="md:hidden">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowExportModal(true)}
                disabled={isExporting}
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </>
            )}
          </Button>
        </div>
      </header>
      <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
        <aside
          className={cn(
            "overflow-y-auto p-6 md:p-8 border-r",
            "md:block",
            showPreview ? "hidden" : "block"
          )}
        >
          <h2 className="text-2xl font-headline font-bold mb-6">
            Edit Content
          </h2>
          <Accordion
            type="multiple"
            defaultValue={["personal", "skills"]}
            className="w-full space-y-4"
          >
            <AccordionItem value="personal">
              <AccordionTrigger>Personal Info</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personal.fullName}
                    onChange={(e) =>
                      setPersonal((p) => ({ ...p, fullName: e.target.value }))
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personal.email}
                      onChange={(e) =>
                        setPersonal((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personal.phone}
                      onChange={(e) =>
                        setPersonal((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={personal.linkedin}
                      onChange={(e) =>
                        setPersonal((p) => ({ ...p, linkedin: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={personal.github}
                      onChange={(e) =>
                        setPersonal((p) => ({ ...p, github: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary">
              <AccordionTrigger>Professional Summary</AccordionTrigger>
              <AccordionContent className="pt-4">
                <Textarea
                  placeholder="1-2 sentence self-description"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills">
              <AccordionTrigger>Core Skills</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <Textarea
                    placeholder="Comma-separated technical skills"
                    value={skills.technical}
                    onChange={(e) =>
                      setSkills((s) => ({ ...s, technical: e.target.value }))
                    }
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="softSkills">Soft Skills</Label>
                  <Textarea
                    placeholder="Comma-separated soft skills"
                    value={skills.soft}
                    onChange={(e) =>
                      setSkills((s) => ({ ...s, soft: e.target.value }))
                    }
                    rows={3}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="projects">
              <AccordionTrigger>Projects / Initiatives</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className="space-y-4 p-4 border rounded-md relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => removeListItem(setProjects, i)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <div className="grid gap-2">
                      <Label>Project Name</Label>
                      <Input
                        value={proj.name}
                        onChange={(e) =>
                          handleListChange(
                            projects,
                            setProjects,
                            i,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Role</Label>
                      <Input
                        value={proj.role}
                        onChange={(e) =>
                          handleListChange(
                            projects,
                            setProjects,
                            i,
                            "role",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Tools Used</Label>
                      <Input
                        value={proj.tools}
                        onChange={(e) =>
                          handleListChange(
                            projects,
                            setProjects,
                            i,
                            "tools",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Switch
                        id={`project-star-switch-${i}`}
                        checked={proj.useStar}
                        onCheckedChange={(checked) =>
                          handleListChange(
                            projects,
                            setProjects,
                            i,
                            "useStar",
                            checked
                          )
                        }
                      />
                      <Label htmlFor={`project-star-switch-${i}`}>
                        Use STAR Framework Input
                      </Label>
                    </div>
                    <div
                      className={cn(
                        "space-y-4",
                        proj.useStar ? "hidden" : "block"
                      )}
                    >
                      <div className="grid gap-2">
                        <Label>Impact / Outcome</Label>
                        <Textarea
                          value={proj.impact}
                          onChange={(e) =>
                            handleListChange(
                              projects,
                              setProjects,
                              i,
                              "impact",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                    <div
                      className={cn(
                        "space-y-4",
                        proj.useStar ? "block" : "hidden"
                      )}
                    >
                      <div className="grid gap-2">
                        <Label>Situation</Label>
                        <Textarea
                          placeholder="What was the context?"
                          value={proj.situation}
                          onChange={(e) =>
                            handleListChange(
                              projects,
                              setProjects,
                              i,
                              "situation",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Task</Label>
                        <Textarea
                          placeholder="What was your responsibility?"
                          value={proj.task}
                          onChange={(e) =>
                            handleListChange(
                              projects,
                              setProjects,
                              i,
                              "task",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Action</Label>
                        <Textarea
                          placeholder="What steps did you take?"
                          value={proj.action}
                          onChange={(e) =>
                            handleListChange(
                              projects,
                              setProjects,
                              i,
                              "action",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Result</Label>
                        <Textarea
                          placeholder="What was the outcome?"
                          value={proj.result}
                          onChange={(e) =>
                            handleListChange(
                              projects,
                              setProjects,
                              i,
                              "result",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addListItem(setProjects, {
                      name: "",
                      role: "",
                      tools: "",
                      impact: "",
                      useStar: false,
                      situation: "",
                      task: "",
                      action: "",
                      result: "",
                    })
                  }
                >
                  Add Project
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education">
              <AccordionTrigger>Education</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="space-y-4 p-4 border rounded-md relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => removeListItem(setEducation, i)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <div className="grid gap-2">
                      <Label>Degree / Program</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          handleListChange(
                            education,
                            setEducation,
                            i,
                            "degree",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>School / University</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) =>
                          handleListChange(
                            education,
                            setEducation,
                            i,
                            "school",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Graduation Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) =>
                            handleListChange(
                              education,
                              setEducation,
                              i,
                              "year",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>GPA / Honors (Optional)</Label>
                        <Input
                          value={edu.honors}
                          onChange={(e) =>
                            handleListChange(
                              education,
                              setEducation,
                              i,
                              "honors",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addListItem(setEducation, {
                      degree: "",
                      school: "",
                      year: "",
                      honors: "",
                    })
                  }
                >
                  Add Education
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="leadership">
              <AccordionTrigger>Leadership & Involvement</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {leadership.map((item, i) => (
                  <div
                    key={i}
                    className="space-y-4 p-4 border rounded-md relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => removeListItem(setLeadership, i)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <div className="grid gap-2">
                      <Label>Role</Label>
                      <Input
                        value={item.role}
                        onChange={(e) =>
                          handleListChange(
                            leadership,
                            setLeadership,
                            i,
                            "role",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Organization</Label>
                      <Input
                        value={item.organization}
                        onChange={(e) =>
                          handleListChange(
                            leadership,
                            setLeadership,
                            i,
                            "organization",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Timeframe</Label>
                      <Input
                        value={item.timeframe}
                        onChange={(e) =>
                          handleListChange(
                            leadership,
                            setLeadership,
                            i,
                            "timeframe",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Switch
                        id={`leadership-star-switch-${i}`}
                        checked={item.useStar}
                        onCheckedChange={(checked) =>
                          handleListChange(
                            leadership,
                            setLeadership,
                            i,
                            "useStar",
                            checked
                          )
                        }
                      />
                      <Label htmlFor={`leadership-star-switch-${i}`}>
                        Use STAR Framework Input
                      </Label>
                    </div>
                    <div
                      className={cn(
                        "space-y-4",
                        item.useStar ? "hidden" : "block"
                      )}
                    >
                      <div className="grid gap-2">
                        <Label>Key Contribution</Label>
                        <Textarea
                          value={item.contribution}
                          onChange={(e) =>
                            handleListChange(
                              leadership,
                              setLeadership,
                              i,
                              "contribution",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                    <div
                      className={cn(
                        "space-y-4",
                        item.useStar ? "block" : "hidden"
                      )}
                    >
                      <div className="grid gap-2">
                        <Label>Situation</Label>
                        <Textarea
                          placeholder="What was the context?"
                          value={item.situation}
                          onChange={(e) =>
                            handleListChange(
                              leadership,
                              setLeadership,
                              i,
                              "situation",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Task</Label>
                        <Textarea
                          placeholder="What was your responsibility?"
                          value={item.task}
                          onChange={(e) =>
                            handleListChange(
                              leadership,
                              setLeadership,
                              i,
                              "task",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Action</Label>
                        <Textarea
                          placeholder="What steps did you take?"
                          value={item.action}
                          onChange={(e) =>
                            handleListChange(
                              leadership,
                              setLeadership,
                              i,
                              "action",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Result</Label>
                        <Textarea
                          placeholder="What was the outcome?"
                          value={item.result}
                          onChange={(e) =>
                            handleListChange(
                              leadership,
                              setLeadership,
                              i,
                              "result",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addListItem(setLeadership, {
                      role: "",
                      organization: "",
                      timeframe: "",
                      contribution: "",
                      useStar: false,
                      situation: "",
                      task: "",
                      action: "",
                      result: "",
                    })
                  }
                >
                  Add Involvement
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="certifications">
              <AccordionTrigger>Certifications & Awards</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="space-y-4 p-4 border rounded-md relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => removeListItem(setCertifications, i)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <div className="grid gap-2">
                      <Label>Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) =>
                          handleListChange(
                            certifications,
                            setCertifications,
                            i,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Issuer</Label>
                        <Input
                          value={cert.issuer}
                          onChange={(e) =>
                            handleListChange(
                              certifications,
                              setCertifications,
                              i,
                              "issuer",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Year</Label>
                        <Input
                          value={cert.year}
                          onChange={(e) =>
                            handleListChange(
                              certifications,
                              setCertifications,
                              i,
                              "year",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addListItem(setCertifications, {
                      name: "",
                      issuer: "",
                      year: "",
                    })
                  }
                >
                  Add Certification
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        <main
          className={cn(
            "overflow-y-auto p-8 lg:p-12 bg-muted/30",
            "md:block",
            showPreview ? "block" : "hidden"
          )}
        >
          <div
            ref={cvPreviewRef}
            className="bg-white p-12 shadow-lg mx-auto max-w-4xl font-body text-black"
            style={{ minHeight: "11in" }}
          >
            <h1 className="text-4xl font-bold font-headline text-center mb-2">
              {personal.fullName}
            </h1>
            <div className="flex flex-col items-center text-xs mb-6 space-y-1">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.linkedin && <span>{personal.linkedin}</span>}
              {personal.github && <span>{personal.github}</span>}
            </div>

            {summary && (
              <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm">{summary}</p>
              </div>
            )}

            {(skills.technical || skills.soft) && (
              <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">
                  Core Skills
                </h2>
                {skills.technical && (
                  <p className="text-sm">
                    <strong>Technical:</strong> {skills.technical}
                  </p>
                )}
                {skills.soft && (
                  <p className="text-sm">
                    <strong>Soft:</strong> {skills.soft}
                  </p>
                )}
              </div>
            )}

            {projects.length > 0 && projects[0].name && (
              <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">
                  Projects
                </h2>
                {projects.map((proj, i) =>
                  proj.name ? (
                    <div key={i} className="text-sm mb-2">
                      <p>
                        <strong>{proj.name}</strong>{" "}
                        {proj.tools && `(${proj.tools})`} | <em>{proj.role}</em>
                      </p>
                      <p className="whitespace-pre-wrap">
                        - {formatProjectBullet(proj)}
                      </p>
                    </div>
                  ) : null
                )}
              </div>
            )}

            {education.length > 0 && education[0].degree && (
              <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">
                  Education
                </h2>
                {education.map(
                  (edu, i) =>
                    edu.degree && (
                      <div key={i} className="text-sm mb-2">
                        <p>
                          {edu.degree} | {edu.school} | {edu.year}
                        </p>
                        {edu.honors && (
                          <p className="whitespace-pre-wrap">- {edu.honors}</p>
                        )}
                      </div>
                    )
                )}
              </div>
            )}

            {leadership.length > 0 && leadership[0].role && (
              <div className="mb-6">
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">
                  Leadership & Involvement
                </h2>
                {leadership.map(
                  (item, i) =>
                    item.role && (
                      <div key={i} className="text-sm mb-2">
                        <p>
                          {item.role} | {item.organization} | {item.timeframe}
                        </p>
                        <p className="whitespace-pre-wrap">
                          - {formatLeadershipBullet(item)}
                        </p>
                      </div>
                    )
                )}
              </div>
            )}

            {certifications.length > 0 && certifications[0].name && (
              <div>
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider border-b pb-1 mb-2">
                  Certifications & Awards
                </h2>
                {certifications.map(
                  (cert, i) =>
                    cert.name && (
                      <p key={i} className="text-sm">
                        {cert.name} | {cert.issuer} | {cert.year}
                      </p>
                    )
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Your CV</DialogTitle>
            <DialogDescription>
              Choose your preferred export format
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-4"
              onClick={() => {
                setShowExportModal(false);
                handleExportPdf();
              }}
              disabled={isExporting}
            >
              <div className="flex items-start gap-3 text-left">
                {isExporting ? (
                  <Loader2 className="h-5 w-5 mt-0.5 animate-spin shrink-0" />
                ) : (
                  <FileText className="h-5 w-5 mt-0.5 shrink-0" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">
                    {isExporting ? "Generating PDF..." : "Export as PDF"}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal">
                    Download your CV as a PDF document
                  </span>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto py-4"
              disabled
            >
              <div className="flex items-start gap-3 text-left">
                <FileText className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Export as DOCX</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    Coming soon
                  </span>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto py-4"
              disabled
            >
              <div className="flex items-start gap-3 text-left">
                <FileImage className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Export as Image</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    Coming soon
                  </span>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
