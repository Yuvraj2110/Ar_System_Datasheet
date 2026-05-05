'use client';

import { useState } from 'react';
import { useDatasheetState } from '../hooks/useDatasheetState';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';

export default function Home() {
  const { data, updateField } = useDatasheetState();
  const [showSections, setShowSections] = useState<Record<string, boolean>>({
    features: true,
    applications: true,
    description: true,
    electricalSpecs: true,
    systemChars: true,
    absoluteRatings: true,
    notes: true,
    pinConfig: true,
    mechImages: true,
    mechDrawing: true,
  });

  const toggleSection = (section: string) => {
    setShowSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="app-container">
      <Editor 
        data={data} 
        updateField={updateField} 
        showSections={showSections}
        toggleSection={toggleSection}
      />
      <Preview 
        data={data} 
        showSections={showSections}
      />
    </div>
  );
}
