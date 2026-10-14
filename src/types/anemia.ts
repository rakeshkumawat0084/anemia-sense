export type BiologicalSex = 'male' | 'female';

export interface PatientInputs {
  patientName: string;
  age: number;
  gender: BiologicalSex;
  isPregnant: boolean;
  hemoglobin: number;
  rbcCount: number;
  hematocrit: number;
  // Advanced optional parameters
  mcv?: number; // Mean Corpuscular Volume (fL)
  ferritin?: number; // ng/mL
  symptoms: string[];
}

export type AnemiaSeverity = 'Normal' | 'Mild' | 'Moderate' | 'Severe';

export interface PredictionResult {
  prediction: 0 | 1; // 0: Normal, 1: Anemia
  result_text: string;
  is_anemia: boolean;
  confidence: number;
  probabilities: {
    normal: number;
    anemia: number;
  };
  severity: AnemiaSeverity;
  severityColor: 'emerald' | 'amber' | 'rose' | 'red';
  riskLevel: string;
  thresholdUsed: number;
  morphology?: string;
  clinicalInterpretation: string;
  timestamp: string;
  inputs: {
    hemoglobin: number;
    rbc_count: number;
    hematocrit: number;
    gender: string;
    isPregnant: boolean;
  };
}

export interface PresetCase {
  id: string;
  title: string;
  description: string;
  gender: BiologicalSex;
  isPregnant: boolean;
  age: number;
  hemoglobin: number;
  rbcCount: number;
  hematocrit: number;
  mcv: number;
  ferritin: number;
  symptoms: string[];
  expectedResult: string;
}

export interface DietaryItem {
  id: string;
  name: string;
  localName?: string;
  category: 'heme' | 'non-heme' | 'enhancer' | 'inhibitor';
  ironContent: string;
  servingSize: string;
  notes: string;
  tag: string;
}

export interface RepoFile {
  name: string;
  path: string;
  language: string;
  content: string;
  description: string;
}
