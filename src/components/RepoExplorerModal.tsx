import React, { useState } from 'react';
import { REPO_FILES } from '../data/repoCode';
import { RepoFile } from '../types/anemia';
import JSZip from 'jszip';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  GitBranch, 
  CheckCircle, 
  Terminal, 
  Layers, 
  FileText,
  Sparkles
} from 'lucide-react';

interface RepoExplorerModalProps {
  onBack?: () => void;
  onClose?: () => void;
}

export const RepoExplorerModal: React.FC<RepoExplorerModalProps> = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(REPO_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCmd = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add each file to its respective relative directory inside anemia-sense/
      REPO_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Generate the ZIP blob
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'anemia-sense.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
      alert('Error creating ZIP package. You can copy individual file contents below.');
    } finally {
      setIsZipping(false);
    }
  };

  const lineCount = selectedFile.content.split('\n').length;
  const lines = selectedFile.content.split('\n');

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
            Repository &amp; Export Center
          </span>
        </div>
      )}

      {/* Top Banner with Skill Wallet Quick Guide */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Skill Wallet Portal Ready Package
              </span>
              <span className="text-[11px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded font-mono">
                Full Python + Flask + ML
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              AnemiaSense Complete Repository Files
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              All files are generated with full working Python Flask code, Random Forest ML training scripts, HTML UI, requirements, and deployment Procfile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Bundling ZIP...' : 'Download Project (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* 3 Steps to Submit on Skill Wallet Portal */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Steps to Submit on Skill Wallet Portal (चरण-दर-चरण निर्देश)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Step 1 */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-200 mb-1">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[11px]">
                    1
                  </span>
                  <span>GitHub Par Push Karein</span>
                </div>
                <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
                  Download ZIP extract karein ya folder banayein, aur terminal me yeh commands chalayein:
                </p>
                <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-teal-300 overflow-x-auto relative">
                  git init<br />
                  git add .<br />
                  git commit -m "Initial commit: AnemiaSense"<br />
                  git branch -M main<br />
                  git remote add origin https://github.com/YOUR_USERNAME/anemia-sense.git<br />
                  git push -u origin main
                </div>
              </div>
              <button
                onClick={() => handleCopyCmd('git init\ngit add .\ngit commit -m "Initial commit: AnemiaSense ML Web System"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/anemia-sense.git\ngit push -u origin main', 'git')}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                {copiedCommand === 'git' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCommand === 'git' ? 'Copied Commands!' : 'Copy Git Commands'}</span>
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-200 mb-1">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[11px]">
                    2
                  </span>
                  <span>Demo Link Ready Karein</span>
                </div>
                <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
                  Aap iss live web application ka URL direct demo link ke taur par use kar sakte hain ya Render.com par host kar sakte hain:
                </p>
                <div className="bg-slate-950 p-2.5 rounded text-[11px] space-y-1">
                  <div className="text-slate-300 font-semibold">Render.com Hosting Config:</div>
                  <div className="text-slate-400 font-mono text-[10px]">
                    Build: pip install -r requirements.txt<br />
                    Start: gunicorn app:app
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopyCmd(window.location.href, 'demo-url')}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-teal-300 hover:text-teal-200 bg-teal-950/60 border border-teal-800/60 rounded-lg transition-colors cursor-pointer"
              >
                {copiedCommand === 'demo-url' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                <span>{copiedCommand === 'demo-url' ? 'Live URL Copied!' : 'Copy Current Live Demo Link'}</span>
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-200 mb-1">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[11px]">
                    3
                  </span>
                  <span>Skill Wallet Portal Submit</span>
                </div>
                <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
                  Skill Wallet portal par jakar dono fields fill karein:
                </p>
                <div className="bg-slate-950 p-2.5 rounded text-[11px] space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-teal-400" />
                    <span><strong>Add Github Link:</strong> GitHub Repo URL</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-teal-400" />
                    <span><strong>Add Demo Link:</strong> Live Web Demo URL</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-center text-teal-400 font-medium py-1.5 bg-teal-900/30 rounded-lg border border-teal-800/40">
                100% Ready for Submission
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Code Viewer Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* File Navigator Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-4 pt-2.5 sm:pt-3 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {REPO_FILES.map((file) => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-t border-l border-r shrink-0 cursor-pointer ${
                selectedFile.path === file.path
                  ? 'bg-white text-slate-900 border-slate-200 -mb-px'
                  : 'text-slate-600 hover:text-slate-900 border-transparent bg-transparent'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-teal-600" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        {/* Selected File Details Bar */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-900">
                anemia-sense/{selectedFile.path}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                ({lineCount} lines)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedFile.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(selectedFile.content)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Copied File!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-4 bg-slate-950 text-slate-100 overflow-x-auto max-h-[520px] font-mono text-xs leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60">
                  <td className="w-10 pr-4 text-right text-slate-600 select-none text-[11px] align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre font-mono text-slate-200">
                    {line || ' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
