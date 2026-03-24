import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  MapPin,
  ArrowLeft,
  HeartPulse,
  Stethoscope
} from 'lucide-react';

// Types
interface FormData {
  name: string;
  email: string;
  phone: string;
}

const Logo = ({ className }: { className?: string }) => {
  const [error, setError] = useState(false);
  
  // Using a text-based logo by default if the provided URL is likely to fail
  // or if an error occurs. This ensures the app always looks branded.
  if (error || !process.env.VITE_LOGO_URL) {
    return (
      <div className={`flex flex-col items-center justify-center py-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-medical-teal rounded-xl flex items-center justify-center shadow-lg shadow-medical-teal/20">
            <Stethoscope className="text-white w-7 h-7" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-visit-navy uppercase leading-none">
            Visit You <span className="text-medical-teal">Medical</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 mt-4 w-full max-w-[240px]">
          <div className="h-1 flex-1 bg-urgent-red/20 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-urgent-red" />
          </div>
          <HeartPulse className="w-5 h-5 text-urgent-red animate-pulse" />
          <div className="h-1 flex-1 bg-urgent-red/20 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-urgent-red ml-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={process.env.VITE_LOGO_URL} 
      alt="Visit You Medical Logo" 
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  // Highlevel URLs from environment
  const HIGHLEVEL_CALENDAR_URL = process.env.VITE_HIGHLEVEL_CALENDAR_URL || "https://link.growth-engine.com/widget/booking/placeholder";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4 sm:px-6 no-scrollbar overflow-y-auto">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 no-scrollbar"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-12 w-full max-w-lg"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full"
              >
                <Logo className="w-full h-auto" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex flex-col items-center text-center"
              >
                <h2 className="text-xl font-bold text-visit-navy tracking-[0.2em] uppercase">
                  No More Waiting Rooms
                </h2>
                <div className="w-32 h-1.5 bg-medical-teal mt-6 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Logo Section */}
      <header className="w-full max-w-2xl mb-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <Logo className="w-full max-w-sm h-auto" />
        </motion.div>
      </header>

      <main className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full no-scrollbar"
        >
          <div className="glass-card rounded-3xl overflow-hidden min-h-[700px] flex flex-col no-scrollbar">
            <div className="p-6 bg-medical-teal text-white flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Schedule Your Visit</h2>
                <p className="text-white/80 text-sm">Professional mobile urgent care</p>
              </div>
              <HeartPulse className="w-8 h-8 text-white/50" />
            </div>
            <div className="flex-1 bg-white no-scrollbar overflow-hidden">
              <iframe
                src={HIGHLEVEL_CALENDAR_URL}
                style={{ 
                  width: 'calc(100% + 20px)', 
                  height: '800px', 
                  border: 'none',
                  marginRight: '-20px'
                }}
                title="Schedule Appointment"
                className="no-scrollbar"
              />
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Visit You Medical. All rights reserved.</p>
        <p className="mt-1">Providing professional mobile urgent care services.</p>
      </footer>
    </div>
  );
}
