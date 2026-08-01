import { MessageCircle, LifeBuoy, GraduationCap, Instagram, Facebook, Linkedin, Globe, type LucideIcon } from "lucide-react";
import { AccentModal } from "@/components/verbo/ui";
import contactIcon from "@/assets/contact.svg.asset.json";
import { openContactModal, closeContactModal, useContactModalOpen } from "@/lib/contact-modal";

interface ContactOption {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

/**
 * The two wa.link URLs already carry their own prescribed message on Verbo's
 * side — they are used verbatim, no message is built here.
 */
const OPTIONS: ContactOption[] = [
  { label: "Support", description: "Account, billing, or platform questions", href: "https://wa.link/zomggz", icon: LifeBuoy, color: "#5fca16" },
  { label: "Academic team", description: "Questions about your classes or content", href: "https://wa.link/638ofg", icon: GraduationCap, color: "#01304a" },
  { label: "Instagram", description: "See what we're up to", href: "https://www.instagram.com/verbo_language_solutions", icon: Instagram, color: "#a34ac0" },
  { label: "Facebook", description: "See what we're up to", href: "https://www.facebook.com/people/Verbo-Language-Solutions/61576604487318/", icon: Facebook, color: "#1877f2" },
  { label: "LinkedIn", description: "Connect with us", href: "https://www.linkedin.com/company/verbo-language-solutions/", icon: Linkedin, color: "#0a66c2" },
  { label: "Our website", description: "Learn more about Verbo", href: "https://verbolanguagesolutions.com/", icon: Globe, color: "#f38934" },
];

/** Navbar trigger — reused in the Student, Teacher and Admin panels. */
export function ContactVerbotButton({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <button
      type="button"
      onClick={openContactModal}
      aria-label="Contact VERBOT"
      title="Contact VERBOT"
      className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-out hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fca16]/70 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      {/* Subtle lime glow behind the icon on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: "0 0 18px 6px rgba(95,202,22,0.35)", backgroundColor: "rgba(95,202,22,0.14)" }}
      />
      <img
        src={contactIcon.url}
        alt=""
        aria-hidden
        className={`relative h-8 w-8 select-none object-contain ${variant === "dark" ? "" : ""}`}
      />
    </button>
  );
}

/** Single instance is mounted at the app root; opened through the global store. */
export function ContactVerbotModal() {
  const open = useContactModalOpen();
  if (!open) return null;

  return (
    <AccentModal
      background="linear-gradient(135deg, #01304a 0%, #024a6e 100%)"
      iconTint="#ffffff"
      icon={MessageCircle}
      eyebrow="Contact VERBOT"
      title="Need help or want to say hi?"
      watermark={{ text: "HELLO" }}
      onClose={closeContactModal}
      maxWidth="max-w-lg"
      zClass="z-[70]"
    >
      <div className="grid gap-3 p-5 sm:grid-cols-2">
        {OPTIONS.map((o) => (
          <a
            key={o.label}
            href={o.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl p-3 text-left text-white transition-transform duration-200 ease-out hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:hover:scale-100"
            style={{ backgroundColor: o.color }}
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            >
              <o.icon className="h-4.5 w-4.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight">{o.label}</span>
              <span className="block text-[11px] leading-snug opacity-90">{o.description}</span>
            </span>
          </a>
        ))}
      </div>
    </AccentModal>
  );
}
