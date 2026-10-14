import React from 'react';
import { PredictionResult, PatientInputs } from '../types/anemia';
import { AlertTriangle, CheckCircle2, FileText, Share2, Info, ArrowRight } from 'lucide-react';

interface PredictionSummaryProps {
  result: PredictionResult;
  patient: PatientInputs;
  onOpenReport: () => void;
  onBackToInputs?: () => void;
  onProceedToPlan?: () => void;
}

export const PredictionSummary: React.FC<PredictionSummaryProps> = ({
  result,
  patient,
  onOpenReport,
  onBackToInputs,
  onProceedToPlan
}) => {
  const isAnemia = result.is_anemia;

  const severityBadgeColors = {
    Normal: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Mild: 'bg-amber-50 text-amber-800 border-amber-200',
    Moderate: 'bg-rose-50 text-rose-800 border-rose-200',
    Severe: 'bg-red-50 text-red-900 border-red-300'
  };

  return (
    <div className={`border rounded-xl p-4 sm:p-6 transition-all shadow-xs ${
      isAnemia 
        ? 'bg-white border-rose-200 ring-1 ring-rose-100' 
        : 'bg-white border-emerald-200 ring-1 ring-emerald-100'
    }`}>
      {/* Navigation Bar if onBackToInputs is provided */}
      {onBackToInputs && (
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <button
            type="button"
            onClick={onBackToInputs}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <span>← Back to Step 2: Edit Blood Parameters (Peeche Jayein)</span>
          </button>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Step 3 of 4: Diagnostic Verdict
          </span>
        </div>
      )}

      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3.5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isAnemia ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {isAnemia ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <CheckCircle2 className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Diagnostic Prediction
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${severityBadgeColors[result.severity]}`}>
                WHO Grade: {result.severity}
              </span>
            </div>
            <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight mt-0.5 ${
              isAnemia ? 'text-rose-700' : 'text-emerald-800'
            }`}>
              {result.result_text}
            </h2>
          </div>
        </div>

        {/* Quick Report Button */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenReport}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Clinical Report</span>
          </button>
        </div>
      </div>

      {/* Probability Score & Confidence Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 py-1">
        {/* Metric 1: Confidence Score */}
        <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Model Confidence
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900">
              {result.confidence}%
            </span>
            <span className="text-[11px] text-teal-700 font-medium">Random Forest</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${isAnemia ? 'bg-rose-600' : 'bg-emerald-600'}`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Anemia Probability */}
        <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Anemia Likelihood P(Y=1)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black font-mono ${
              result.probabilities.anemia > 50 ? 'text-rose-600' : 'text-slate-800'
            }`}>
              {result.probabilities.anemia}%
            </span>
            <span className="text-[11px] text-slate-400">Class 1</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full"
              style={{ width: `${result.probabilities.anemia}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Normal Health Probability */}
        <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Normal Probability P(Y=0)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black font-mono ${
              result.probabilities.normal >= 50 ? 'text-emerald-700' : 'text-slate-800'
            }`}>
              {result.probabilities.normal}%
            </span>
            <span className="text-[11px] text-slate-400">Class 0</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${result.probabilities.normal}%` }}
            />
          </div>
        </div>
      </div>

      {/* Clinical Interpretation Note */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-3.5 text-xs text-slate-700 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <Info className="w-3.5 h-3.5 text-teal-600" />
          <span>Clinical Interpretation</span>
        </div>
        <p className="leading-relaxed text-slate-600">
          {result.clinicalInterpretation}
        </p>

        {result.morphology && (
          <div className="pt-1.5 border-t border-slate-200/60 flex items-center gap-2">
            <span className="font-semibold text-slate-800">Morphological Type:</span>
            <span className="text-teal-800 font-medium bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
              {result.morphology}
            </span>
          </div>
        )}
      </div>

      {/* Next Step / Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div>
          {onBackToInputs && (
            <button
              type="button"
              onClick={onBackToInputs}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <span>← Back to Step 2 (Peeche Jayein)</span>
            </button>
          )}
        </div>

        {onProceedToPlan && (
          <button
            type="button"
            onClick={onProceedToPlan}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>Proceed to Step 4: Clinical &amp; Dietary Action Plan →</span>
          </button>
        )}
      </div>

      {/* WHO Criteria Notice */}
      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-slate-400">
        <span>Evaluated under WHO criteria threshold: Hb &lt; {result.thresholdUsed.toFixed(1)} g/dL</span>
        <span>Timestamp: {result.timestamp}</span>
      </div>
    </div>
  );
};
