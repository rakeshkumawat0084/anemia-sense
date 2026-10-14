import React from 'react';
import { BiologicalSex } from '../types/anemia';

interface BiomarkerGaugesProps {
  hemoglobin: number;
  rbcCount: number;
  hematocrit: number;
  gender: BiologicalSex;
  isPregnant: boolean;
}

export const BiomarkerGauges: React.FC<BiomarkerGaugesProps> = ({
  hemoglobin,
  rbcCount,
  hematocrit,
  gender,
  isPregnant
}) => {
  // Normal ranges
  const hbMin = isPregnant ? 11.0 : (gender === 'male' ? 13.0 : 12.0);
  const hbMax = gender === 'male' ? 17.5 : 15.5;

  const rbcMin = gender === 'male' ? 4.5 : 4.0;
  const rbcMax = gender === 'male' ? 5.9 : 5.2;

  const hctMin = isPregnant ? 33.0 : (gender === 'male' ? 40.0 : 36.0);
  const hctMax = gender === 'male' ? 50.0 : 46.0;

  // Percentage calculations for progress tracks
  // Hb scale: 5 to 19 g/dL
  const hbPercent = Math.min(100, Math.max(0, ((hemoglobin - 5) / (19 - 5)) * 100));
  // RBC scale: 2 to 7 million/mcL
  const rbcPercent = Math.min(100, Math.max(0, ((rbcCount - 2) / (7 - 2)) * 100));
  // HCT scale: 15 to 55 %
  const hctPercent = Math.min(100, Math.max(0, ((hematocrit - 15) / (55 - 15)) * 100));

  const getHbStatus = (val: number) => {
    if (val < 8.0) return { label: 'Severe Depletion', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' };
    if (val < hbMin) return { label: 'Below Normal (Anemia)', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' };
    if (val > hbMax) return { label: 'Elevated (Polycythemia risk)', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' };
    return { label: 'Normal Physiological', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
  };

  const getRbcStatus = (val: number) => {
    if (val < rbcMin) return { label: 'Low Erythrocyte Count', color: 'text-amber-600' };
    if (val > rbcMax) return { label: 'High', color: 'text-sky-600' };
    return { label: 'Optimal', color: 'text-emerald-700' };
  };

  const getHctStatus = (val: number) => {
    if (val < hctMin) return { label: 'Low Packed Cell Vol', color: 'text-amber-600' };
    if (val > hctMax) return { label: 'High', color: 'text-sky-600' };
    return { label: 'Optimal', color: 'text-emerald-700' };
  };

  const hbStatus = getHbStatus(hemoglobin);
  const rbcStatus = getRbcStatus(rbcCount);
  const hctStatus = getHctStatus(hematocrit);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Biomarker Range Telemetry
          </h3>
          <p className="text-xs text-slate-500">
            Current patient values compared with WHO reference intervals
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {gender === 'male' ? 'Adult Male Standard' : isPregnant ? 'Maternal Standard' : 'Adult Female Standard'}
        </span>
      </div>

      <div className="space-y-5">
        {/* Hemoglobin Gauge */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5">
            <span className="text-xs font-bold text-slate-700">Hemoglobin (Hb)</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${hbStatus.color}`}>
                {hbStatus.label}
              </span>
              <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {hemoglobin.toFixed(1)} <span className="text-xs font-normal text-slate-500">g/dL</span>
              </span>
            </div>
          </div>
          
          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden flex">
            {/* Severe zone: 5-8 */}
            <div className="h-full bg-rose-200 border-r border-rose-300" style={{ width: `${((8 - 5) / 14) * 100}%` }} title="Severe: < 8 g/dL" />
            {/* Mild/Mod Anemia zone: 8 to hbMin */}
            <div className="h-full bg-amber-200 border-r border-amber-300" style={{ width: `${((hbMin - 8) / 14) * 100}%` }} title={`Anemia: 8 - ${hbMin} g/dL`} />
            {/* Normal zone: hbMin to hbMax */}
            <div className="h-full bg-emerald-200 border-r border-emerald-300" style={{ width: `${((hbMax - hbMin) / 14) * 100}%` }} title={`Normal: ${hbMin} - ${hbMax} g/dL`} />
            {/* High zone: hbMax to 19 */}
            <div className="h-full bg-sky-200" style={{ width: `${((19 - hbMax) / 14) * 100}%` }} title="High: > 17 g/dL" />
          </div>

          {/* Pointer Marker */}
          <div className="relative w-full h-4">
            <div
              className="absolute top-0 -ml-1.5 transition-all duration-300 flex flex-col items-center"
              style={{ left: `${Math.max(2, Math.min(98, hbPercent))}%` }}
            >
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-800" />
              <span className="text-[10px] font-mono font-bold text-slate-800">
                {hemoglobin}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>Critical &lt;8.0</span>
            <span className="text-slate-600 font-medium">Standard Cutoff: {hbMin.toFixed(1)} g/dL</span>
            <span>Target: {hbMin}–{hbMax} g/dL</span>
          </div>
        </div>

        {/* RBC Count Gauge */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5">
            <span className="text-xs font-bold text-slate-700">Red Blood Cell (RBC) Count</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${rbcStatus.color}`}>
                {rbcStatus.label}
              </span>
              <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {rbcCount.toFixed(2)} <span className="text-xs font-normal text-slate-500">m/mcL</span>
              </span>
            </div>
          </div>
          
          <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-amber-200 border-r border-amber-300" style={{ width: `${((rbcMin - 2) / 5) * 100}%` }} />
            <div className="h-full bg-emerald-200 border-r border-emerald-300" style={{ width: `${((rbcMax - rbcMin) / 5) * 100}%` }} />
            <div className="h-full bg-sky-200" style={{ width: `${((7 - rbcMax) / 5) * 100}%` }} />
          </div>

          <div className="relative w-full h-4">
            <div
              className="absolute top-0 -ml-1.5 transition-all duration-300 flex flex-col items-center"
              style={{ left: `${Math.max(2, Math.min(98, rbcPercent))}%` }}
            >
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-800" />
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>Low &lt;{rbcMin}</span>
            <span className="text-slate-600 font-medium">Normal: {rbcMin}–{rbcMax} million/mcL</span>
            <span>High &gt;{rbcMax}</span>
          </div>
        </div>

        {/* Hematocrit Gauge */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5">
            <span className="text-xs font-bold text-slate-700">Hematocrit (HCT / Packed Cell Volume)</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${hctStatus.color}`}>
                {hctStatus.label}
              </span>
              <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {hematocrit.toFixed(1)} <span className="text-xs font-normal text-slate-500">%</span>
              </span>
            </div>
          </div>
          
          <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-amber-200 border-r border-amber-300" style={{ width: `${((hctMin - 15) / 40) * 100}%` }} />
            <div className="h-full bg-emerald-200 border-r border-emerald-300" style={{ width: `${((hctMax - hctMin) / 40) * 100}%` }} />
            <div className="h-full bg-sky-200" style={{ width: `${((55 - hctMax) / 40) * 100}%` }} />
          </div>

          <div className="relative w-full h-4">
            <div
              className="absolute top-0 -ml-1.5 transition-all duration-300 flex flex-col items-center"
              style={{ left: `${Math.max(2, Math.min(98, hctPercent))}%` }}
            >
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-800" />
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>Low &lt;{hctMin}%</span>
            <span className="text-slate-600 font-medium">Standard Reference: {hctMin}–{hctMax}%</span>
            <span>High &gt;{hctMax}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
