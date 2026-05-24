import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Droplets,
  ChefHat,
  Building2,
  Waves,
  Trash2,
  Container,
  Warehouse,
  FlaskConical,
  Zap,
  Clock,
  Shield,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Wrench,
  Wind,
  AlertCircle,
  Pipette,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { services as serviceData } from "@/data/services";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Droplets, ChefHat, Building2, Waves, Trash2, Container, Warehouse, FlaskConical, Zap, Pipette,
};

const features = [
  { icon: Clock, stat: "24/7", label: "Emergency Response", desc: "Round-the-clock availability for urgent drainage and cleaning emergencies." },
  { icon: Shield, stat: "100%", label: "Certified Technicians", desc: "All our technicians are certified and trained to the highest industry standards." },
  { icon: Award, stat: "15+", label: "Years Experience", desc: "Over 15 years of proven expertise in industrial and residential cleaning." },
  { icon: Users, stat: "500+", label: "Satisfied Clients", desc: "Trusted by over 500 residential and commercial clients across the UAE." },
  { icon: Wrench, stat: "Latest", label: "Advanced Equipment", desc: "We use state-of-the-art equipment for efficient and thorough results." },
  { icon: Wind, stat: "Eco", label: "Friendly Solutions", desc: "Environmentally responsible cleaning methods that protect your surroundings." },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", service: "", message: "" },
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const goToService = (slug: string) => {
    setLocation(`/services/${slug}`);
    window.scrollTo(0, 0);
  };

  const onSubmit = (_data: ContactForm) => {
    toast({ title: "Request Submitted", description: "Thank you! We will contact you shortly." });
    form.reset();
  };

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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center shadow-md">
              <Droplets size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Clean Enviro Care</span>
              <p className="text-xs text-gray-500 leading-none">UAE Cleaning Specialists</p>
            </div>
          </div>

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
            <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 text-green-600 font-semibold">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
        {/* Animated full-page background */}
        <AnimatedBackground />

        {/* Gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-green-50 to-sky-50 rounded-full blur-3xl opacity-70 translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-50 to-green-50 rounded-full blur-3xl opacity-60 -translate-x-1/4 translate-y-1/4" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(16,185,129,0.06) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-4 py-2 text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              24/7 Emergency Service Available
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}>
              UAE's Premier{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">
                Drainage & Cleaning
              </span>{" "}
              Experts
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              We handle complex drainage, sewage, and deep cleaning work for industrial and residential clients — the professionals you call when other solutions fail.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("contact")} data-testid="button-hero-quote"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-xl shadow-green-200 hover:shadow-2xl hover:shadow-green-300 hover:scale-105 transition-all duration-300">
                Request a Service <ArrowRight size={20} />
              </button>
              <a href="tel:0582658191" data-testid="link-call-hero"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-sky-500 text-sky-600 font-bold text-lg hover:bg-sky-50 hover:scale-105 transition-all duration-300">
                <Phone size={20} /> Call: 0582658191
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-8">
              {[["500+", "Satisfied Clients"], ["15+", "Years Experience"], ["24/7", "Emergency Support"]].map(([stat, label]) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>{stat}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Quick contact pills */}
        <div className="absolute right-8 bottom-8 hidden xl:flex flex-col gap-3 z-10">
          {[
            { icon: Phone, text: "0582658191", href: "tel:0582658191", color: "bg-sky-500" },
            { icon: MessageCircle, text: "WhatsApp", href: "https://wa.me/971582658191", color: "bg-green-500" },
            { icon: Mail, text: "Email Us", href: "mailto:cleancare@gmail.com", color: "bg-indigo-500" },
          ].map(({ icon: Icon, text, href, color }) => (
            <a key={text} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className={`flex items-center gap-3 ${color} text-white px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition-all text-sm font-semibold`}>
              <Icon size={16} /> {text}
            </a>
          ))}
        </div>
      </section>

      {/* ── EMERGENCY BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-red-600 py-8">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
              <div className="relative w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <AlertCircle size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-xl" style={{ fontFamily: "Sora, sans-serif" }}>24/7 EMERGENCY SERVICE AVAILABLE</p>
              <p className="text-red-100 text-sm">Rapid response within 60 minutes across UAE</p>
            </div>
          </div>
          <a href="tel:0582658191" data-testid="link-emergency-call"
            className="flex items-center gap-3 bg-white text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-red-50 hover:scale-105 transition-all shadow-lg text-lg">
            <Phone size={20} /> Call Now: 0582658191
          </a>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Subtle wave top */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", transform: "rotate(180deg)" }}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">Our Services</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
              Professional Cleaning{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">Solutions</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From residential drain blockages to large-scale industrial cleaning — we have the expertise and equipment to handle every challenge.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceData.map((svc, i) => {
              const Icon = iconMap[svc.icon] ?? Droplets;
              return (
                <motion.div key={svc.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => goToService(svc.slug)}
                  data-testid={`card-service-${i}`}>
                  {/* Service image */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={svc.image} alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute bottom-3 left-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center shadow-lg">
                        <Icon size={19} className="text-white" />
                      </div>
                    </div>
                    {/* "View Details" pill on hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        View Details →
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-sm mb-2" style={{ fontFamily: "Sora, sans-serif" }}>{svc.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{svc.shortDesc}</p>
                    <div className="mt-3 flex items-center gap-1 text-green-600 text-xs font-semibold group-hover:text-sky-600 transition-colors">
                      Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">Why Choose Us</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
              The Clean Enviro Care{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">Advantage</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We combine technical expertise with cutting-edge equipment to deliver results that exceed expectations every time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map(({ icon: Icon, stat, label, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 transition-all duration-300"
                data-testid={`card-feature-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center shadow-md flex-shrink-0">
                    <Icon size={26} className="text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>{stat}</p>
                    <p className="text-green-600 font-semibold text-sm mb-2">{label}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* About block */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">About Us</span>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
                UAE's Trusted Cleaning & Drainage Specialists
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Clean Enviro Care has been serving residential communities, commercial establishments, and industrial facilities across the UAE for over 15 years. Our certified team brings unmatched expertise to every project — from routine drain maintenance to emergency sewage system overhauls.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We operate with a fleet of advanced vacuum tankers, high-pressure jetting units, and CCTV inspection equipment, ensuring every job is completed to the highest standard.
              </p>
              <div className="space-y-3 mb-8">
                {["Fully licensed and insured operations", "Rapid deployment — typically within 60 minutes", "Advanced CCTV drain inspection available", "Serving all Emirates across UAE"].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} data-testid="button-about-contact"
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg shadow-green-200 hover:shadow-xl hover:scale-105 transition-all">
                Contact Us Today <ArrowRight size={18} />
              </button>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-green-100 to-sky-100 blur-xl opacity-60" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Projects Completed", value: "2,500+", color: "from-green-500 to-emerald-500" },
                      { label: "Emergency Callouts", value: "800+", color: "from-sky-500 to-blue-500" },
                      { label: "Commercial Clients", value: "320+", color: "from-violet-500 to-purple-500" },
                      { label: "Satisfaction Rate", value: "98%", color: "from-orange-500 to-amber-500" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="rounded-2xl bg-gray-50 p-5 text-center">
                        <p className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br ${color}`} style={{ fontFamily: "Sora, sans-serif" }}>{value}</p>
                        <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-sky-50 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                      <span className="text-sm font-bold text-gray-900">5.0</span>
                    </div>
                    <p className="text-sm text-gray-600 italic">"Fast, professional, and thorough. Clean Enviro Care resolved our emergency sewage issue within the hour. Highly recommended!"</p>
                    <p className="text-xs text-gray-500 mt-2 font-semibold">— Facility Manager, Dubai</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER WITH ANIMATED BG ── */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-sky-600">
        <AnimatedBackground className="opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white rounded-full px-4 py-2 text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Trusted by 500+ clients across the UAE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-green-100 text-xl mb-10 max-w-xl mx-auto">
              Contact us now for a free assessment and quote. Emergency or scheduled — we're ready.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => scrollTo("contact")} data-testid="button-cta-quote"
                className="flex items-center gap-3 bg-white text-green-700 font-bold px-8 py-4 rounded-2xl hover:bg-green-50 hover:scale-105 transition-all shadow-xl text-lg">
                Get a Free Quote <ArrowRight size={20} />
              </button>
              <a href="tel:0582658191" data-testid="link-cta-call"
                className="flex items-center gap-3 bg-green-500/30 border border-white/40 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-500/50 hover:scale-105 transition-all backdrop-blur-sm text-lg">
                <Phone size={20} /> 0582658191
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
              Request a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">Free Quote</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Reach out and our team will respond within the hour. For emergencies, call us directly.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Contact Information</h3>
                  {[
                    { icon: Phone, label: "Phone", value: "0582658191", href: "tel:0582658191", testid: "link-phone" },
                    { icon: Mail, label: "Email", value: "cleancare@gmail.com", href: "mailto:cleancare@gmail.com", testid: "link-email" },
                    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/971582658191", testid: "link-whatsapp-contact" },
                    { icon: MapPin, label: "Location", value: "United Arab Emirates", href: "#", testid: "text-location" },
                  ].map(({ icon: Icon, label, value, href, testid }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer" data-testid={testid}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">{label}</p>
                        <p className="text-gray-900 font-semibold text-sm">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                      <AlertCircle size={22} className="relative" />
                    </div>
                    <h3 className="font-bold text-lg" style={{ fontFamily: "Sora, sans-serif" }}>Emergency?</h3>
                  </div>
                  <p className="text-red-100 text-sm mb-4">Drainage or sewage emergency? We respond within 60 minutes, 24 hours a day.</p>
                  <a href="tel:0582658191" data-testid="link-emergency-contact"
                    className="flex items-center justify-center gap-2 bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-all hover:scale-105 text-sm">
                    <Phone size={16} /> Emergency Call: 0582658191
                  </a>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Sora, sans-serif" }}>Send Us a Message</h3>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input {...form.register("name")} data-testid="input-name" placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white" />
                        {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input {...form.register("phone")} data-testid="input-phone" placeholder="e.g. 0582658191"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white" />
                        {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input {...form.register("email")} data-testid="input-email" type="email" placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white" />
                      {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Service Required</label>
                      <select {...form.register("service")} data-testid="select-service"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white cursor-pointer">
                        <option value="">Select a service...</option>
                        {serviceData.map(({ title }) => <option key={title} value={title}>{title}</option>)}
                      </select>
                      {form.formState.errors.service && <p className="text-red-500 text-xs mt-1">{form.formState.errors.service.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea {...form.register("message")} data-testid="textarea-message" rows={4}
                        placeholder="Describe your issue or requirements in detail..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none" />
                      {form.formState.errors.message && <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>}
                    </div>

                    <button type="submit" data-testid="button-submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-base shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                      Send Message <ArrowRight size={18} />
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-sky-500 flex items-center justify-center">
                  <Droplets size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>Clean Enviro Care</p>
                  <p className="text-xs text-gray-400">UAE Cleaning Specialists</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">UAE's premier drainage and cleaning specialists. Professional, reliable, and available 24/7.</p>
              <div className="flex flex-col gap-2">
                <a href="tel:0582658191" className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"><Phone size={14} /> 0582658191</a>
                <a href="mailto:cleancare@gmail.com" className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"><Mail size={14} /> cleancare@gmail.com</a>
                <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"><MessageCircle size={14} /> WhatsApp</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif" }}>Quick Links</h4>
              <ul className="space-y-2">
                {[["Home", "home"], ["Services", "services"], ["Why Us", "about"], ["Contact", "contact"]].map(([label, id]) => (
                  <li key={id}><button onClick={() => scrollTo(id)} className="text-gray-400 hover:text-green-400 text-sm transition-colors">{label}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif" }}>Our Services</h4>
              <ul className="space-y-2">
                {serviceData.slice(0, 6).map(({ title, slug }) => (
                  <li key={slug}>
                    <button onClick={() => goToService(slug)} className="text-gray-400 hover:text-green-400 text-sm transition-colors text-left">{title}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif" }}>Emergency Service</h4>
              <p className="text-gray-400 text-sm mb-5">Available 24 hours a day, 7 days a week across the UAE.</p>
              <a href="tel:0582658191" data-testid="link-footer-emergency"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-5 rounded-xl hover:opacity-90 hover:scale-105 transition-all text-sm">
                <Phone size={16} /> Emergency Call
              </a>
              <a href="https://wa.me/971582658191" target="_blank" rel="noopener noreferrer" data-testid="link-footer-whatsapp"
                className="mt-3 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-5 rounded-xl hover:bg-green-700 hover:scale-105 transition-all text-sm">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">&copy; 2024 Clean Enviro Care. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-gray-500 text-sm">United Arab Emirates</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
