import React, { useState } from 'react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateMembership: () => void;
  isMemberActive: boolean;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  onActivateMembership,
  isMemberActive,
}) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [justActivated, setJustActivated] = useState(false);

  if (!isOpen) return null;

  const handleActivate = () => {
    onActivateMembership();
    setJustActivated(true);
    setTimeout(() => {
      setJustActivated(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="bg-[#FFC017] p-8 sm:p-10 border-b border-stone-900 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 text-stone-850 hover:text-black rounded-full hover:bg-black/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-3 max-w-md">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 leading-tight">
              Fuel great writing.
            </h2>
            <p className="text-sm sm:text-base font-sans text-stone-900 leading-relaxed">
              Become a Medium member to read without limits and directly support the thinkers, essayists, and publications you love.
            </p>
          </div>
        </div>

        {/* Content & Plans */}
        <div className="p-8 space-y-6">
          {/* Plan Interval Segmented Control (Allowed functional tab) */}
          <div className="flex items-center justify-center p-1 bg-stone-100 rounded-lg max-w-xs mx-auto">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                billingCycle === 'annual'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Annual ($50/year)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly ($5/month)
            </button>
          </div>

          {/* Value Propositions */}
          <div className="space-y-4 pt-2 text-stone-800 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Read unlimited member stories</p>
                <p className="text-stone-500 text-xs">Unlock every long-form essay and archive across all publications.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Support your favorite writers</p>
                <p className="text-stone-500 text-xs">A portion of your membership goes directly to the writers you spend time with.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Listen to audio narrations</p>
                <p className="text-stone-500 text-xs">Enjoy high-fidelity audio versions of stories on desktop or mobile.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={handleActivate}
              disabled={justActivated}
              className={`w-full py-3.5 text-sm font-semibold rounded-full transition-all cursor-pointer shadow-xs ${
                isMemberActive
                  ? 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  : 'bg-stone-950 hover:bg-stone-850 text-white'
              }`}
            >
              {justActivated
                ? 'Welcome to Medium Membership!'
                : isMemberActive
                ? 'Membership is Active (Renew / Manage)'
                : `Join for ${billingCycle === 'annual' ? '$50 / year' : '$5 / month'}`}
            </button>
            <p className="text-center text-[11px] text-stone-400 mt-2.5">
              Cancel anytime. No lock-in contracts or hidden surcharges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
