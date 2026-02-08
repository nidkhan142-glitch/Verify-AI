import React, { useState, useEffect, useRef } from 'react';
// These files are sitting in your main folder, so we use './'
import { Header } from './Header';
import { Hero } from './Hero';
import { Manifesto } from './Manifesto';
import { HowItWorks } from './HowItWorks';
import { TeamsSection } from './TeamsSection';
import { StatsSection } from './StatsSection';
import { AnalysisTool } from './AnalysisTool';
import { History } from './History';
import { AuthModals } from './AuthModals';
import { LimitReachedModal } from './LimitReachedModal';
import { supabase } from './supabase';

// IMPORTANT: Import your CSS so the site isn't just white text
import './index.css';
export default App;
