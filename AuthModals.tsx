
import React, { useState } from 'react';
import { AuthMode } from '../App';
import { supabase } from '../supabase';

interface AuthModalsProps {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (!loading) setMode(AuthMode.NONE);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === AuthMode.SIGNUP) {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          // Initialize credits (e.g., 30 free credits)
          await supabase.from('user_credits').insert({
            user_id: authData.user.id,
            credits: 30
          });
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
      }
      setMode(AuthMode.NONE);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#080d1f] border border-slate-800 rounded-2xl p-8 relative shadow-2xl overflow-hidden">
        <button 
          onClick={handleClose}
          disabled={loading}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-3xl font-bold text-center text-white">
            {mode === AuthMode.LOGIN ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleAuth} className="space-y-5">
            {mode === AuthMode.SIGNUP && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 block ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-[#0d152b] border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 block ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#0d152b] border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 block ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === AuthMode.LOGIN ? '........' : 'Min 6 characters'}
                required
                className="w-full bg-[#0d152b] border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            {mode === AuthMode.SIGNUP && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 block ml-1">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full bg-[#0d152b] border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            )}

            {error && <p className="text-xs text-red-500 font-bold px-1">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#48ffcc] hover:bg-[#3de0b3] text-[#020617] font-black rounded-xl transition-all shadow-lg text-lg mt-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (mode === AuthMode.LOGIN ? 'Log In' : 'Create Account')}
            </button>
          </form>

          <div className="text-center space-y-4">
             {mode === AuthMode.SIGNUP && (
               <p className="text-slate-500 text-xs leading-relaxed px-6">
                 We never share your email. Unsubscribe anytime.
               </p>
             )}
             <p className="text-slate-500 text-sm">
               {mode === AuthMode.LOGIN ? "Don't have an account? " : "Already have an account? "}
               <button 
                 onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN)} 
                 className="text-[#48ffcc] font-bold hover:underline"
                >
                  {mode === AuthMode.LOGIN ? 'Sign up' : 'Login'}
               </button>
             </p>
          </div>
        </div>

        {mode === AuthMode.SIGNUP && (
          <div className="absolute top-10 right-0 bottom-10 w-1 bg-[#48ffcc] rounded-l-full"></div>
        )}
      </div>
    </div>
  );
};
