import React, { useState } from 'react';
import { PatientInputs, PresetCase, BiologicalSex } from '../types/anemia';
import { PRESET_CASES, COMMON_SYMPTOMS } from '../utils/anemiaEngine';
import { Sliders, Sparkles, ChevronDown, ChevronUp, UserCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface AssessmentFormProps {
  inputs: PatientInputs;
  onChange: (inputs: PatientInputs) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  step?: 1 | 2;
  onNextStep?: () => void;
  onPrevStep?: () => void;
  isStepMode?: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  inputs,
  onChange,
  onAnalyze,
  isLoading,
  step = 1,
  onNextStep,
  onPrevStep,
  isStepMode = true
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePresetSelect = (preset: PresetCase) => {
    onChange({
      patientName: preset.title,
      age: preset.age,
      gender: preset.gender,
      isPregnant: preset.isPregnant,
      hemoglobin: preset.hemoglobin,
      rbcCount: preset.rbcCount,
      hematocrit: preset.hematocrit,
      mcv: preset.mcv,
      ferritin: preset.ferritin,
      symptoms: [...preset.symptoms]
    });
  };

  const handleInputChange = (field: keyof PatientInputs, value: any) => {
    onChange({
      ...inputs,
      [field]: value
    });
  };

  const toggleSymptom = (symptom: string) => {
    const current = inputs.symptoms || [];
    if (current.includes(symptom)) {
      onChange({
        ...inputs,
        symptoms: current.filter(s => s !== symptom)
      });
    } else {
      onChange({
        ...inputs,
        symptoms: [...current, symptom]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepMode && step === 1 && onNextStep) {
      onNextStep();
    } else {
      onAnalyze();
    }
  };

  const showStep1 = !isStepMode || step === 1;
  const showStep2 = !isStepMode || step === 2;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      {/* Step Header Indicator in Step Mode */}
      {isStepMode && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
              {step}
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {step === 1 ? 'Step 1: Patient Profile & Presets' : 'Step 2: Complete Blood Count (CBC)'}
            </span>
          </div>

          {step === 2 && onPrevStep && (
            <button
              type="button"
              onClick={onPrevStep}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>← Back (Peeche)</span>
            </button>
          )}
        </div>
      )}

      {/* Presets Header - Shown in Step 1 or full view */}
      {showStep1 && (
        <div className="mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Quick Clinical Presets</span>
            </div>
            <span className="text-[11px] text-slate-400">1-Click Test Scenarios</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_CASES.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 border border-transparent text-slate-700 transition-colors cursor-pointer"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1 Content: Patient Profile Sub-section */}
        {showStep1 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Name / ID
                </label>
                <input
                  type="text"
                  value={inputs.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  placeholder="e.g. John Doe / P-104"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Biological Sex
                </label>
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleInputChange('gender', 'female')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      inputs.gender === 'female'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('gender', 'male');
                      handleInputChange('isPregnant', false);
                    }}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      inputs.gender === 'male'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Male
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  value={inputs.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 25)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Pregnancy Toggle for Females */}
            {inputs.gender === 'female' && (
              <div className="flex items-center justify-between p-2.5 bg-teal-50/70 border border-teal-100 rounded-lg text-xs">
                <span className="font-medium text-teal-900">
                  Is the patient currently pregnant? (WHO criteria adjusts to &lt;11.0 g/dL)
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.isPregnant}
                    onChange={(e) => handleInputChange('isPregnant', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Step 2 Content: Primary Complete Blood Count (CBC) Features */}
        {showStep2 && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Complete Blood Count (CBC) Core Features
              </span>
              <span className="text-[11px] text-teal-700 font-medium">Model Input Vector</span>
            </div>

            {/* Hemoglobin */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="hemoglobin" className="text-xs font-semibold text-slate-800">
                  Hemoglobin (Hb) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  g/dL (Normal: {inputs.gender === 'male' ? '13.0–17.5' : inputs.isPregnant ? '11.0–15.0' : '12.0–15.5'})
                </span>
              </div>
              <div className="relative">
                <input
                  id="hemoglobin"
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="22.0"
                  required
                  value={inputs.hemoglobin === 0 ? '' : inputs.hemoglobin}
                  onChange={(e) => handleInputChange('hemoglobin', parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 11.5"
                  className="w-full text-sm font-medium px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                  g/dL
                </span>
              </div>
            </div>

            {/* RBC Count */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="rbcCount" className="text-xs font-semibold text-slate-800">
                  Red Blood Cell (RBC) Count <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  million / mcL (Normal: {inputs.gender === 'male' ? '4.5–5.9' : '4.0–5.2'})
                </span>
              </div>
              <div className="relative">
                <input
                  id="rbcCount"
                  type="number"
                  step="0.01"
                  min="1.0"
                  max="8.0"
                  required
                  value={inputs.rbcCount === 0 ? '' : inputs.rbcCount}
                  onChange={(e) => handleInputChange('rbcCount', parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 4.2"
                  className="w-full text-sm font-medium px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                  m/mcL
                </span>
              </div>
            </div>

            {/* Hematocrit */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="hematocrit" className="text-xs font-semibold text-slate-800">
                  Hematocrit (HCT / PCV) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  % (Normal: {inputs.gender === 'male' ? '40–50%' : '36–46%'})
                </span>
              </div>
              <div className="relative">
                <input
                  id="hematocrit"
                  type="number"
                  step="0.1"
                  min="10.0"
                  max="65.0"
                  required
                  value={inputs.hematocrit === 0 ? '' : inputs.hematocrit}
                  onChange={(e) => handleInputChange('hematocrit', parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 35.0"
                  className="w-full text-sm font-medium px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                  %
                </span>
              </div>
            </div>

            {/* Collapsible Advanced Hematology Section */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  Advanced Parameters &amp; Symptoms (MCV, Ferritin)
                </span>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {showAdvanced && (
                <div className="mt-3 p-3 bg-slate-50/70 border border-slate-200 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mean Corpuscular Volume (MCV)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="1"
                          placeholder="e.g. 85 (Normal: 80–100)"
                          value={inputs.mcv || ''}
                          onChange={(e) => handleInputChange('mcv', parseFloat(e.target.value) || undefined)}
                          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        />
                        <span className="absolute right-2.5 top-2 text-[11px] text-slate-400">
                          fL
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Serum Ferritin
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="1"
                          placeholder="e.g. 45 (Normal: 15–200)"
                          value={inputs.ferritin || ''}
                          onChange={(e) => handleInputChange('ferritin', parseFloat(e.target.value) || undefined)}
                          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        />
                        <span className="absolute right-2.5 top-2 text-[11px] text-slate-400">
                          ng/mL
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms Checklist */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Reported Physical Symptoms
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {COMMON_SYMPTOMS.map((symp) => {
                        const isSelected = (inputs.symptoms || []).includes(symp);
                        return (
                          <button
                            key={symp}
                            type="button"
                            onClick={() => toggleSymptom(symp)}
                            className={`text-[11px] font-medium px-2 py-1 rounded transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{symp}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Navigation Action Buttons */}
        <div className="pt-2">
          {isStepMode ? (
            step === 1 ? (
              <button
                type="button"
                onClick={onNextStep}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next: Enter Blood Parameters (Aage Badhein)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-full sm:w-1/3 py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>← Back (Peeche)</span>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading || inputs.hemoglobin <= 0 || inputs.rbcCount <= 0 || inputs.hematocrit <= 0}
                  className="w-full sm:flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Analyze &amp; View Results →</span>
                    </>
                  )}
                </button>
              </div>
            )
          ) : (
            <button
              type="submit"
              disabled={isLoading || inputs.hemoglobin <= 0 || inputs.rbcCount <= 0 || inputs.hematocrit <= 0}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Random Forest Inference...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Analyze Health Parameters</span>
                </>
              )}
            </button>
          )}

          <p className="text-[11px] text-center text-slate-400 mt-2">
            Real-time inference matching Random Forest ML with WHO Diagnostic Guidance
          </p>
        </div>
      </form>
    </div>
  );
};
