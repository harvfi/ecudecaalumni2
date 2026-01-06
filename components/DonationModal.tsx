import React, { useState, useEffect } from 'react';
import { X, Heart, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('25');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentSupported, setPaymentSupported] = useState(false);

  useEffect(() => {
    if (window.PaymentRequest) {
      setPaymentSupported(true);
    }
  }, []);

  const handleNativePayment = async () => {
    if (!window.PaymentRequest) {
      alert("Digital wallet payments are not supported in this browser. Please try Safari for Apple Pay.");
      return;
    }

    const supportedInstruments = [
      {
        supportedMethods: 'https://apple.com/apple-pay',
        data: {
          version: 3,
          merchantIdentifier: 'merchant.com.ecu.deca',
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
          countryCode: 'US',
        },
      },
      {
        supportedMethods: 'basic-card',
        data: {
          supportedNetworks: ['visa', 'mastercard', 'amex'],
        }
      }
    ];

    const details = {
      total: {
        label: 'Donation to ECU DECA Alumni',
        amount: { currency: 'USD', value: amount },
      },
      displayItems: [
        {
          label: 'Alumni Chapter Support',
          amount: { currency: 'USD', value: amount },
        },
      ],
    };

    try {
      const request = new PaymentRequest(supportedInstruments, details);
      
      setIsProcessing(true);
      const response = await request.show();
      
      // In a real app, you would send response.details to your server/Stripe
      console.log('Payment Response:', response);
      
      // Simulate server processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await response.complete('success');
      setIsSuccess(true);
    } catch (err) {
      console.error('Payment Error:', err);
      // If user cancels, we just stop processing
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ecu-darkPurple/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
        {isSuccess ? (
          <div className="p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-ecu-darkPurple font-serif mb-2">Thank You, Pirate!</h2>
            <p className="text-gray-600 mb-8">
              Your donation of <span className="font-bold">${amount}</span> has been received. Your support helps us provide scholarships and travel grants for current ECU DECA members.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-ecu-purple text-white py-3 rounded-xl font-bold hover:bg-ecu-darkPurple transition-colors"
            >
              Back to Community
            </button>
          </div>
        ) : (
          <>
            <div className="bg-ecu-purple p-6 text-white flex justify-between items-center">
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-ecu-gold fill-ecu-gold" />
                <h3 className="text-xl font-bold font-serif">Support the Chapter</h3>
              </div>
              <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 text-sm mb-6">
                Your contribution directly funds student travel to the International Career Development Conference (ICDC).
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {['25', '50', '100'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-3 rounded-lg border-2 font-bold transition-all ${
                      amount === val 
                        ? 'border-ecu-purple bg-ecu-purple text-white shadow-md' 
                        : 'border-gray-200 text-gray-600 hover:border-ecu-gold'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              <div className="relative mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Other amount"
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-ecu-purple font-bold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button
                onClick={handleNativePayment}
                disabled={isProcessing || !amount}
                className="w-full flex items-center justify-center bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-all shadow-lg disabled:opacity-50 group"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Donate with Apple Pay
                  </>
                )}
              </button>
              
              {!paymentSupported && (
                <p className="mt-3 text-center text-xs text-gray-400">
                  Safari is recommended for the best Apple Pay experience.
                </p>
              )}

              <div className="mt-6 flex items-center justify-center text-xs text-gray-400 space-x-4">
                <div className="flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Secure Transaction
                </div>
                <div>501(c)(3) Nonprofit</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationModal;