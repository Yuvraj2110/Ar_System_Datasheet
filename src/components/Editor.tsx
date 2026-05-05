import { Settings2, Plus, Trash2 } from 'lucide-react';
import { DatasheetData } from '../hooks/useDatasheetState';

interface Props {
  data: DatasheetData;
  updateField: (field: keyof DatasheetData, value: any) => void;
  showSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export function Editor({ data, updateField, showSections, toggleSection }: Props) {
  
  const updateStringArrayItem = (field: 'features' | 'applications' | 'notes', index: number, value: string) => {
    const arr = [...data[field]];
    arr[index] = value;
    updateField(field, arr);
  };

  const addStringArrayItem = (field: 'features' | 'applications' | 'notes') => {
    updateField(field, [...data[field], '']);
  };

  const removeStringArrayItem = (field: 'features' | 'applications' | 'notes', index: number) => {
    const arr = [...data[field]];
    arr.splice(index, 1);
    updateField(field, arr);
  };

  const updateTableItem = (field: keyof DatasheetData, index: number, subField: string, value: string) => {
    const arr = [...(data[field] as any[])];
    arr[index] = { ...arr[index], [subField]: value };
    updateField(field, arr);
  };

  const addTableItem = (field: keyof DatasheetData, emptyItem: any) => {
    updateField(field, [...(data[field] as any[]), emptyItem]);
  };

  const removeTableItem = (field: keyof DatasheetData, index: number) => {
    const arr = [...(data[field] as any[])];
    arr.splice(index, 1);
    updateField(field, arr);
  };

  const handleImageUpload = (field: keyof DatasheetData, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      updateField(field, url);
    }
  };

  const updateImageStyle = (field: keyof DatasheetData['imageStyles'], prop: 'height' | 'scale', value: number) => {
    updateField('imageStyles', {
      ...data.imageStyles,
      [field]: { ...data.imageStyles[field], [prop]: value }
    });
  };

