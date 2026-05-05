import { DatasheetData } from '../hooks/useDatasheetState';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

interface Props {
  data: DatasheetData;
  showSections: Record<string, boolean>;
}

export function Page1_Overview({ data, showSections }: Props) {
  return (
    <PageContainer pageNumber={1}>
      {/* Header */}
      <div className="header-section">
        <div className="header-left">
          <h1>{data.productName}</h1>
          <p>{data.tagline}</p>
        </div>
        <div className="header-right">
          <div className="model-number">{data.modelNumber}</div>
          <div className="doc-type">{data.docType}</div>
        </div>
      </div>

      <div className="two-column-grid">
        {/* Left Column */}
        <div>
          {showSections.features && (
            <>
              <div className="section-title">Key Features</div>
              <ul className="feature-list">
                {data.features.slice(0, 10).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          {showSections.applications && (
            <>
              <div className="section-title">Applications</div>
              <div className="app-grid">
                {data.applications.slice(0, 6).map((app, idx) => (
                  <div className="app-card" key={idx}>
                    <div style={{ width: 6, height: 6, backgroundColor: 'var(--primary)', borderRadius: '50%' }} />
                    {app}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Column */}
        <div>
          <div className="product-image-container" style={{ height: data.imageStyles.productImage.height, overflow: 'hidden' }}>
            {data.productImage ? (
              <img src={data.productImage} alt={data.productName} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${data.imageStyles.productImage.scale / 100})` }} />
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}>
                [Product Image Placeholder]
                <br />
                <span style={{ fontSize: 10 }}>(Will be an actual image in production)</span>
              </div>
            )}
          </div>
          
          {showSections.description && (
            <>
              <div className="section-title">General Description</div>
              <p className="short-desc">{data.shortDescription}</p>
            </>
          )}
        </div>
      </div>

      <Footer data={data} pageNumber={1} totalPages={3} />
    </PageContainer>
  );
}
