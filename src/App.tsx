import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AssessmentForm } from './components/AssessmentForm';
import { PredictionSummary } from './components/PredictionSummary';
import { BiomarkerGauges } from './components/BiomarkerGauges';
import { ClinicalActionPlan } from './components/ClinicalActionPlan';
import { MedicalReportModal } from './components/MedicalReportModal';
import { RepoExplorerModal } from './components/RepoExplorerModal';
import { ApiPlayground } from './components/ApiPlayground';
import { PatientInputs, PredictionResult } from './types/anemia';
import { evaluateAnemia, PRESET_CASES } from './utils/anemiaEngine';
import confetti from 'canvas-confetti';
import { 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Activity, 
  CheckCircle2, 
  Utensils, 
  RotateCcw,
  LayoutList,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'repository' | 'api'>('assessment');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStepMode, setIsStepMode] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Initialize with a preset case (Mild Iron Deficiency)
  const [patientInputs, setPatientInputs] = useState<PatientInputs>({
    patientName: 'Pooja Sharma',
    age: 24,
    gender: 'female',
    isPregnant: false,
    hemoglobin: 11.2,
    rbcCount: 3.9,
    hematocrit: 34.0,
    mcv: 77,
    ferritin: 14,
    symptoms: ['Fatigue & low energy', 'Cold hands and feet']
  });

  const [predictionResult, setPredictionResult] = useState<PredictionResult>(() => {
    return evaluateAnemia({
      patientName: 'Pooja Sharma',
      age: 24,
      gender: 'female',
      isPregnant: false,
      hemoglobin: 11.2,
      rbcCount: 3.9,
      hematocrit: 34.0,
      mcv: 77,
      ferritin: 14,
      symptoms: ['Fatigue & low energy', 'Cold hands and feet']
    });
  });

  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      const res = evaluateAnemia(patientInputs);
      setPredictionResult(res);
      setIsLoading(false);
      setCurrentStep(3); // Jump to Step 3 (Diagnostic Results)

      if (!res.is_anemia) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 250);
  };

  const handleResetAssessment = () => {
    setCurrentStep(1);
    setPatientInputs({
      patientName: '',
      age: 25,
      gender: 'female',
      isPregnant: false,
      hemoglobin: 12.0,
      rbcCount: 4.2,
      hematocrit: 37.0,
      symptoms: []
    });
  };

  // Re-evaluate on input change
  useEffect(() => {
    if (patientInputs.hemoglobin > 0 && patientInputs.rbcCount > 0 && patientInputs.hematocrit > 0) {
      const res = evaluateAnemia(patientInputs);
      setPredictionResult(res);
    }
  }, [
    patientInputs.hemoglobin,
    patientInputs.rbcCount,
    patientInputs.hematocrit,
    patientInputs.gender,
    patientInputs.isPregnant,
    patientInputs.mcv,
    patientInputs.ferritin,
    patientInputs.symptoms
  ]);

  const stepsList = [
    { num: 1, title: 'Patient Profile', shortTitle: 'Profile', icon: User },
    { num: 2, title: 'CBC Blood Values', shortTitle: 'CBC Values', icon: Activity },
    { num: 3, title: 'Diagnostic Verdict', shortTitle: 'Verdict', icon: CheckCircle2 },
    { num: 4, title: 'Dietary Action Plan', shortTitle: 'Diet Plan', icon: Utensils }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenZip={() => setActiveTab('repository')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Banner Announcement for Skill Wallet Submission */}
        {activeTab === 'assessment' && (
          <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 bg-teal-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border border-teal-800">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-800 flex items-center justify-center text-teal-300 shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold tracking-tight text-white">
                  Skill Wallet Submission &amp; Repository Package Ready
                </h2>
                <p className="text-[11px] sm:text-xs text-teal-200 mt-0.5">
                  Full Python code and trained model ready. Use this live page as your Demo Link!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('repository')}
                className="w-full sm:w-auto text-center px-3.5 py-1.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                View &amp; Export Python Repo
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Clinical Assessment Tool */}
        {activeTab === 'assessment' && (
          <div className="space-y-5 sm:space-y-6">
            {/* Step Progress Bar & View Switcher */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-4 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* 4 Steps Indicator Bar with Back / Forward buttons */}
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                  {stepsList.map((s, idx) => {
                    const Icon = s.icon;
                    const isActive = currentStep === s.num;
                    const isPassed = currentStep > s.num;
                    return (
                      <React.Fragment key={s.num}>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(s.num as any)}
                          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                            isActive
                              ? 'bg-teal-600 text-white shadow-xs'
                              : isPassed
                              ? 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/60'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isActive ? 'bg-white text-teal-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {s.num}
                          </span>
                          <span className="hidden sm:inline">{s.title}</span>
                          <span className="sm:hidden">{s.shortTitle}</span>
                        </button>
                        {idx < stepsList.length - 1 && (
                          <span className="text-slate-300 text-xs shrink-0">→</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* View Mode Toggle & Reset */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setIsStepMode(true)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                        isStepMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-teal-600" />
                      <span>Step Flow</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsStepMode(false)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                        !isStepMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LayoutList className="w-3.5 h-3.5 text-slate-500" />
                      <span>All-in-One</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetAssessment}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Start fresh assessment"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* STEP FLOW MODE */}
            {isStepMode ? (
              <div className="space-y-6">
                {/* Step 1: Patient Profile & Presets */}
                {currentStep === 1 && (
                  <div className="max-w-2xl mx-auto">
                    <AssessmentForm
                      inputs={patientInputs}
                      onChange={setPatientInputs}
                      onAnalyze={handleAnalyze}
                      isLoading={isLoading}
                      step={1}
                      onNextStep={() => setCurrentStep(2)}
                      isStepMode={true}
                    />
                  </div>
                )}

                {/* Step 2: CBC Blood Values & Symptoms */}
                {currentStep === 2 && (
                  <div className="max-w-2xl mx-auto">
                    <AssessmentForm
                      inputs={patientInputs}
                      onChange={setPatientInputs}
                      onAnalyze={handleAnalyze}
                      isLoading={isLoading}
                      step={2}
                      onPrevStep={() => setCurrentStep(1)}
                      onNextStep={handleAnalyze}
                      isStepMode={true}
                    />
                  </div>
                )}

                {/* Step 3: Diagnostic Verdict & Telemetry Gauges */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <ArrowLeft className="w-4 h-4 text-teal-600" />
                        <span>← Back to Step 2: Edit Blood Parameters</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <span>Step 4: Clinical &amp; Dietary Action Plan →</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-6 space-y-6">
                        <PredictionSummary
                          result={predictionResult}
                          patient={patientInputs}
                          onOpenReport={() => setIsReportModalOpen(true)}
                          onBackToInputs={() => setCurrentStep(2)}
                          onProceedToPlan={() => setCurrentStep(4)}
                        />
                      </div>
                      <div className="lg:col-span-6 space-y-6">
                        <BiomarkerGauges
                          hemoglobin={patientInputs.hemoglobin}
                          rbcCount={patientInputs.rbcCount}
                          hematocrit={patientInputs.hematocrit}
                          gender={patientInputs.gender}
                          isPregnant={patientInputs.isPregnant}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Clinical & Dietary Action Plan */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <ArrowLeft className="w-4 h-4 text-teal-600" />
                        <span>← Back to Step 3: Diagnostic Results</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetAssessment}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <span>Start New Assessment ↺</span>
                      </button>
                    </div>

                    <ClinicalActionPlan
                      result={predictionResult}
                      onBackToResults={() => setCurrentStep(3)}
                      onResetAssessment={handleResetAssessment}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* ALL-IN-ONE DASHBOARD VIEW */
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <AssessmentForm
                      inputs={patientInputs}
                      onChange={setPatientInputs}
                      onAnalyze={handleAnalyze}
                      isLoading={isLoading}
                      isStepMode={false}
                    />
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <PredictionSummary
                      result={predictionResult}
                      patient={patientInputs}
                      onOpenReport={() => setIsReportModalOpen(true)}
                    />

                    <BiomarkerGauges
                      hemoglobin={patientInputs.hemoglobin}
                      rbcCount={patientInputs.rbcCount}
                      hematocrit={patientInputs.hematocrit}
                      gender={patientInputs.gender}
                      isPregnant={patientInputs.isPregnant}
                    />
                  </div>
                </div>

                <ClinicalActionPlan
                  result={predictionResult}
                  onResetAssessment={handleResetAssessment}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: GitHub Repository & Files Hub */}
        {activeTab === 'repository' && (
          <RepoExplorerModal onBack={() => setActiveTab('assessment')} />
        )}

        {/* Tab 3: API Console */}
        {activeTab === 'api' && (
          <ApiPlayground onBack={() => setActiveTab('assessment')} />
        )}
      </main>

      {/* Clinical Report Modal */}
      <MedicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        result={predictionResult}
        patient={patientInputs}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AnemiaSense</span>
            <span>·</span>
            <span>AI Hematological Decision Support</span>
            <span>·</span>
            <span className="text-teal-700 font-semibold">WHO Standard Aligned</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Model: RandomForestClassifier (100 Estimators)</span>
            <span>·</span>
            <button
              onClick={() => setActiveTab('repository')}
              className="text-slate-600 hover:text-teal-700 underline cursor-pointer"
            >
              Export Repository Files
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
