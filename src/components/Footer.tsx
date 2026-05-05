import { DatasheetData } from '../hooks/useDatasheetState';

interface FooterProps {
  data: DatasheetData;
  pageNumber: number;
  totalPages: number;
}

export function Footer({ data, pageNumber, totalPages }: FooterProps) {
  return (
    <div className="page-footer">
      <div>{data.companyName} | {data.website}</div>
      <div>{data.docType} - {data.modelNumber}</div>
      <div>Page {pageNumber} of {totalPages}</div>
    </div>
  );
}
