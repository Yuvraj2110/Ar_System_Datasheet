import { DatasheetData } from '../hooks/useDatasheetState';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

interface Props {
  data: DatasheetData;
  showSections: Record<string, boolean>;
}

export function Page3_Hardware({ data, showSections }: Props) {
  return (
    <PageContainer pageNumber={3}>
      <div className="header-section" style={{ paddingBottom: '5px', marginBottom: '15px' }}>
        <h2 style={{ fontSize: 18, color: 'var(--primary)' }}>Hardware & Mechanical</h2>
        <div className="model-number" style={{ fontSize: 14 }}>{data.modelNumber}</div>
      </div>

      {showSections.pinConfig && (
        <>
          <div className="section-title" style={{ marginTop: 0 }}>Pin Configuration</div>
          <div className="pin-config">
            <div className="pin-img" style={{ height: data.imageStyles.connectorImage.height, overflow: 'hidden' }}>
              {data.connectorImage ? (
                <img src={data.connectorImage} alt="Connector" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${data.imageStyles.connectorImage.scale / 100})` }} />
              ) : (
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>[Connector Image]</span>
              )}
            </div>
            <div className="pin-table">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Pin</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pinConfig.slice(0, 10).map((pin, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 'bold' }}>{pin.pin}</td>
                      <td>{pin.name}</td>
                      <td>{pin.type}</td>
                      <td>{pin.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showSections.mechImages && (
        <>
          <div className="section-title">Product Details</div>
          <div className="images-grid">
            <div className="grid-img" style={{ height: data.imageStyles.frontViewImage.height, overflow: 'hidden' }}>
              {data.frontViewImage ? <img src={data.frontViewImage} alt="Front View" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${data.imageStyles.frontViewImage.scale / 100})` }} /> : <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>[Front View]</span>}
            </div>
            <div className="grid-img" style={{ height: data.imageStyles.sideViewImage.height, overflow: 'hidden' }}>
              {data.sideViewImage ? <img src={data.sideViewImage} alt="Side View" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${data.imageStyles.sideViewImage.scale / 100})` }} /> : <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>[Side View]</span>}
            </div>
            <div className="grid-img" style={{ height: data.imageStyles.topViewImage.height, overflow: 'hidden' }}>
              {data.topViewImage ? <img src={data.topViewImage} alt="Top View" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${data.imageStyles.topViewImage.scale / 100})` }} /> : <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>[Top View]</span>}
            </div>
          </div>
        </>
      )}

      {showSections.mechDrawing && (
        <>
          <div className="section-title">Mechanical Dimensions</div>
          <div className="mech-drawing" style={{ height: data.imageStyles.mechDrawingImage.height, overflow: 'hidden' }}>
            {data.mechDrawingImage ? (
              <img src={data.mechDrawingImage} alt="Mechanical Drawing" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${data.imageStyles.mechDrawingImage.scale / 100})` }} />
            ) : (
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>[Mechanical Drawing (mm)]</span>
            )}
          </div>
        </>
      )}

      <Footer data={data} pageNumber={3} totalPages={3} />
    </PageContainer>
  );
}
