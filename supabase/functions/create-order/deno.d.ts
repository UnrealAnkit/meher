

declare namespace Deno {
  export namespace core {
    export function opAsync(op: string, ...args: unknown[]): Promise<unknown>;
  }

  export function serve(
    handler: (req: Request) => Response | Promise<Response>
  ): void;

  export namespace env {
    export function get(key: string): string | undefined;
    export function set(key: string, value: string): void;
  }
}

declare module "npm:razorpay" {
  interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  interface OrderCreateOptions {
    amount: number;
    currency: string;
    receipt?: string;
  }

  interface Order {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    created_at: number;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    orders: {
      create(options: OrderCreateOptions): Promise<Order>;
    };
  }

  export default Razorpay;
}

