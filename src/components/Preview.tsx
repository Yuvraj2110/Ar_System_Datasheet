import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';
import { DatasheetData } from '../hooks/useDatasheetState';
import { Page1_Overview } from './Page1_Overview';
import { Page2_TechDetails } from './Page2_TechDetails';
import { Page3_Hardware } from './Page3_Hardware';

interface Props {
  data: DatasheetData;
  showSections: Record<string, boolean>;
}

export function Preview({ data, showSections }: Props) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.productName}_Datasheet`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    `,
  });

  return (
    <div className="preview-pane">
      <div className="preview-toolbar">
        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>
          Live A4 Preview (3 Pages Max)
        </div>
        <button className="btn-export" onClick={handlePrint}>
          <Download size={16} /> Export PDF
        </button>
      </div>
      
      <div className="datasheet-document" ref={componentRef}>
        <Page1_Overview data={data} showSections={showSections} />
        <Page2_TechDetails data={data} showSections={showSections} />
        <Page3_Hardware data={data} showSections={showSections} />
      </div>
    </div>
  );
}
