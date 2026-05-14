import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  X,
} from "lucide-react";
import { siteContent } from "./content/siteContent";
import { assetPath, cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Modalities", path: "/modalities" },
  { label: "Meet Ed", path: "/meet-ed" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="NeuroBodyWork home">
            <img src={assetPath("logo.png")} alt="" className="h-9 w-auto" />
            <span className="sr-only">NeuroBodyWork</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-secondary text-secondary-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <a href={siteContent.site.bookingUrl}>
                <CalendarCheck className="h-4 w-4" />
                Book Now
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="page-enter" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modalities" element={<ModalitiesPage />} />
          <Route path="/meet-ed" element={<MeetEdPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return <Layout />;
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
      <button
        className={cn("absolute inset-0 bg-slate-950/45 transition-opacity", open ? "opacity-100" : "opacity-0")}
        aria-label="Close navigation overlay"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-[min(22rem,86vw)] border-l border-border bg-background p-6 shadow-quiet transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <img src={assetPath("logo.png")} alt="NeuroBodyWork" className="h-8 w-auto" />
          <Button variant="ghost" size="icon" aria-label="Close navigation" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-10 grid gap-2" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-4 py-3 text-lg font-semibold transition-colors hover:bg-accent",
                  isActive && "bg-secondary text-secondary-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button asChild className="mt-8 w-full">
          <a href={siteContent.site.bookingUrl}>
            <CalendarCheck className="h-4 w-4" />
            Book Now
          </a>
        </Button>
      </aside>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <picture>
        <source media="(max-width: 720px)" srcSet={assetPath("neurobodywork-top-bg-portrait-new.jpg")} />
        <img
          src={assetPath("neurobodywork-top-bg-new-2.jpg")}
          alt="NeuroBodyWork treatment room"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20" />
      <div className="absolute bottom-10 right-10 hidden h-44 w-44 rounded-full border border-primary/25 lg:block drift-ring" />
      <div className="container relative flex min-h-[calc(100vh-5rem)] items-center py-16">
        <div className="max-w-3xl">
          <img src={assetPath("logo.png")} alt="NeuroBodyWork" className="mb-8 h-14 w-auto hero-reveal" />
          <h1 className="hero-reveal hero-reveal-delay-1 font-display text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {siteContent.site.headline}
          </h1>
          <p className="hero-reveal hero-reveal-delay-2 mt-5 max-w-2xl text-xl font-semibold text-primary">
            {siteContent.site.subheadline}
          </p>
          <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={siteContent.site.bookingUrl}>
                <CalendarCheck className="h-4 w-4" />
                Book Now
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/modalities">
                Explore Treatments
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <section className="section reveal-band">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading eyebrow="Approach" title="Bodywork guided by the nervous system" />
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            {siteContent.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-secondary/55">
        <div className="container grid gap-5 md:grid-cols-3">
          <Stat value="25+" label="years of advanced massage and manual therapy training" />
          <Stat value="2015-18" label="Oakland Raiders soft tissue specialist" />
          <Stat value="6" label="rebuilt pages with WordPress content and local static media" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Pages" title="Migrated content" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {navItems.slice(1).map((item) => (
              <Link key={item.path} to={item.path} className="page-card group">
                <span className="text-lg font-semibold">{item.label}</span>
                <ArrowRight className="mt-4 h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ModalitiesPage() {
  return (
    <PageFrame eyebrow="Modalities" title="Manual therapy methods from the original site">
      <div className="grid gap-6 lg:grid-cols-2">
        {siteContent.modalities.map((modality, index) => (
          <Card key={modality.name} className="reveal-card overflow-hidden" style={{ animationDelay: `${index * 110}ms` }}>
            <CardHeader>
              <div className="flex h-24 items-center">
                <img src={assetPath(modality.image)} alt="" className="max-h-20 max-w-48 object-contain" />
              </div>
              <CardTitle>{modality.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">{modality.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageFrame>
  );
}

function MeetEdPage() {
  return (
    <PageFrame eyebrow="Meet Ed" title="Training, teams, and clinical background">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <img
          src={assetPath(siteContent.bio.image)}
          alt="Ed from NeuroBodyWork"
          className="reveal-card aspect-[4/5] w-full rounded-lg object-cover shadow-quiet"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {siteContent.bio.credentials.map((credential, index) => (
            <div
              key={credential}
              className="reveal-card rounded-lg border border-border bg-card p-4 text-sm leading-6"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              {credential}
            </div>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}

function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : siteContent.gallery[selectedIndex];

  const move = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (current + direction + siteContent.gallery.length) % siteContent.gallery.length;
    });
  };

  return (
    <PageFrame eyebrow="Gallery" title="Original WordPress media, rebuilt as static assets">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteContent.gallery.map((item, index) => (
          <button
            key={`${item.title}-${item.image}`}
            type="button"
            className="gallery-tile reveal-card group text-left"
            style={{ animationDelay: `${index * 35}ms` }}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={assetPath(item.image)} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <span className="gallery-overlay">
              <span className="text-sm font-semibold">{item.title}</span>
              <span className="mt-2 flex items-center gap-2 text-xs uppercase">View image <ArrowRight className="h-3 w-3" /></span>
            </span>
          </button>
        ))}
      </div>

      {selected && selectedIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 lightbox-enter">
          <button className="absolute inset-0" aria-label="Close gallery image" onClick={() => setSelectedIndex(null)} />
          <div className="relative z-10 w-full max-w-5xl">
            <img
              src={assetPath(selected.image)}
              alt={selected.title}
              className="max-h-[78vh] w-full rounded-lg object-contain shadow-quiet"
            />
            <div className="mt-4 flex items-center justify-between gap-3 text-white">
              <Button variant="secondary" size="icon" aria-label="Previous image" onClick={() => move(-1)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <p className="text-center text-sm font-semibold">{selected.title}</p>
              <Button variant="secondary" size="icon" aria-label="Next image" onClick={() => move(1)}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Close lightbox"
              className="absolute right-3 top-3"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : null}
    </PageFrame>
  );
}

function TestimonialsPage() {
  return (
    <PageFrame eyebrow="Testimonials" title="Client feedback from the WordPress site">
      <TestimonialSlider />
    </PageFrame>
  );
}

function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const testimonial = siteContent.testimonials[index];
  const move = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + siteContent.testimonials.length) % siteContent.testimonials.length);
  };

  return (
    <div className="testimonial-stage">
      <Quote className="mx-auto h-10 w-10 text-white/75" />
      <div key={testimonial.author} className="testimonial-slide">
        <blockquote>"{testimonial.quote}"</blockquote>
        <p>{testimonial.author}</p>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button variant="secondary" size="icon" aria-label="Previous testimonial" onClick={() => move(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          {siteContent.testimonials.map((item, dotIndex) => (
            <button
              key={item.author}
              type="button"
              aria-label={`Show testimonial ${dotIndex + 1}`}
              className={cn("h-2.5 w-2.5 rounded-full bg-white/45 transition", dotIndex === index && "w-8 bg-white")}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
        <Button variant="secondary" size="icon" aria-label="Next testimonial" onClick={() => move(1)}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <PageFrame eyebrow="Contact" title="Book or send a message">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <ContactLine icon={<Phone className="h-5 w-5" />} label={siteContent.contact.phone} href="tel:15108925568" />
          <ContactLine icon={<MapPin className="h-5 w-5" />} label={siteContent.contact.location} />
          <ContactLine icon={<Mail className="h-5 w-5" />} label={siteContent.contact.email} href="mailto:info@neurobodywork.com" />
          <Button asChild className="mt-4">
            <a href={siteContent.site.bookingUrl}>
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </a>
          </Button>
        </div>
        <Card className="reveal-card">
          <CardHeader>
            <CardTitle>{siteContent.contact.message}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" action="mailto:info@neurobodywork.com" method="post">
              <div className="grid gap-4 md:grid-cols-3">
                <Input name="name" placeholder="NAME" aria-label="Name" />
                <Input name="phone" placeholder="PHONE" aria-label="Phone" />
                <Input name="email" type="email" placeholder="EMAIL" aria-label="Email" />
              </div>
              <Textarea name="message" placeholder="MESSAGE" aria-label="Message" />
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageFrame>
  );
}

function PageFrame({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="section min-h-[70vh]">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal-heading">
      <p className="text-sm font-bold uppercase text-primary">{eyebrow}</p>
      <h2 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="reveal-card rounded-lg border border-border bg-background p-6">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{label}</p>
    </div>
  );
}

function ContactLine({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const content = (
    <span className="reveal-card flex items-center gap-3 rounded-lg border border-border bg-card p-4 font-semibold">
      <span className="text-primary">{icon}</span>
      {label}
    </span>
  );

  return href ? <a href={href}>{content}</a> : content;
}

function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 py-8 text-white">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <img src={assetPath("logo-mobile.png")} alt="NeuroBodyWork" className="h-9 w-auto" />
        <p className="text-sm text-white/70">{siteContent.footer}</p>
      </div>
    </footer>
  );
}
