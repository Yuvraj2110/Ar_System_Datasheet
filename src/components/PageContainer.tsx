import { ReactNode } from 'react';
import { useOverflowCheck } from '../hooks/useOverflowCheck';
import { AlertTriangle } from 'lucide-react';

interface PageContainerProps {
  children: ReactNode;
  pageNumber: number;
}

export function PageContainer({ children, pageNumber }: PageContainerProps) {
  const { containerRef, isOverflowing } = useOverflowCheck();

  return (
    <div className="datasheet-page">
      {isOverflowing && (
        <div className="page-warning">
          <AlertTriangle size={14} />
          <span>Page {pageNumber}: Content exceeds A4 page limit!</span>
        </div>
      )}
      <div className="page-content-wrapper" ref={containerRef}>
        {children}
      </div>
    </div>
  );
}
