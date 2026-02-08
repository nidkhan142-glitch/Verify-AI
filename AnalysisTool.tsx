import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { supabase } from '../supabase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as mammoth from 'mammoth';

// PDF.js worker setup
import * as pdfjsLib from 'pdfjs-dist';

// Ensure pdfjs is correctly initialized for browser environment via esm.sh
const PDFJS_VERSION = '4.4.168';
if (pdfjsLib && (pdfjsLib as any).GlobalWorkerOptions) {
  (pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;
}

type AnalysisContext = 'HR' | 'EDUCATION' | 'MARKETING' | 'GENERAL' | null;

interface HeatmapAnnotation {
  start_index: number;
  end_index: number;
  label: "AI_PATTERN" | "HUMAN_PATTERN";
  color: "red" | "blue";
  tooltip_title: string;
  tooltip_explanation: string;
}

interface ForensicReportData {
  score: number;
  confidence: 'Low' | 'Medium' | 'High';
  verdict: 'Likely Human-Written' | 'Likely AI-Generated' | 'AI-Assisted (Hybrid)' | 'Inconclusive (Insufficient Evidence)';
  plain_language_meaning: string;
  pattern_insights: string;
  key_observations: string[];
  stats: {
    sentence_variance: { result: string; interpretation: string };
    lexical_density: { result: string; interpretation: string };
    burstiness: { result: string; interpretation: string };
    insight: string;
  };
  evidence: {
    ai_patterns: string[];
    human_signals: string[];
    dominance_explanation: string;
  };
  forensic_deep_dive: {
    structural_monotony: {
      label: string;
      description: string;
    };
    fact_verification: {
      status: string;
      insight: string;
    };
    turing_friction: {
      connective_tissue_count: number;
      detected_tokens: string[];
      explanation: string;
    };
  };
  humanization_roadmap: string[];
  verdict_bullets: string[];
  recommendations: string[];
  heatmap_annotations: HeatmapAnnotation[];
}

interface AnalysisToolProps {
  user: any;
  credits: number;
  onUpdateCredits: () => void;
  guestCredits: number;
  onUpdateGuestCredits: (credits: number) => void;
  showLimitModal: () => void;
}

const PHOTOSYNTHESIS_ESSAY = `Photosynthesis is a sophisticated biological process that serves as the primary energy-conversion mechanism for life on Earth. Through the absorption of electromagnetic radiation, specifically within the visible spectrum, photoautotrophs such as plants and cyanobacteria synthesize organic compounds from inorganic precursors. The process occurs within specialized organelles known as chloroplasts, where chlorophyll pigments capture photons to initiate the light-dependent reactions. These reactions facilitate the photolysis of water, releasing molecular oxygen as a byproduct while generating ATP and NADPH. Subsequently, the Calvin Cycle utilizes these energy carriers to fix atmospheric carbon dioxide into triose phosphates, which are eventually converted into glucose and other vital carbohydrates. This intricate cycle not only sustains the growth and development of the organism but also maintains the global atmospheric balance by sequestering carbon and producing the oxygen necessary for aerobic respiration across the biosphere.`;

const STATIC_SAMPLE_REPORT: ForensicReportData = {
  score: 98.5,
  confidence: 'High',
  verdict: 'Likely AI-Generated',
  plain_language_meaning: 'This text exhibits the typical statistical fingerprint of a large language model.',
  pattern_insights: 'The analysis identified severe structural rigidity and a lack of rhythmic variance. Every sentence follows an "optimal token path," which is highly characteristic of modern transformer-based architectures.',
  key_observations: [
    'Highly predictable token transitions', 
    'Monotonous rhythmic cadence', 
    'Absence of cognitive revision markers'
  ],
  stats: {
    sentence_variance: { 
      result: 'Critical Low', 
      interpretation: 'Sentences are near-identical in complexity. Natural human writing involves "pulsing" between short and long thoughts.' 
    },
    lexical_density: { 
      result: 'Extreme', 
      interpretation: 'The text uses an unnaturally high frequency of Tier-3 academic vocabulary without any filler or transition noise.' 
    },
    burstiness: { 
      result: 'Flattened', 
      interpretation: 'The text flow is perfectly uniform. Machines generate text linearly; humans write in bursts followed by pauses.' 
    },
    insight: 'The structural integrity is "too perfect," matching the statistical peaks of GPT-4 training weights.'
  },
  forensic_deep_dive: {
    structural_monotony: {
      label: 'Rhythmic Uniformity Detected',
      description: 'The mathematical rhythm of your sentences is near-identical. There is a lack of "staccato" human variation.'
    },
    fact_verification: {
      status: 'Generic Implementation',
      insight: 'References to "Calvin Cycle" and "photolysis" are used in a technically perfect but generic encyclopedic manner, lacking specific human insight or localized context.'
    },
    turing_friction: {
      connective_tissue_count: 5,
      detected_tokens: ['Subsequently', 'Specifically', 'Furthermore', 'Consequently', 'Specifically'],
      explanation: 'Connective tissue placement is statistically over-optimized. These transitions appear at calculated intervals typical of LLM logic chains.'
    }
  },
  humanization_roadmap: [
    "Inject 'Human Noise': Intentionally break the perfect sentence length. Mix very short (4-5 word) sentences with complex ones to introduce rhythmic variety.",
    "Organic Variance: Replace formal transitions like 'Subsequently' or 'Moreover' with more casual or varied human speech patterns like 'Then again' or simple 'Next'.",
    "Cognitive Scars: Introduce personal analogies or specific local citations that a general LLM training set wouldn't prioritize as the 'optimal' next token."
  ],
  evidence: {
    ai_patterns: ['Uniform sentence structure', 'Perfect grammatical consistency', 'Zero idiosyncratic errors'],
    human_signals: [],
    dominance_explanation: 'Statistical patterns across the entire sample align with the "Optimal Path" logic of transformer-based models.'
  },
  verdict_bullets: ['99.2% Statistical Alignment', 'Lack of Syntactic Variety', 'Mechanical Transition Density'],
  recommendations: [
    "Verify if an AI drafting tool was used for the initial technical summary, as the syntactic density matches a prompt-engineered output.",
    "Search for unique personal anecdotes or non-standard analogies; if absent, the technical reliability of the authorship remains questionable."
  ],
  heatmap_annotations: PHOTOSYNTHESIS_ESSAY.split('.').map((sentence, i) => {
    const start = PHOTOSYNTHESIS_ESSAY.indexOf(sentence);
    return {
      start_index: start,
      end_index: start + sentence.length,
      label: "AI_PATTERN",
      color: "red",
      tooltip_title: "Robotic Syntax",
      tooltip_explanation: "This sentence exhibits uniform clause structure and token probability typical of AI."
    } as HeatmapAnnotation;
  })
};

export const AnalysisTool = forwardRef<any, AnalysisToolProps>(({ 
  user, 
  credits, 
  onUpdateCredits,
  guestCredits,
  onUpdateGuestCredits,
  showLimitModal
}, ref) => {
  const [selectedContext, setSelectedContext] = useState<AnalysisContext>(null);
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ForensicReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Feedback State
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    runSample: () => {
      setSelectedContext('GENERAL');
      setText(PHOTOSYNTHESIS_ESSAY);
      setReport(STATIC_SAMPLE_REPORT);
      setError(null);
      setCurrentAnalysisId(null);
    }
  }));

  const handleContextSelect = (ctx: AnalysisContext) => {
    setSelectedContext(ctx);
    setTimeout(() => {
      inputAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const extension = file.name.split('.').pop()?.toLowerCase();

    try {
      if (extension === 'txt') {
        const content = await file.text();
        setText(content);
      } else if (extension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value);
      } else if (extension === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items
            .map((item: any) => item.str)
            .join(' ') + '\n';
        }
        setText(fullText.trim());
      } else {
        setError('Unsupported file format. Please upload PDF, DOCX, or TXT.');
      }
    } catch (err: any) {
      console.error("File Extraction Error:", err);
      setError('Failed to extract text from file.');
    }
  };

  const handleAnalyze = async () => {
    const availableCredits = user ? credits : guestCredits;
    if (availableCredits < 2) {
      if (!user) showLimitModal();
      else setError('Insufficient credits. Each analysis requires 2 credits.');
      return;
    }
    if (!text.trim() || text.length < 50) {
      setError('Minimum 50 characters required for audit.');
      return;
    }
    
    setIsAnalyzing(true);
    setReport(null);
    setError(null);
    setFeedbackSent(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Perform an advanced forensic authorship audit. 
        CONTEXT: ${selectedContext} environment.
        INPUT TEXT: "${text}"`,
        config: {
          systemInstruction: `You are Verify AI’s Chief Forensic Investigator.
          CRITICAL: Your 'heatmap_annotations' MUST correlate perfectly with the 'score'. 
          If score is 90%+, highlight ~90% of the text as AI_PATTERN. 
          Provide a 'forensic_deep_dive' for any scores above 90%.
          
          ANALYSIS LAYERS:
          1. Structural Monotony: Check if sentences have similar mathematical rhythm ('Rhythmic Uniformity').
          2. Fact-Verification: Determine if citations/mentions show 'generic usage' vs 'deep human insight'.
          3. Turing Friction: Highlight 'High-Frequency Connective Tissue' (e.g., Furthermore, Moreover) and explain that their placement is statistically over-optimized.
          4. Humanization Roadmap: Provide 3 specific tips to intro 'Human Noise' and 'Organic Variance'.

          JSON SCHEMA:
          {
            "score": number (0-100),
            "confidence": "Low" | "Medium" | "High",
            "verdict": "Likely Human-Written" | "Likely AI-Generated" | "AI-Assisted (Hybrid)",
            "plain_language_meaning": "string",
            "pattern_insights": "string (2-3 lines)",
            "key_observations": ["string"],
            "stats": {
              "sentence_variance": { "result": "string", "interpretation": "string" },
              "lexical_density": { "result": "string", "interpretation": "string" },
              "burstiness": { "result": "string", "interpretation": "string" },
              "insight": "string"
            },
            "forensic_deep_dive": {
              "structural_monotony": { "label": "string", "description": "string" },
              "fact_verification": { "status": "string", "insight": "string" },
              "turing_friction": { "connective_tissue_count": number, "detected_tokens": ["string"], "explanation": "string" }
            },
            "humanization_roadmap": ["string (3 points)"],
            "heatmap_annotations": [
              {
                "start_index": number,
                "end_index": number,
                "label": "AI_PATTERN" | "HUMAN_PATTERN",
                "color": "red" | "blue",
                "tooltip_title": "string",
                "tooltip_explanation": "string"
              }
            ],
            "recommendations": ["string (Point 1)", "string (Point 2)"]
          }`,
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || '{}') as ForensicReportData;
      setReport(data);

      // Successfully generated report, now deduct credits
      if (user) {
        const { data: analysisData, error: saveError } = await supabase
          .from('analyses')
          .insert({
            user_id: user.id,
            input_text: text,
            report_data: data,
            score: data.score,
            verdict: data.verdict,
            context: selectedContext
          })
          .select().single();

        if (!saveError) setCurrentAnalysisId(analysisData.id);
        await supabase.from('user_credits').update({ credits: credits - 2 }).eq('user_id', user.id);
        onUpdateCredits();
      } else {
        onUpdateGuestCredits(guestCredits - 2);
      }
    } catch (err: any) {
      console.error(err);
      setError('Analysis failed. Check your connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const submitFeedback = async () => {
    if (rating === 0) return;
    try {
      await supabase.from('analysis_feedback').insert({
        analysis_id: currentAnalysisId,
        rating,
        comment: feedback,
        user_id: user?.id
      });
      setFeedbackSent(true);
    } catch (e) {
      console.error(e);
    }
  };

  const renderHeatmap = () => {
    if (!report || !text) return null;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    const sorted = [...report.heatmap_annotations].sort((a, b) => a.start_index - b.start_index);
    
    sorted.forEach((anno, idx) => {
      if (anno.start_index > lastIndex) {
        elements.push(<span key={`txt-${idx}`}>{text.substring(lastIndex, anno.start_index)}</span>);
      }
      const colorClass = anno.color === 'red' ? 'bg-red-500/20 border-b-2 border-red-500/60' : 'bg-blue-500/20 border-b-2 border-blue-500/60';
      elements.push(
        <span key={`anno-${idx}`} className={`relative group cursor-help transition-all px-0.5 rounded-sm ${colorClass}`}>
          {text.substring(anno.start_index, anno.end_index)}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-[110] w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl pointer-events-none">
             <p className={`text-[10px] font-black mb-1 mono uppercase ${anno.color === 'red' ? 'text-red-400' : 'text-blue-400'}`}>{anno.tooltip_title}</p>
             <p className="text-[11px] text-slate-300 leading-normal">{anno.tooltip_explanation}</p>
          </div>
        </span>
      );
      lastIndex = anno.end_index;
    });
    if (lastIndex < text.length) elements.push(<span key="txt-end">{text.substring(lastIndex)}</span>);
    return elements;
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPDF(true);

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#020617',
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('report-view');
          if (clonedElement) {
            clonedElement.style.height = 'auto';
            clonedElement.style.padding = '60px';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      let heightLeft = imgScaledHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgScaledWidth, imgScaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgScaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgScaledWidth, imgScaledHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`verify_ai_audit_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF Generation Error:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const contextOptions = [
    { id: 'HR', title: 'Resume / Job App', desc: 'For HR teams evaluating candidate submissions.', icon: '💼', tag: 'HR Focus' },
    { id: 'EDUCATION', title: 'Academic Assignment', desc: 'For educators assessing student work integrity.', icon: '🎓', tag: 'Education' },
    { id: 'MARKETING', title: 'Marketing / Brand', desc: 'For reviewing promotional and brand content.', icon: '📢', tag: 'Creative' },
    { id: 'GENERAL', title: 'General Writing', desc: 'For any other content type or prose.', icon: '✏️', tag: 'Flexible' },
  ];

  return (
    <div className="space-y-24 max-w-6xl mx-auto">
      {/* CONTEXT SELECTION UI */}
      <section className="text-center space-y-12 animate-in fade-in duration-700">
        <div className="space-y-4">
          <h2 className="text-6xl font-black text-white tracking-tight uppercase">Start Your Analysis</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select a content context to begin. This affects analysis tone and recommendations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contextOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleContextSelect(opt.id as AnalysisContext)}
              className={`group p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 transition-all border-2 relative ${
                selectedContext === opt.id 
                ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.02]' 
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="text-4xl mb-2 transition-transform group-hover:scale-125 duration-300">{opt.icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white leading-tight">{opt.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mono transition-all ${
                selectedContext === opt.id ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-500'
              }`}>
                {opt.tag}
              </div>
            </button>
          ))}
        </div>
      </section>

      {!report && selectedContext && (
        <div ref={inputAreaRef} className="space-y-12 animate-in slide-in-from-bottom-12 duration-500">
          <div className="bg-[#020617]/40 border border-slate-800 rounded-[3rem] overflow-hidden backdrop-blur-sm relative group shadow-2xl">
            <div className="flex border-b border-slate-800">
              <button onClick={() => setActiveTab('paste')} className={`flex-1 py-5 flex items-center justify-center gap-2 font-bold text-sm transition-all ${activeTab === 'paste' ? 'bg-slate-800/50 text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}>📋 Paste Text</button>
              <button onClick={() => setActiveTab('upload')} className={`flex-1 py-5 flex items-center justify-center gap-2 font-bold text-sm transition-all ${activeTab === 'upload' ? 'bg-slate-800/50 text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}>📁 Upload File</button>
            </div>
            <div className="p-12">
              {activeTab === 'paste' ? (
                <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value)} 
                  placeholder={`Paste ${selectedContext.toLowerCase()} content for forensic audit (2 credits per scan)...`} 
                  className="w-full h-96 bg-transparent text-slate-200 placeholder:text-slate-800 focus:outline-none resize-none mono text-base leading-relaxed" 
                />
              ) : (
                <div className="w-full h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20 hover:border-emerald-500/30 transition-all">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.txt" />
                  <div className="text-center space-y-6">
                    <div className="text-6xl">📄</div>
                    <div className="space-y-2">
                      <p className="text-white text-xl font-bold">Upload document</p>
                      <button onClick={() => fileInputRef.current?.click()} className="px-12 py-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-black rounded-xl border border-slate-700 uppercase tracking-widest mt-4">Select File</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 pb-24">
            <button onClick={handleAnalyze} disabled={isAnalyzing || !text.trim()} className={`px-24 py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl ${isAnalyzing || !text.trim() ? 'bg-slate-800 text-slate-600' : 'bg-emerald-500 hover:bg-emerald-400 text-[#020617]'}`}>
              {isAnalyzing ? 'Scanning Ecosystem...' : 'Run Forensic Audit'}
            </button>
            <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.3em] mono">Deducts 2 Credits</p>
          </div>
          {error && <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-bold">⚠️ {error}</div>}
        </div>
      )}

      {isAnalyzing && (
        <div className="fixed inset-0 z-[100] bg-[#020617]/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-12">
           <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🔍</div>
           </div>
           <div className="text-center space-y-2">
             <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Audit in Progress</h3>
             <p className="text-emerald-500 font-bold mono text-sm animate-pulse tracking-widest">[estimated time 20sec.......]</p>
           </div>
        </div>
      )}

      {report && (
        <div id="report-view" ref={reportRef} className="animate-in slide-in-from-bottom-12 duration-1000 space-y-12 pb-32">
          <div className="p-1 rounded-[3.5rem] bg-gradient-to-br from-slate-800 to-black border border-slate-800 shadow-3xl overflow-hidden">
            <div className="bg-[#020617]/95 p-8 md:p-16 lg:p-20 space-y-20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-16 border-b border-white/5 pb-20">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mono">AI Alignment Vector</h3>
                  <div className="flex flex-col gap-3">
                    <span className={`text-9xl font-black tracking-tighter ${report.score > 50 ? 'text-red-500' : 'text-emerald-500'}`}>{report.score}%</span>
                    <div className="inline-flex px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-sm font-bold mono uppercase">
                       <span className="text-slate-400 mr-2">Verdict:</span>
                       <span className={report.score > 50 ? 'text-red-400' : 'text-emerald-400'}>{report.verdict}</span>
                    </div>
                  </div>
                </div>
                <div className="max-w-md space-y-4">
                  <h4 className="text-emerald-400 text-xs font-black uppercase tracking-widest mono">Pattern Insights</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">{report.pattern_insights}</p>
                </div>
              </div>

              {/* FORENSIC DEEP-DIVE SECTION */}
              <section className="space-y-10">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mono">Forensic Deep-Dive (Advanced Metrics)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 space-y-4 group hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] group-hover:scale-110 transition-transform">📏</span>
                         <h4 className="text-white font-bold text-sm uppercase mono">Structural Monotony</h4>
                      </div>
                      <p className="text-red-400 font-black text-xs uppercase mono">{report.forensic_deep_dive.structural_monotony.label}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{report.forensic_deep_dive.structural_monotony.description}</p>
                   </div>

                   <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 space-y-4 group hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] group-hover:scale-110 transition-transform">📋</span>
                         <h4 className="text-white font-bold text-sm uppercase mono">Fact Verification</h4>
                      </div>
                      <p className="text-blue-400 font-black text-xs uppercase mono">{report.forensic_deep_dive.fact_verification.status}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{report.forensic_deep_dive.fact_verification.insight}</p>
                   </div>

                   <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 space-y-4 group hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] group-hover:scale-110 transition-transform">⚙️</span>
                         <h4 className="text-white font-bold text-sm uppercase mono">Turing Friction</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {report.forensic_deep_dive.turing_friction.detected_tokens.map((token, i) => (
                           <span key={i} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-[10px] rounded text-slate-300 mono">{token}</span>
                         ))}
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{report.forensic_deep_dive.turing_friction.explanation}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mono">Forensic Heatmap</h3>
                  <div className="flex items-center gap-4 sm:gap-6 bg-slate-900/40 px-6 py-2 rounded-full border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500/40 border border-red-500/60 rounded-sm"></div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase mono">High AI Prob.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500/40 border border-blue-500/60 rounded-sm"></div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase mono">Human signal</span>
                    </div>
                  </div>
                </div>
                <div className="p-10 md:p-16 rounded-[3rem] bg-slate-900/20 border border-slate-800 text-slate-200 leading-[2.6] text-lg md:text-xl font-medium shadow-2xl relative">
                  {renderHeatmap()}
                </div>
              </section>

              {/* HUMANIZATION ROADMAP SECTION */}
              <section className="space-y-10">
                 <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mono">Humanization Roadmap (Author Recovery)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {report.humanization_roadmap.map((tip, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4 group hover:bg-emerald-500/10 transition-all">
                         <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-xs">0{i+1}</div>
                         <p className="text-slate-300 text-sm leading-relaxed font-medium">{tip}</p>
                      </div>
                    ))}
                 </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
                 <section className="space-y-8 p-10 bg-slate-900/40 rounded-[2.5rem] border border-white/5">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mono">Context Recommendations</h3>
                    <ul className="space-y-6">
                       {report.recommendations.map((rec, i) => (
                         <li key={i} className="flex gap-4 items-start">
                           <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[10px] font-bold mt-1">0{i+1}</div>
                           <p className="text-sm text-slate-300 leading-relaxed font-medium">{rec}</p>
                         </li>
                       ))}
                    </ul>
                 </section>
                 
                 <section className="space-y-8 p-10 bg-emerald-500/5 rounded-[2.5rem] border border-emerald-500/10">
                    <h3 className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.3em] mono">Forensic Feedback</h3>
                    {feedbackSent ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                         <div className="text-3xl">✅</div>
                         <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Report confirmed. Thank you.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex gap-2">
                           {[1,2,3,4,5].map(s => (
                             <button key={s} onClick={() => setRating(s)} className={`w-10 h-10 rounded-lg transition-all border font-bold ${rating >= s ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                               {s}
                             </button>
                           ))}
                        </div>
                        <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Tell us about the accuracy..." className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs focus:outline-none focus:border-emerald-500/50" />
                        <button onClick={submitFeedback} className="px-8 py-3 bg-emerald-500 text-black font-black text-xs rounded-lg uppercase tracking-widest hover:bg-emerald-400 transition-all">Submit Feedback</button>
                      </div>
                    )}
                 </section>
              </div>

              <div className="flex flex-col md:flex-row gap-8 pt-12">
                <button 
                  onClick={() => { setReport(null); setSelectedContext(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                  className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all uppercase tracking-widest text-xs"
                >
                  New Audit
                </button>
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isGeneratingPDF}
                  className="flex-1 py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl border border-slate-800 uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
                      Compiling Audit...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">📄</span> Download Official Forensic PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});