
"use client";

import { Suspense } from 'react';
import SkillBasedCvEditor from './editor';

function Loading() {
    return <div className="flex h-screen items-center justify-center">Loading editor...</div>;
}

export default function SkillBasedCvEditorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SkillBasedCvEditor />
    </Suspense>
  );
}
