import { cn } from "@/lib/utils";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
        {required ? <span className="text-teal-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-navy-900 placeholder:text-slate-500 transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 focus:outline-none aria-[invalid=true]:border-red-400";

export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormStatus({ status, message }: { status: "idle" | "success" | "error"; message?: string }) {
  if (status === "idle" || !message) return null;
  return (
    <div
      role="status"
      className={cn(
        "rounded-xl px-4 py-3 text-sm font-medium",
        status === "success" ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200" : "bg-red-50 text-red-700 ring-1 ring-red-200",
      )}
    >
      {message}
    </div>
  );
}
