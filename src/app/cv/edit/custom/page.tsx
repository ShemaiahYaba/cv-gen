"use client";

import dynamic from "next/dynamic";

// Dynamically import the custom CV editor with no SSR
const CustomCvEditorPage = dynamic(() => import("./page_original"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      Loading editor...
    </div>
  ),
});

export default CustomCvEditorPage;
