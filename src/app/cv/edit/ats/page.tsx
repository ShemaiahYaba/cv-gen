
import { Suspense } from 'react';
import AtsCvEditor from './editor';

function Loading() {
    return <div className="flex h-screen items-center justify-center">Loading editor...</div>;
}

export default function AtsCvEditorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AtsCvEditor />
    </Suspense>
  );
}