  const renderImageControl = (field: keyof DatasheetData['imageStyles'], label: string, minHeight = 50, maxHeight = 500) => (
    <div className="form-group" style={{ padding: 10, background: 'var(--bg-editor)', border: '1px solid var(--border)', borderRadius: 4, marginBottom: 15 }}>
      <label>{label}</label>
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(field as any, e)} />
      {data[field as keyof DatasheetData] && (
        <div style={{ marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          <button onClick={() => updateField(field as any, '')} style={{ fontSize: 11, color: 'red', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 10, padding: 0 }}>Remove Image</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--secondary)' }}>
                <span>Container Height</span>
                <span>{data.imageStyles[field].height}px</span>
              </div>
              <input type="range" min={minHeight} max={maxHeight} value={data.imageStyles[field].height} onChange={(e) => updateImageStyle(field, 'height', parseInt(e.target.value))} style={{ width: '100%', margin: 0 }} />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--secondary)' }}>
                <span>Image Zoom</span>
                <span>{data.imageStyles[field].scale}%</span>
              </div>
              <input type="range" min={10} max={200} value={data.imageStyles[field].scale} onChange={(e) => updateImageStyle(field, 'scale', parseInt(e.target.value))} style={{ width: '100%', margin: 0 }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="editor-pane">
      <div className="editor-header">
        <h1><Settings2 size={20} /> Datasheet Editor</h1>
      </div>
      
      <div className="editor-content">
        <h3 style={{ marginBottom: 15, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Product Info</h3>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" value={data.productName} onChange={(e) => updateField('productName', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tagline</label>
          <input type="text" value={data.tagline} onChange={(e) => updateField('tagline', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Model Number</label>
          <input type="text" value={data.modelNumber} onChange={(e) => updateField('modelNumber', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Short Description</label>
          <textarea rows={4} value={data.shortDescription} onChange={(e) => updateField('shortDescription', e.target.value)} />
        </div>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Lists</h3>
        <div className="form-group">
          <label>Key Features</label>
          {data.features.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
              <input style={{ flex: 1, fontSize: 11, padding: 4 }} value={item} onChange={e => updateStringArrayItem('features', idx, e.target.value)} />
              <button onClick={() => removeStringArrayItem('features', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red', background: 'none', border: 'none' }}><Trash2 size={12}/></button>
            </div>
          ))}
          <button onClick={() => addStringArrayItem('features')} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--primary)' }}><Plus size={12}/> Add Feature</button>
        </div>
        <div className="form-group">
          <label>Applications</label>
          {data.applications.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
              <input style={{ flex: 1, fontSize: 11, padding: 4 }} value={item} onChange={e => updateStringArrayItem('applications', idx, e.target.value)} />
              <button onClick={() => removeStringArrayItem('applications', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red', background: 'none', border: 'none' }}><Trash2 size={12}/></button>
            </div>
          ))}
          <button onClick={() => addStringArrayItem('applications')} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--primary)' }}><Plus size={12}/> Add Application</button>
        </div>
        <div className="form-group">
          <label>Notes</label>
          {data.notes.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
              <input style={{ flex: 1, fontSize: 11, padding: 4 }} value={item} onChange={e => updateStringArrayItem('notes', idx, e.target.value)} />
              <button onClick={() => removeStringArrayItem('notes', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red', background: 'none', border: 'none' }}><Trash2 size={12}/></button>
            </div>
          ))}
          <button onClick={() => addStringArrayItem('notes')} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--primary)' }}><Plus size={12}/> Add Note</button>
        </div>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Electrical Specs</h3>
        {data.electricalSpecs.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
            <input placeholder="Param" style={{ width: '30%', fontSize: 11, padding: 4 }} value={item.param} onChange={e => updateTableItem('electricalSpecs', idx, 'param', e.target.value)} />
            <input placeholder="Min" style={{ width: '15%', fontSize: 11, padding: 4 }} value={item.min} onChange={e => updateTableItem('electricalSpecs', idx, 'min', e.target.value)} />
            <input placeholder="Typ" style={{ width: '15%', fontSize: 11, padding: 4 }} value={item.typ} onChange={e => updateTableItem('electricalSpecs', idx, 'typ', e.target.value)} />
            <input placeholder="Max" style={{ width: '15%', fontSize: 11, padding: 4 }} value={item.max} onChange={e => updateTableItem('electricalSpecs', idx, 'max', e.target.value)} />
            <input placeholder="Unit" style={{ width: '15%', fontSize: 11, padding: 4 }} value={item.unit} onChange={e => updateTableItem('electricalSpecs', idx, 'unit', e.target.value)} />
            <button onClick={() => removeTableItem('electricalSpecs', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red' }}><Trash2 size={12}/></button>
          </div>
        ))}
        <button onClick={() => addTableItem('electricalSpecs', { param: '', min: '', typ: '', max: '', unit: '' })} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer' }}><Plus size={12}/> Add Row</button>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>System Characteristics</h3>
        {data.systemChars.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
            <input placeholder="Feature" style={{ width: '40%', fontSize: 11, padding: 4 }} value={item.feature} onChange={e => updateTableItem('systemChars', idx, 'feature', e.target.value)} />
            <input placeholder="Description" style={{ width: '50%', fontSize: 11, padding: 4 }} value={item.description} onChange={e => updateTableItem('systemChars', idx, 'description', e.target.value)} />
            <button onClick={() => removeTableItem('systemChars', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red' }}><Trash2 size={12}/></button>
          </div>
        ))}
        <button onClick={() => addTableItem('systemChars', { feature: '', description: '' })} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer' }}><Plus size={12}/> Add Row</button>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Absolute Ratings</h3>
        {data.absoluteRatings.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
            <input placeholder="Param" style={{ width: '40%', fontSize: 11, padding: 4 }} value={item.param} onChange={e => updateTableItem('absoluteRatings', idx, 'param', e.target.value)} />
            <input placeholder="Rating" style={{ width: '30%', fontSize: 11, padding: 4 }} value={item.rating} onChange={e => updateTableItem('absoluteRatings', idx, 'rating', e.target.value)} />
            <input placeholder="Unit" style={{ width: '20%', fontSize: 11, padding: 4 }} value={item.unit} onChange={e => updateTableItem('absoluteRatings', idx, 'unit', e.target.value)} />
            <button onClick={() => removeTableItem('absoluteRatings', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red' }}><Trash2 size={12}/></button>
          </div>
        ))}
        <button onClick={() => addTableItem('absoluteRatings', { param: '', rating: '', unit: '' })} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer' }}><Plus size={12}/> Add Row</button>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Pin Configuration</h3>
        {data.pinConfig.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
            <input placeholder="Pin" style={{ width: '15%', fontSize: 11, padding: 4 }} value={item.pin} onChange={e => updateTableItem('pinConfig', idx, 'pin', e.target.value)} />
            <input placeholder="Name" style={{ width: '25%', fontSize: 11, padding: 4 }} value={item.name} onChange={e => updateTableItem('pinConfig', idx, 'name', e.target.value)} />
            <input placeholder="Type" style={{ width: '20%', fontSize: 11, padding: 4 }} value={item.type} onChange={e => updateTableItem('pinConfig', idx, 'type', e.target.value)} />
            <input placeholder="Desc" style={{ width: '30%', fontSize: 11, padding: 4 }} value={item.desc} onChange={e => updateTableItem('pinConfig', idx, 'desc', e.target.value)} />
            <button onClick={() => removeTableItem('pinConfig', idx)} style={{ cursor: 'pointer', padding: '0 5px', color: 'red' }}><Trash2 size={12}/></button>
          </div>
        ))}
        <button onClick={() => addTableItem('pinConfig', { pin: '', name: '', type: '', desc: '' })} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, cursor: 'pointer' }}><Plus size={12}/> Add Row</button>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Section Toggles</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 15 }}>
          Toggle sections ON/OFF to ensure content fits exactly within 3 A4 pages.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {Object.entries(showSections).map(([key, value]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={value} 
                onChange={() => toggleSection(key)} 
                style={{ width: 'auto', margin: 0 }}
              />
              {key}
            </label>
          ))}
        </div>

        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Images</h3>
        {renderImageControl('productImage', 'Product Image (Overview)', 100, 400)}
        {renderImageControl('connectorImage', 'Connector Image (Pin Config)', 50, 300)}
        {renderImageControl('frontViewImage', 'Front View', 50, 300)}
        {renderImageControl('sideViewImage', 'Side View', 50, 300)}
        {renderImageControl('topViewImage', 'Top View', 50, 300)}
        {renderImageControl('mechDrawingImage', 'Mechanical Drawing', 100, 400)}
        
        <h3 style={{ marginBottom: 15, marginTop: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>Company Info</h3>
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" value={data.companyName} onChange={(e) => updateField('companyName', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="text" value={data.website} onChange={(e) => updateField('website', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact Info</label>
          <input type="text" value={data.contact} onChange={(e) => updateField('contact', e.target.value)} />
        </div>
      </div>
    </div>
  );
}
