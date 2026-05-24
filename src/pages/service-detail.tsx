import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Phone,
  MessageCircle,
  Menu,
  X,
  Droplets,
  ChefHat,
  Building2,
  Waves,
  Trash2,
  Container,
  Warehouse,
  FlaskConical,
  Zap,
  Pipette,
  AlertCircle,
  Mail,
} from "lucide-react";
import { getServiceBySlug, services } from "@/data/services";
import AnimatedBackground from "@/components/AnimatedBackground";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Droplets, ChefHat, Building2, Waves, Trash2, Container, Warehouse, FlaskConical, Zap, Pipette,
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const service = getServiceBySlug(params.slug ?? "");
  const IconComponent = service ? iconMap[service.icon] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setLocation("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setMobileMenuOpen(false);
  };

  const goHome = () => setLocation("/");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service not found</h1>
          <button onClick={goHome} className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer"
        data-testid="link-whatsapp-float"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 px-4 py-3">
        <MessageCircle size={24} />
        <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
      </a>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <button onClick={goHome} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center shadow-md">
              <Droplets size={20} className="text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Clean Enviro Care</span>
              <p className="text-xs text-gray-500 leading-none">UAE Cleaning Specialists</p>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {[{ id: "home", label: "Home" }, { id: "services", label: "Services" }, { id: "about", label: "Why Us" }, { id: "contact", label: "Contact" }].map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} data-testid={`nav-${id}`}
                className="text-sm font-medium text-gray-700 hover:text-green-600 capitalize transition-colors">{label}</button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0582658191" data-testid="link-call-nav"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold text-sm transition-all">
              <Phone size={16} /> 0582658191
            </a>
            <button onClick={() => scrollTo("contact")} data-testid="button-get-quote"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-green-200 transition-all hover:scale-105">
              Get a Quote
            </button>
          </div>

          <button className="lg:hidden p-2 rounded-lg text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-xl">
            {[{ id: "home", label: "Home" }, { id: "services", label: "Services" }, { id: "about", label: "Why Us" }, { id: "contact", label: "Contact" }].map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left py-2 text-gray-700 font-medium hover:text-green-600">{label}</button>
            ))}
            <a href="tel:0582658191" className="flex items-center gap-2 py-2 text-sky-600 font-semibold"><Phone size={16} /> 0582658191</a>
          </motion.div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end pt-20 overflow-hidden">
        {/* Background image */}
        {!imgError ? (
          <img
            src={service.image}
            alt={service.title}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-sky-900" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20" />

        {/* Animated bubbles on hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/20"
              style={{
                width: 16 + i * 12,
                height: 16 + i * 12,
                left: `${10 + i * 11}%`,
                bottom: "-40px",
                animation: `bubble-rise ${8 + i * 1.5}s ${i * 1.2}s ease-in-out infinite`,
                ["--bub-op" as string]: "0.3",
                background: i % 2 === 0 ? "rgba(34,197,94,0.15)" : "rgba(14,165,233,0.15)",
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <button onClick={goHome} className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors group"
            data-testid="button-back">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              {IconComponent && (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center shadow-xl">
                  <IconComponent size={28} className="text-white" />
                </div>
              )}
              <span className="bg-green-500/20 border border-green-400/40 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
                Professional Service
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              {service.title}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mb-8">{service.shortDesc}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("contact")} data-testid="button-hero-quote"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-xl shadow-green-900/40 hover:scale-105 transition-all">
                Get a Free Quote <ArrowRight size={18} />
              </button>
              <a href="tel:0582658191" data-testid="link-call-hero"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold hover:bg-white/20 transition-all">
                <Phone size={18} /> 0582658191
              </a>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* FULL DESCRIPTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-green-100 to-sky-100 blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-sky-100 to-green-100 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">About This Service</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
                Expert {service.title}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500"> in UAE</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.fullDesc}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => scrollTo("contact")} data-testid="button-quote-desc"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg shadow-green-200 hover:scale-105 transition-all">
                  Request This Service <ArrowRight size={16} />
                </button>
                <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer" data-testid="link-whatsapp-desc"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-green-400 text-green-600 font-bold hover:bg-green-50 transition-all">
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Sora, sans-serif" }}>Key Benefits</h3>
                <div className="space-y-4">
                  {service.benefits.map((benefit, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors group">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm leading-relaxed">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">Process</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map(({ step, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
                data-testid={`card-process-${i}`}>
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <ArrowRight size={20} className="text-green-400" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-white font-extrabold text-lg" style={{ fontFamily: "Sora, sans-serif" }}>{i + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "Sora, sans-serif" }}>{step}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-sky-600">
        <AnimatedBackground className="opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Available 24/7
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
              Need This Service Urgently?
            </h2>
            <p className="text-green-100 text-xl mb-10 max-w-xl mx-auto">
              Our emergency team is ready to deploy across the UAE. Call now or send us a WhatsApp message.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:0582658191" data-testid="link-call-cta"
                className="flex items-center gap-3 bg-white text-green-700 font-bold px-8 py-4 rounded-2xl hover:bg-green-50 hover:scale-105 transition-all shadow-xl text-lg">
                <Phone size={22} /> Call: 0582658191
              </a>
              <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer" data-testid="link-wa-cta"
                className="flex items-center gap-3 bg-green-500/30 border border-white/40 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-500/50 hover:scale-105 transition-all backdrop-blur-sm text-lg">
                <MessageCircle size={22} /> WhatsApp
              </a>
              <a href="mailto:cleancare@gmail.com" data-testid="link-email-cta"
                className="flex items-center gap-3 bg-sky-500/30 border border-white/40 text-white font-bold px-8 py-4 rounded-2xl hover:bg-sky-500/50 hover:scale-105 transition-all backdrop-blur-sm text-lg">
                <Mail size={22} /> Email Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
              Other Services We Offer
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherServices.map((svc, i) => {
              const OtherIcon = iconMap[svc.icon];
              return (
                <motion.div key={svc.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-50 hover:bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => { setLocation(`/services/${svc.slug}`); window.scrollTo(0, 0); }}
                  data-testid={`card-other-service-${i}`}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center shadow-md">
                        {OtherIcon && <OtherIcon size={18} className="text-white" />}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 text-base" style={{ fontFamily: "Sora, sans-serif" }}>{svc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{svc.shortDesc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-green-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={13} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button onClick={goHome} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center">
              <Droplets size={18} className="text-white" />
            </div>
            <span className="font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>Clean Enviro Care</span>
          </button>
          <div className="flex flex-wrap items-center gap-5">
            <a href="tel:0582658191" className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              <Phone size={14} /> 0582658191
            </a>
            <a href="mailto:cleancare@gmail.com" className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              <Mail size={14} /> cleancare@gmail.com
            </a>
            <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2024 Clean Enviro Care</p>
        </div>
      </footer>

      <style>{`
        @keyframes bubble-rise {
          0% { transform: translateY(100px) scale(0.8); opacity: 0; }
          10% { opacity: var(--bub-op, 0.3); }
          90% { opacity: var(--bub-op, 0.3); }
          100% { transform: translateY(-200px) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
