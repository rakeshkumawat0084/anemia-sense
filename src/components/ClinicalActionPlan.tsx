import React, { useState } from 'react';
import { PredictionResult, DietaryItem } from '../types/anemia';
import { DIETARY_ITEMS } from '../utils/anemiaEngine';
import { Utensils, Zap, Ban, TestTubes, AlertOctagon, Check } from 'lucide-react';

interface ClinicalActionPlanProps {
  result: PredictionResult;
  onBackToResults?: () => void;
  onResetAssessment?: () => void;
}

export const ClinicalActionPlan: React.FC<ClinicalActionPlanProps> = ({ 
  result,
  onBackToResults,
  onResetAssessment
}) => {
  const [activeCategory, setActiveCategory] = useState<'diet' | 'enhancers' | 'inhibitors' | 'labs'>('diet');

  const hemeAndNonHeme = DIETARY_ITEMS.filter(item => item.category === 'non-heme' || item.category === 'heme');
  const enhancers = DIETARY_ITEMS.filter(item => item.category === 'enhancer');
  const inhibitors = DIETARY_ITEMS.filter(item => item.category === 'inhibitor');

  const isSevere = result.severity === 'Severe';
  const isAnemia = result.is_anemia;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      {/* Top Back Navigation if onBackToResults is passed */}
      {onBackToResults && (
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <button
            type="button"
            onClick={onBackToResults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <span>← Back to Step 3: Diagnostic Results (Peeche Jayein)</span>
          </button>
          <span className="text-[11px] text-slate-400 font-medium">
            Step 4 of 4: Clinical &amp; Dietary Guidance
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Evidence-Based Clinical & Dietary Action Plan
          </h3>
          <p className="text-xs text-slate-500">
            Targeted nutritional strategies & hematological diagnostic protocol
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setActiveCategory('diet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 cursor-pointer ${
              activeCategory === 'diet'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-teal-600" />
            <span>Iron Foods</span>
          </button>

          <button
            onClick={() => setActiveCategory('enhancers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 cursor-pointer ${
              activeCategory === 'enhancers'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Absorption Boosters</span>
          </button>

          <button
            onClick={() => setActiveCategory('inhibitors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 cursor-pointer ${
              activeCategory === 'inhibitors'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-rose-500" />
            <span>Blockers to Avoid</span>
          </button>

          <button
            onClick={() => setActiveCategory('labs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 cursor-pointer ${
              activeCategory === 'labs'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TestTubes className="w-3.5 h-3.5 text-indigo-500" />
            <span>Lab Workup</span>
          </button>
        </div>
      </div>

      {/* Severe Anemia Urgent Notice */}
      {isSevere && (
        <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-rose-900 block mb-0.5">
              Urgent Medical Alert: Critical Low Hemoglobin (&lt; 8.0 g/dL)
            </span>
            <p className="text-rose-700 leading-relaxed">
              Dietary changes alone are insufficient for severe anemia. The patient is at risk of hemodynamic decompensation, high-output cardiac stress, or syncope. Immediate referral to an internal medicine specialist or hematologist for intravenous iron or packed red cell transfusion evaluation is strongly urged.
            </p>
          </div>
        </div>
      )}

      {/* Category Content */}
      {activeCategory === 'diet' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-600 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100 flex items-center gap-2">
            <Check className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              <strong>Clinical Principle:</strong> Combine non-heme (plant) iron with ascorbic acid (Vitamin C). Traditional combinations like roasted chana with jaggery (gur) provide fast bioavailable iron.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hemeAndNonHeme.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    {item.localName && (
                      <span className="text-[11px] text-teal-700 font-medium">{item.localName}</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                    {item.ironContent}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-1.5">
                  {item.notes}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/60 pt-1.5">
                  <span>Serving: {item.servingSize}</span>
                  <span className="font-semibold text-slate-500">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'enhancers' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Iron Absorption Multiplier:</strong> Vitamin C (Ascorbic acid) reduces Ferric iron (Fe³⁺) to Ferrous iron (Fe²⁺), preventing insoluble complex formation in the small intestine.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {enhancers.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    {item.localName && (
                      <span className="text-[11px] text-amber-700 font-medium">{item.localName}</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                    Enhancer
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-1.5">
                  {item.notes}
                </p>
                <div className="text-[10px] text-slate-400 border-t border-slate-200/60 pt-1.5">
                  Serving suggestion: {item.servingSize}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'inhibitors' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-600 bg-rose-50/50 p-2.5 rounded-lg border border-rose-100 flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Tannin & Polyphenol Chelation:</strong> Chai and coffee reduce non-heme iron absorption by up to 60–80% if taken concurrently with meals.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inhibitors.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    {item.localName && (
                      <span className="text-[11px] text-rose-700 font-medium">{item.localName}</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-1.5">
                  {item.notes}
                </p>
                <div className="text-[10px] text-slate-400 border-t border-slate-200/60 pt-1.5">
                  Recommendation: {item.servingSize}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'labs' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-600 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
            <strong>Recommended Diagnostic Next Steps:</strong> To determine the root etiology of anemia (nutritional vs blood loss vs chronic disease), clinicians order the following standard panel:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">1. Complete Iron Profile</span>
              <ul className="text-slate-600 space-y-1 list-disc pl-4 text-[11px]">
                <li><strong>Serum Ferritin:</strong> Primary biomarker of total body iron store (Low &lt;15 ng/mL).</li>
                <li><strong>Total Iron Binding Capacity (TIBC):</strong> Elevated in iron deficiency.</li>
                <li><strong>Transferrin Saturation (%):</strong> &lt;16% confirms functional iron deficit.</li>
              </ul>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">2. Peripheral Blood Smear (PBS)</span>
              <ul className="text-slate-600 space-y-1 list-disc pl-4 text-[11px]">
                <li>Visual microscopic inspection of red blood cell morphology.</li>
                <li>Checks for hypochromia, microcytosis, pencil cells, or poikilocytosis.</li>
                <li>Rules out sickle cell disorders or hemoglobinopathies.</li>
              </ul>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">3. Vitamin B12 & Folate Assay</span>
              <p className="text-slate-600 text-[11px]">
                Crucial if MCV is elevated (&gt;96 fL) to rule out megaloblastic macrocytic anemia, pernicious anemia, or dietary B12 depletion common in strict vegetarians.
              </p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">4. Stool Occult Blood Test (FOBT)</span>
              <p className="text-slate-600 text-[11px]">
                Essential in adult males and post-menopausal females to rule out gastrointestinal bleeding (peptic ulcers, hemorrhoids, polyps, or malignancy).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      {(onBackToResults || onResetAssessment) && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {onBackToResults && (
            <button
              type="button"
              onClick={onBackToResults}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <span>← Back to Step 3: Diagnostic Results (Peeche Jayein)</span>
            </button>
          )}

          {onResetAssessment && (
            <button
              type="button"
              onClick={onResetAssessment}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <span>← Start New Assessment / Naya Test Shuru Karein</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
