import { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CreditCard, Loader2 } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  bookingId?: string;
}

export function PaymentForm({
  amount,
  onSuccess,
  onError,
  bookingId,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || 'Une erreur est survenue');
        setIsProcessing(false);
        return;
      }

      // Create payment intent on your backend (for production)
      // For now, we'll use Stripe's test mode with client-side confirmation
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking?success=true`,
          payment_method_data: {
            billing_details: {
              // You can add billing details here if needed
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Le paiement a échoué');
        onError(error.message || 'Le paiement a échoué');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      const errorMsg = err?.message || 'Une erreur inattendue est survenue';
      setErrorMessage(errorMsg);
      onError(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Paiement Sécurisé</h3>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              ${amount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total à payer</div>
          </div>
        </div>

        <div className="mb-4">
          <PaymentElement
            options={{
              layout: 'tabs',
            }}
          />
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/30"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Traitement du paiement...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Payer ${amount.toLocaleString()}</span>
            </>
          )}
        </button>

        <p className="mt-4 text-xs text-gray-400 text-center">
          🔒 Paiement sécurisé par Stripe. Vos informations de carte ne sont jamais stockées sur nos serveurs.
        </p>
      </div>
    </form>
  );
}
