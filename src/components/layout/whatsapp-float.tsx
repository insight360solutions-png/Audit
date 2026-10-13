import { WhatsappIcon } from "@/components/ui/brand-icons";
import { routes } from "@/config/routes";

/** Floating WhatsApp button pinned to the bottom-right of every page. */
export function WhatsappFloat() {
  return (
    <a
      href={routes.whatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex flex-row-reverse items-center gap-3 print:hidden"
    >
      <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.7)] transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping motion-reduce:hidden [animation-duration:2.4s]" aria-hidden />
        <WhatsappIcon className="relative size-7" />
      </span>
      <span className="pointer-events-none hidden translate-x-1 rounded-full bg-navy-950 px-3.5 py-2 text-sm font-semibold text-white opacity-0 shadow-card transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
