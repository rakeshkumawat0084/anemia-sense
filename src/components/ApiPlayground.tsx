import React, { useState } from 'react';
import { Terminal, Send, Check, Copy, Code2, Globe } from 'lucide-react';

interface ApiPlaygroundProps {
  onBack?: () => void;
}

export const ApiPlayground: React.FC<ApiPlaygroundProps> = ({ onBack }) => {
  const [hemoglobin, setHemoglobin] = useState('10.8');
  const [rbcCount, setRbcCount] = useState('3.8');
  const [hematocrit, setHematocrit] = useState('32.5');
  const [gender, setGender] = useState('female');
  const [isPregnant, setIsPregnant] = useState(false);

  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const curlCommand = `curl -X POST "${window.location.origin}/api/predict" \\
  -H "Content-Type: application/json" \\
  -d '{
    "hemoglobin": ${hemoglobin},
    "rbc_count": ${rbcCount},
    "hematocrit": ${hematocrit},
    "gender": "${gender}",
    "isPregnant": ${isPregnant}
  }'`;

  const handleTestApi = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hemoglobin: parseFloat(hemoglobin),
          rbc_count: parseFloat(rbcCount),
          hematocrit: parseFloat(hematocrit),
          gender,
          isPregnant
        })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setResponse({ error: err.message || 'Failed to connect to API' });
    } finally {
      setIsLoading(false);
    }
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Back to Assessment Bar */}
      {onBack && (
        <div className="flex items-center justify-between pb-1">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span className="text-teal-600 font-extrabold text-sm">←</span>
            <span>Back to Assessment Tool (Assessment Par Wapas Jayein)</span>
          </button>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            REST API Testing Console
          </span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Live REST API Console &amp; Testbed
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl">
          AnemiaSense exposes a high-performance RESTful endpoint (<code className="font-mono text-teal-800 bg-teal-50 px-1 py-0.5 rounded">POST /api/predict</code>) mirroring the Flask endpoint. You can test it directly below or copy the curl snippet for external mobile/web apps.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs">
          <span className="bg-teal-600 text-white font-bold px-2.5 py-1 rounded shrink-0">POST</span>
          <span className="text-slate-700 font-semibold break-all text-[11px] sm:text-xs">{window.location.origin}/api/predict</span>
        </div>
      </div>

      {/* Two Column Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Request Payload Parameters
            </span>
            <span className="text-[11px] text-slate-400 font-mono">application/json</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                hemoglobin (g/dL)
              </label>
              <input
                type="number"
                step="0.1"
                value={hemoglobin}
                onChange={(e) => setHemoglobin(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                rbc_count (million/mcL)
              </label>
              <input
                type="number"
                step="0.1"
                value={rbcCount}
                onChange={(e) => setRbcCount(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                hematocrit (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={hematocrit}
                onChange={(e) => setHematocrit(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  isPregnant
                </label>
                <select
                  value={isPregnant ? 'true' : 'false'}
                  onChange={(e) => setIsPregnant(e.target.value === 'true')}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleTestApi}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Execute API Request</span>
          </button>
        </div>

        {/* Live JSON Response */}
        <div className="bg-slate-950 text-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-slate-900">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Server JSON Response
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                response?.success ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {response ? (response.success ? '200 OK' : 'Error') : 'Awaiting Request'}
              </span>
            </div>

            <pre className="font-mono text-xs text-teal-300 overflow-x-auto max-h-[300px] leading-relaxed">
              {response
                ? JSON.stringify(response, null, 2)
                : '// Click "Execute API Request" to test live\n// Output will appear here formatted as JSON'}
            </pre>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">cURL Example</span>
              <button
                onClick={copyCurl}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded transition-colors cursor-pointer"
              >
                {copiedCurl ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="text-[10px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap sm:whitespace-pre break-all sm:break-normal bg-slate-900 p-2.5 rounded">
              {curlCommand}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
