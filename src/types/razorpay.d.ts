interface RazorpayOptions {
  key: string;
  amount: number; // Integer in smallest currency subunit (mandatory) - Razorpay API accepts both number and string, but number is recommended
  currency: string;
  name: string;
  description: string;
  image?: string; // Logo image URL to display in checkout modal
  order_id: string;
  handler: (response: RazorpayResponse) => void | Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  callback_url?: string;
  timeout?: number; // Checkout timeout in seconds
  [key: string]: any; // Allow additional Razorpay options
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface Razorpay {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => Razorpay;
  }
}

export {};

