// src/components/dashboard/cv-card.tsx - Updated to use new hooks
"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Pencil,
  FileDown,
  Trash2,
  FileText,
  Star,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { useDeleteCv, useDuplicateCv, useToggleFavorite } from "@/hooks/use-cv";
import type { CvData } from "@/models/cv.model";
import { formatDistanceToNow } from "date-fns";

interface CvCardProps {
  cv: CvData;
}

export function CvCard({ cv }: CvCardProps) {
  const deleteCv = useDeleteCv();
  const duplicateCv = useDuplicateCv();
  const toggleFavorite = useToggleFavorite();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this CV?")) {
      deleteCv.mutate(cv.id);
    }
  };

  const handleDuplicate = () => {
    duplicateCv.mutate(cv.id);
  };

  const handleToggleFavorite = () => {
    toggleFavorite.mutate({ id: cv.id, isFavorite: !cv.isFavorite });
  };

  return (
    <Card className="group flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-muted p-3 rounded-md">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  <Link href={`/cv/edit/${cv.cvType}?id=${cv.id}`}>
                    {cv.title}
                  </Link>
                </CardTitle>
                {cv.isFavorite && (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                )}
              </div>
              <CardDescription>
                Last modified:{" "}
                {formatDistanceToNow(cv.updatedAt, { addSuffix: true })}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/cv/edit/${cv.cvType}?id=${cv.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleFavorite}>
                <Star className="mr-2 h-4 w-4" />
                {cv.isFavorite ? "Remove from favorites" : "Add to favorites"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter>
        <Badge variant="outline">{cv.cvType.toUpperCase()} CV</Badge>
      </CardFooter>
    </Card>
  );
}
