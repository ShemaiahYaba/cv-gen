"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the editor with no SSR
const SkillBasedCvEditor = dynamic(() => import("./editor"), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      Loading editor...
    </div>
  );
}

export default function SkillBasedCvEditorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SkillBasedCvEditor />
    </Suspense>
  );
}
