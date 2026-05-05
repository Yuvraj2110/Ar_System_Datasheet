import { DatasheetData } from '../hooks/useDatasheetState';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

interface Props {
  data: DatasheetData;
  showSections: Record<string, boolean>;
}

export function Page2_TechDetails({ data, showSections }: Props) {
  return (
    <PageContainer pageNumber={2}>
      <div className="header-section" style={{ paddingBottom: '5px', marginBottom: '15px' }}>
        <h2 style={{ fontSize: 18, color: 'var(--primary)' }}>Technical Specifications</h2>
        <div className="model-number" style={{ fontSize: 14 }}>{data.modelNumber}</div>
      </div>

      {showSections.electricalSpecs && (
        <div className="spec-table-container">
          <div className="section-title" style={{ marginTop: 0 }}>Electrical Characteristics</div>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Min</th>
                <th>Typ</th>
                <th>Max</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {data.electricalSpecs.slice(0, 15).map((spec, idx) => (
                <tr key={idx}>
                  <td>{spec.param}</td>
                  <td>{spec.min}</td>
                  <td>{spec.typ}</td>
                  <td>{spec.max}</td>
                  <td>{spec.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSections.systemChars && (
        <div className="spec-table-container">
          <div className="section-title">System Characteristics</div>
          <table className="spec-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Feature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.systemChars.slice(0, 12).map((char, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{char.feature}</td>
                  <td>{char.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSections.absoluteRatings && (
        <div className="spec-table-container">
          <div className="section-title">Absolute Maximum Ratings</div>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Rating</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {data.absoluteRatings.slice(0, 10).map((rating, idx) => (
                <tr key={idx}>
                  <td>{rating.param}</td>
                  <td>{rating.rating}</td>
                  <td>{rating.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSections.notes && (
        <div className="notes-section">
          <strong>Notes:</strong>
          {data.notes.map((note, idx) => (
            <p key={idx}>{note}</p>
          ))}
        </div>
      )}

      <Footer data={data} pageNumber={2} totalPages={3} />
    </PageContainer>
  );
}
