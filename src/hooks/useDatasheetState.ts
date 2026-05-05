import { useState } from 'react';

export type DatasheetData = {
  productName: string;
  tagline: string;
  modelNumber: string;
  docType: string;
  features: string[];
  applications: string[];
  shortDescription: string;
  electricalSpecs: { param: string; min: string; typ: string; max: string; unit: string }[];
  systemChars: { feature: string; description: string }[];
  absoluteRatings: { param: string; rating: string; unit: string }[];
  notes: string[];
  pinConfig: { pin: string; name: string; type: string; desc: string }[];
  companyName: string;
  website: string;
  contact: string;
  productImage: string;
  connectorImage: string;
  frontViewImage: string;
  sideViewImage: string;
  topViewImage: string;
  mechDrawingImage: string;
  imageStyles: {
    productImage: { height: number; scale: number };
    connectorImage: { height: number; scale: number };
    frontViewImage: { height: number; scale: number };
    sideViewImage: { height: number; scale: number };
    topViewImage: { height: number; scale: number };
    mechDrawingImage: { height: number; scale: number };
  };
};

const initialData: DatasheetData = {
  productName: 'AX-9000 Industrial Controller',
  tagline: 'High-Performance Multi-Axis Motion Control System',
  modelNumber: 'AX-9000-V2',
  docType: 'PRODUCT DATASHEET',
  features: [
    'Up to 8 axes of synchronized motion control',
    'Sub-millisecond loop update rates (250µs)',
    'Integrated EtherCAT master for real-time fieldbus',
    'Dual Gigabit Ethernet interfaces',
    'Hardware-based floating point unit (FPU)',
    'Wide operating temperature: -40°C to +85°C',
    'Conformal coating for harsh environments',
    'Comprehensive diagnostic LEDs and status monitoring'
  ],
  applications: [
    'Automated Test Equipment (ATE)',
    'Semiconductor Manufacturing',
    'Robotics & Articulated Arms',
    'Packaging Machinery',
    'CNC Machining Centers',
    'Special Purpose Machines (SPM)'
  ],
  shortDescription: 'The AX-9000 is a ruggedized, highly responsive motion controller designed for mission-critical industrial applications. With an integrated EtherCAT master and support for high-speed deterministic control, it serves as the central brain for complex automated systems, offering unparalleled precision and reliability in extreme conditions.',
  electricalSpecs: [
    { param: 'Supply Voltage (Vcc)', min: '18', typ: '24', max: '36', unit: 'VDC' },
    { param: 'Current Consumption', min: '-', typ: '1.2', max: '2.5', unit: 'A' },
    { param: 'Digital Input Voltage', min: '0', typ: '24', max: '30', unit: 'VDC' },
    { param: 'Analog Input Range', min: '-10', typ: '-', max: '+10', unit: 'V' },
    { param: 'Output Drive Current', min: '-', typ: '500', max: '-', unit: 'mA/ch' },
  ],
  systemChars: [
    { feature: 'Processor', description: 'Dual-core ARM Cortex-A9 @ 1GHz' },
    { feature: 'Memory', description: '1GB DDR3 RAM, 4GB eMMC Flash' },
    { feature: 'Network Protocols', description: 'EtherCAT, Modbus TCP, PROFINET' },
    { feature: 'Safety', description: 'SIL3 / PLe compliant Safe Torque Off (STO)' },
  ],
  absoluteRatings: [
    { param: 'Storage Temperature', rating: '-40 to +105', unit: '°C' },
    { param: 'Operating Humidity', rating: '5 to 95', unit: '% RH' },
    { param: 'Shock Resistance', rating: '50', unit: 'G (11ms)' },
    { param: 'Vibration', rating: '5', unit: 'G (10-500Hz)' },
  ],
  notes: [
    '1. Specifications are subject to change without notice.',
    '2. Typical values are measured at nominal supply voltage and 25°C ambient temperature.',
    '3. Absolute maximum ratings indicate limits beyond which damage to the device may occur.'
  ],
  pinConfig: [
    { pin: '1', name: 'VCC', type: 'Power', desc: '24VDC Power Supply Input' },
    { pin: '2', name: 'GND', type: 'Power', desc: 'Power Ground' },
    { pin: '3', name: 'DIN_0', type: 'Input', desc: 'Digital Input 0 (High Speed)' },
    { pin: '4', name: 'DIN_1', type: 'Input', desc: 'Digital Input 1 (High Speed)' },
    { pin: '5', name: 'DOUT_0', type: 'Output', desc: 'Digital Output 0 (500mA max)' },
  ],
  companyName: 'AR Systems Inc.',
  website: 'www.arsystems.com',
  contact: 'sales@arsystems.com | +1 (800) 555-0199',
  productImage: '',
  connectorImage: '',
  frontViewImage: '',
  sideViewImage: '',
  topViewImage: '',
  mechDrawingImage: '',
  imageStyles: {
    productImage: { height: 250, scale: 100 },
    connectorImage: { height: 150, scale: 100 },
    frontViewImage: { height: 140, scale: 100 },
    sideViewImage: { height: 140, scale: 100 },
    topViewImage: { height: 140, scale: 100 },
    mechDrawingImage: { height: 250, scale: 100 },
  },
};

export function useDatasheetState() {
  const [data, setData] = useState<DatasheetData>(initialData);

  const updateField = (field: keyof DatasheetData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return { data, updateField };
}
