import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface GetStartedModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ service, onClose }) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div 
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="modal-content"
        className="relative w-full max-w-md bg-[#12141a] text-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#a8f300]/20 text-[#a8f300] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-geist">
              Inquiry Received
            </h3>
            <p className="text-sm text-neutral-400 font-geist max-w-xs mx-auto">
              Our team will reach out to you shortly regarding your <strong>{service.title}</strong> collaboration.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 text-xs font-bold text-black bg-[#a8f300] hover:bg-[#bbf628] rounded-full transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-block text-[11px] font-semibold text-[#a8f300] tracking-wider uppercase">
                {service.pill}
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white font-geist">
                {service.title}
              </h3>
              <p className="text-xs text-neutral-400 font-geist">
                {service.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 font-geist">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:outline-none focus:border-[#a8f300] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 font-geist">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Studios"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:outline-none focus:border-[#a8f300] transition"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Initiate Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
