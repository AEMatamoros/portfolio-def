export type SendContactResult =
  | { ok: true }
  | { ok: false; reason: "timeout" | "network" | "http"; status?: number };

/** POSTs `{ html }` as JSON and aborts the request after `timeoutMs`. */
export async function sendContactMessage(
  endpoint: string,
  html: string,
  timeoutMs = 10_000,
): Promise<SendContactResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
      signal: controller.signal,
    });
    return response.ok
      ? { ok: true }
      : { ok: false, reason: "http", status: response.status };
  } catch {
    return {
      ok: false,
      reason: controller.signal.aborted ? "timeout" : "network",
    };
  } finally {
    clearTimeout(timer);
  }
}
