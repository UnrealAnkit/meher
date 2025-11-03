/// <reference lib="deno.ns" />

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


