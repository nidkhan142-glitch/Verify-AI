
import React from 'react';

export const Engineering: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mono mb-4">
          Phase 02: Component Engineering
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
          Process Evidence Engine (PEE)
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          The PEE is Verify AI's most critical forensic layer. It separates actual authorship from content generation by analyzing the temporal and behavioral artifacts of the creation event.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The 20% Deterministic Rule-Base */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-1 rounded-2xl bg-gradient-to-b from-emerald-500/20 to-transparent border border-emerald-500/30">
            <div className="bg-slate-950 p-6 rounded-[calc(1rem-1px)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-xs mono">Deterministic Layer (20%)</h3>
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20 mono">HARD-CODED LOGIC</span>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Instantaneous Payload Detection
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Identifies "zero-latency" events where >50 characters appear in &lt;10ms. Flagging as high-probability <strong>paste behavior</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Biological Bound Validation
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filters against the "Human Maximum" (approx. 150 WPM). Sustained rates above 200 WPM without revision scars trigger automatic synthetic flags.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Temporal Complexity Correlation
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deterministic mapping of inter-word pauses against word frequency (Zipf's Law). Genuine human thought requires longer latency before rare or complex tokens.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Jitter Integrity Audit
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Detects "perfectly imperfect" logs. Real human jitter is non-linear; machine-generated jitter often reveals underlying periodic signals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h4 className="text-slate-300 font-bold text-xs uppercase tracking-widest mb-3 mono">Evidence Integrity</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              This layer is non-generative. Every flag raised here must be accompanied by a raw data dump (timestamps, deltas) for third-party audit.
            </p>
          </div>
        </div>

        {/* Right Column: The 80% Generative Intelligence */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-1 rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent border border-blue-500/30">
            <div className="bg-slate-950 p-8 rounded-[calc(1rem-1px)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-blue-400 font-bold uppercase tracking-wider text-xs mono">API-Assisted Analysis (80%)</h3>
                <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 mono">LLM-POWERED ENGINE</span>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">01</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Rhythm-Persona Alignment</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Leverages LLM reasoning to determine if the typing cadence matches the linguistic complexity. Does a professional legal tone emerge with the "hesitant" rhythm of a novice author?
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">02</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Cognitive Revision Mapping</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Analyzes *why* a revision happened. Generative models distinguish between "superficial" corrections (typos) and "structural" shifts (rethinking a paragraph's logic), which is the hallmark of human cognition.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">03</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Adversarial Log Verification</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      The engine attempts to simulate the provided logs using known bypass techniques. If the model can easily replicate the provided "human" pattern using a prompt, the confidence score is penalized.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">04</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Cross-Model Consistency Audit</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Statistical interpretation of how closely the output follows the specific token-path of models like GPT-4, Claude 3.5, or Llama 3, identifying "Model DNA" markers in the final synthesis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-blue-200 font-bold text-sm mb-1">The Hybrid Advantage</h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                By combining deterministic "biological physical limits" with generative "linguistic reasoning," the PEE can identify sophisticated AI-generated content that has been manually "jittered" to bypass simple detectors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Data Flow Visualizer */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          PEE Logic Flow
          <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500 mono">DATA_TRAJECTORY</span>
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between relative">
          <div className="z-10 bg-slate-950 border border-slate-700 p-4 rounded-lg w-full md:w-48 text-center shadow-xl">
            <span className="block text-[10px] text-slate-500 mb-1 mono">RAW_INPUT</span>
            <span className="text-xs font-bold text-white">Event Stream</span>
          </div>
          <div className="hidden md:block h-0.5 flex-1 bg-slate-800"></div>
          <div className="z-10 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg w-full md:w-48 text-center shadow-xl">
            <span className="block text-[10px] text-emerald-500 mb-1 mono">VALIDATOR</span>
            <span className="text-xs font-bold text-white">Rule-Base (20%)</span>
          </div>
          <div className="hidden md:block h-0.5 flex-1 bg-slate-800"></div>
          <div className="z-10 bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg w-full md:w-48 text-center shadow-xl">
            <span className="block text-[10px] text-blue-500 mb-1 mono">INTERPRETER</span>
            <span className="text-xs font-bold text-white">LLM-Base (80%)</span>
          </div>
          <div className="hidden md:block h-0.5 flex-1 bg-slate-800"></div>
          <div className="z-10 bg-slate-50 border border-white p-4 rounded-lg w-full md:w-48 text-center shadow-xl">
            <span className="block text-[10px] text-slate-500 mb-1 mono">OUTPUT</span>
            <span className="text-xs font-bold text-slate-900 uppercase">Audit Trail</span>
          </div>
        </div>
      </div>
    </div>
  );
};
