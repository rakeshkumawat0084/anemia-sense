import React from 'react';
import { PredictionResult, PatientInputs } from '../types/anemia';
import { Printer, X, HeartPulse, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface MedicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PredictionResult;
  patient: PatientInputs;
}

export const MedicalReportModal: React.FC<MedicalReportModalProps> = ({
  isOpen,
  onClose,
  result,
  patient
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isAnemia = result.is_anemia;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-4 sm:px-6 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Clinical Assessment Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-slate-700"
            >
              <span>← Back</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-4 sm:p-8 sm:p-10 space-y-5 sm:space-y-6 bg-white text-slate-900 font-sans" id="printable-report">
          {/* Clinic Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-slate-900 pb-4 sm:pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded bg-teal-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  AS
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  AnemiaSense Clinical Laboratory
                </h1>
              </div>
              <p className="text-xs text-slate-500">
                Machine Learning Assisted Hematology & Complete Blood Count Risk Evaluation
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Accreditation Standards: WHO Guideline on Hemoglobin Concentrations · ISO/IEC 15189
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <div>
                <span className="text-slate-400">Report No: </span>
                <span className="font-mono font-bold text-slate-800">
                  AS-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Date: </span>
                <span className="font-semibold text-slate-800">{result.timestamp}</span>
              </div>
              <div>
                <span className="text-slate-400">Analysis Engine: </span>
                <span className="font-semibold text-teal-800">RandomForest v1.3</span>
              </div>
            </div>
          </div>

          {/* Patient Details Card */}
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm">
                {patient.patientName || 'Anonymous Patient'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Age &amp; Sex</span>
              <span className="font-bold text-slate-900">
                {patient.age} Yrs · {patient.gender === 'male' ? 'Male' : 'Female'}
                {patient.isPregnant ? ' (Pregnant)' : ''}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Evaluation Model</span>
              <span className="font-bold text-slate-900">Adult CBC Screening</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Diagnostic Status</span>
              <span className={`font-bold ${isAnemia ? 'text-rose-700' : 'text-emerald-700'}`}>
                {isAnemia ? 'POSITIVE (Anemia)' : 'NEGATIVE (Normal)'}
              </span>
            </div>
          </div>

          {/* Hematology CBC Parameter Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Complete Blood Count (CBC) Parameters Tested
            </h3>
            <div className="overflow-x-auto -mx-1 sm:mx-0 border border-slate-200 rounded-lg">
              <table className="min-w-[500px] w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Test Parameter</th>
                    <th className="py-2.5 px-3">Observed Value</th>
                    <th className="py-2.5 px-3">Standard Reference Range</th>
                    <th className="py-2.5 px-3">Flag / Clinical Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Hemoglobin (Hb)</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {patient.hemoglobin.toFixed(1)} g/dL
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {patient.gender === 'male' ? '13.0 – 17.5 g/dL' : patient.isPregnant ? '11.0 – 15.0 g/dL' : '12.0 – 15.5 g/dL'}
                  </td>
                  <td className="py-2.5 px-3">
                    {patient.hemoglobin < result.thresholdUsed ? (
                      <span className="text-rose-700 font-bold">LOW (ABNORMAL)</span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">NORMAL</span>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Red Blood Cell (RBC) Count</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {patient.rbcCount.toFixed(2)} million/mcL
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {patient.gender === 'male' ? '4.50 – 5.90 m/mcL' : '4.00 – 5.20 m/mcL'}
                  </td>
                  <td className="py-2.5 px-3">
                    {patient.rbcCount < (patient.gender === 'male' ? 4.5 : 4.0) ? (
                      <span className="text-amber-700 font-bold">LOW</span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">NORMAL</span>
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Hematocrit (HCT / PCV)</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {patient.hematocrit.toFixed(1)} %
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {patient.gender === 'male' ? '40.0 – 50.0 %' : '36.0 – 46.0 %'}
                  </td>
                  <td className="py-2.5 px-3">
                    {patient.hematocrit < 36.0 ? (
                      <span className="text-rose-700 font-bold">LOW</span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">NORMAL</span>
                    )}
                  </td>
                </tr>

                {patient.mcv && (
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Mean Corpuscular Volume (MCV)</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {patient.mcv} fL
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">80 – 100 fL</td>
                    <td className="py-2.5 px-3">
                      {patient.mcv < 80 ? (
                        <span className="text-rose-700 font-bold">MICROCYTIC</span>
                      ) : patient.mcv > 100 ? (
                        <span className="text-indigo-700 font-bold">MACROCYTIC</span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">NORMOCYTIC</span>
                      )}
                    </td>
                  </tr>
                )}

                {patient.ferritin && (
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Serum Ferritin</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {patient.ferritin} ng/mL
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">15 – 200 ng/mL</td>
                    <td className="py-2.5 px-3">
                      {patient.ferritin < 15 ? (
                        <span className="text-rose-700 font-bold">DEPLETED IRON STORES</span>
                      ) : (
                        <span className="text-emerald-700 font-semibold">NORMAL</span>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

          {/* AI Risk Classification Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Machine Learning Assessment Conclusion:</span>
              <span className="font-mono font-bold text-teal-800">
                Confidence: {result.confidence}%
              </span>
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <p>
                <strong>Diagnostic Grade:</strong> WHO Severity Classification —{' '}
                <span className="font-bold">{result.severity}</span> ({result.riskLevel})
              </p>
              <p className="leading-relaxed">
                <strong>Clinical Notes:</strong> {result.clinicalInterpretation}
              </p>
              {patient.symptoms && patient.symptoms.length > 0 && (
                <p>
                  <strong>Reported Clinical Symptoms:</strong> {patient.symptoms.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Doctor Signature & Legal Block */}
          <div className="pt-6 sm:pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-end text-xs">
            <div>
              <p className="text-[10px] text-slate-400 leading-normal">
                <strong>Notice:</strong> This automated report was produced by AnemiaSense Machine Learning Risk Assessment System. It is intended for early screening and clinical decision support. Final diagnostic confirmation requires direct physician examination.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block border-b border-slate-400 w-40 sm:w-48 mb-1" />
              <p className="font-bold text-slate-900 text-xs">Medical Officer / Pathologist</p>
              <p className="text-[10px] text-slate-500">Automated Electronic Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
