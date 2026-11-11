import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BedDouble, Bath, Check, ChevronDown,
  Compass, House, KeyRound, MapPin, Menu, MessageCircle, MoveUpRight,
  Phone, Search, ShieldCheck, Sparkles, X, Maximize2, Building2, Trees,
  Handshake, HeartHandshake, Instagram, Mail, MapPinned
} from "lucide-react";
import { properties, gallery } from "./data";

const WA = "https://wa.me/919183022112?text=Hi%20Rajwad%20Realty%2C%20I%20am%20interested%20in%20your%20properties.";
const INSTA = "https://www.instagram.com/rajwadrealty/";
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

function Logo({ compact = false }) {
  return <a className={`brand-lockup ${compact ? "brand-compact" : ""}`} href="#home" aria-label="Rajwad Realty home">
    <span className="brand-mark"><span className="mark-roof">⌂</span><span className="mark-r">R</span></span>
    <span className="brand-words"><strong>RAJWAD</strong><small>R E A L T Y</small></span>
  </a>;
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return <motion.div className={`section-heading ${light ? "light" : ""}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
    <span className="eyebrow"><i />{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </motion.div>;
}

function PropertyCard({ item, onOpen }) {
  return <motion.article className="property-card" variants={fadeUp} layout>
    <button className="property-image" onClick={() => onOpen(item)} aria-label={`View ${item.title}`}>
      <img src={item.image} alt={`${item.title} property`} loading="lazy" />
      <span className="property-tag">{item.tag}</span>
      <span className="image-arrow"><ArrowUpRight size={19}/></span>
      <span className="image-label">DEMO LISTING</span>
    </button>
    <div className="property-info">
      <div className="property-location"><MapPin size={13}/>{item.location}</div>
      <h3>{item.title}</h3>
      <div className="property-specs">
        {item.beds && <span><BedDouble size={15}/>{item.beds} Beds</span>}
        {item.baths && <span><Bath size={15}/>{item.baths} Baths</span>}
        <span><Maximize2 size={14}/>{item.area}</span>
      </div>
      <div className="property-bottom">
        <div><small>Indicative price</small><strong>{item.price}</strong></div>
        <button className="text-link" onClick={() => onOpen(item)}>View details <ArrowRight size={15}/></button>
      </div>
    </div>
  </motion.article>;
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [purpose, setPurpose] = useState("Buy");
  const [type, setType] = useState("All types");
  const [location, setLocation] = useState("All locations");
  const [budget, setBudget] = useState("Any budget");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", requirement: "Buying a property", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const filtered = useMemo(() => properties.filter(p => {
    const matchesPurpose = activeCategory === "All" || p.purpose === activeCategory || p.type === activeCategory;
    const matchesType = type === "All types" || p.type === type;
    const matchesLocation = location === "All locations" || p.location.includes(location);
    const matchesBudget = budget === "Any budget" || (budget === "Under ₹1 Cr" ? p.priceValue < 10000000 : budget === "₹1–2 Cr" ? p.priceValue >= 10000000 && p.priceValue <= 20000000 : p.priceValue > 20000000);
    return matchesPurpose && matchesType && matchesLocation && matchesBudget;
  }), [activeCategory, type, location, budget]);

  const runSearch = () => {
    setActiveCategory(purpose);
    document.querySelector("#properties")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const submitDemo = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", phone: "", email: "", requirement: "Buying a property", message: "" });
  };

  const navItems = [["Home","#home"],["About","#about"],["Properties","#properties"],["Services","#services"],["Gallery","#gallery"],["Contact","#contact"]];

  return <div className="site-shell">
    <div className="topline"><span>INDORE, MADHYA PRADESH</span><span>PROPERTY, WITH A PERSONAL TOUCH <i>✦</i></span><a href={WA} target="_blank" rel="noreferrer">Speak with an advisor <ArrowUpRight size={12}/></a></div>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Logo />
        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="mobile-nav-cta" href={WA} target="_blank" rel="noreferrer">Enquire now <ArrowUpRight size={15}/></a>
        </nav>
        <a className="header-cta" href={WA} target="_blank" rel="noreferrer">Enquire now <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-copy">
            <span className="eyebrow hero-eyebrow"><i/> A MORE CONSIDERED WAY TO FIND HOME</span>
            <h1>Find your place.<br/><em>Build your future.</em></h1>
            <p>Discover exceptional homes, thoughtful spaces and property opportunities in Indore — with guidance that puts you first.</p>
            <div className="hero-actions">
              <a href="#properties" className="button button-gold">Explore properties <ArrowUpRight size={17}/></a>
              <a href="#contact" className="button button-outline">Talk to our team <ArrowRight size={16}/></a>
            </div>
          </motion.div>
          <div className="hero-side-note"><span>01 / 04</span><i/><span>THOUGHTFULLY FOUND. BEAUTIFULLY LIVED.</span></div>
          <a className="scroll-cue" href="#search"><span>SCROLL TO DISCOVER</span><ArrowDown size={15}/></a>
          <div className="hero-stamp"><span>RR</span><small>YOUR PROPERTY<br/>JOURNEY, REFINED</small></div>
        </div>
      </section>

      <section className="search-wrap" id="search">
        <div className="container">
          <div className="search-panel">
            <div className="search-intro"><span className="eyebrow"><i/> FIND YOUR SPACE</span><h2>What are you<br/>looking for?</h2></div>
            <div className="search-controls">
              <label>I'm looking to<select value={purpose} onChange={e=>setPurpose(e.target.value)}><option>Buy</option><option>Rent</option></select></label>
              <label>Property type<select value={type} onChange={e=>setType(e.target.value)}><option>All types</option><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option></select></label>
              <label>Preferred area<select value={location} onChange={e=>setLocation(e.target.value)}><option>All locations</option><option>Vijay Nagar</option><option>Nipania</option><option>Scheme 140</option><option>Super Corridor</option><option>Rau</option><option>Palasia</option></select></label>
              <label>Budget<select value={budget} onChange={e=>setBudget(e.target.value)}><option>Any budget</option><option>Under ₹1 Cr</option><option>₹1–2 Cr</option><option>Above ₹2 Cr</option></select></label>
              <button className="search-button" onClick={runSearch}><Search size={18}/> Search</button>
            </div>
          </div>
          <div className="search-note"><span>CURATED PROPERTY DISCOVERY</span><span>PERSONAL GUIDANCE, EVERY STEP <i>✦</i></span></div>
        </div>
      </section>

      <section className="section properties-section" id="properties">
        <div className="container">
          <div className="section-topline"><SectionHeading eyebrow="A PLACE TO BEGIN" title={<>Spaces worth<br/><em>coming home to.</em></>} text="Explore a considered selection of homes and property opportunities across Indore."/><a href={WA} className="underlined-link" target="_blank" rel="noreferrer">Request the full portfolio <ArrowUpRight size={16}/></a></div>
          <div className="filter-row">
            {["All","Buy","Rent","Apartment","Villa","Plot","Commercial"].map(cat=><button key={cat} className={activeCategory===cat?"active":""} onClick={()=>setActiveCategory(cat)}>{cat==="All"?"All properties":cat}</button>)}
          </div>
          <motion.div className="property-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map(item=><PropertyCard key={item.id} item={item} onOpen={setSelected}/>)}
            </AnimatePresence>
          </motion.div>
          {filtered.length===0 && <div className="empty-state">No sample listings match those filters. Try a different combination.</div>}
          <p className="demo-disclaimer">Illustrative demo listings only. Property names, images, prices and availability are placeholders, not verified inventory.</p>
        </div>
      </section>

      <section className="category-band" id="services">
        <div className="container">
          <SectionHeading eyebrow="ROOM FOR EVERY POSSIBILITY" title={<>The right move starts<br/><em>with the right guidance.</em></>} text="Whether you're taking your first step or planning your next investment, we're here to make the process feel clear." light/>
          <div className="category-grid">
            {[
              {icon:House,title:"Find a home",desc:"Thoughtfully selected homes for the way you want to live.",link:"Buy"},
              {icon:KeyRound,title:"Find a rental",desc:"Comfortable spaces and practical options for your next chapter.",link:"Rent"},
              {icon:Trees,title:"Explore plots",desc:"Discover land opportunities with room to grow.",link:"Plot"},
              {icon:Building2,title:"Commercial spaces",desc:"Spaces to support your business and ambitions.",link:"Commercial"}
            ].map((c,i)=><motion.a href="#properties" className="category-card" key={c.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} onClick={()=>setActiveCategory(c.link)}>
              <span className="category-number">0{i+1}</span><c.icon size={27} strokeWidth={1.25}/><h3>{c.title}</h3><p>{c.desc}</p><span className="category-link">Explore category <ArrowUpRight size={15}/></span>
            </motion.a>)}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <motion.div className="about-visual" initial={{opacity:0,x:-25}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.8}}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=85" alt="Elegant contemporary home interior" loading="lazy"/>
            <div className="about-caption"><span>THE ART OF FINDING HOME</span><strong>Spaces that feel<br/><em>like yours.</em></strong></div>
            <div className="about-outline">RR</div>
          </motion.div>
          <div className="about-copy">
            <SectionHeading eyebrow="A NAME YOU CAN TURN TO" title={<>More than properties.<br/><em>We build trust.</em></>} text="Finding the right property is a personal decision. Rajwad Realty is here to bring clarity, care and considered guidance to every step of that journey."/>
            <p className="about-body">From a first home to a new investment, we believe the experience should feel informed, transparent and centred around what matters to you. Explore residential and commercial possibilities across Indore with a team that listens first.</p>
            <div className="about-points"><span><Check size={15}/> Personal property guidance</span><span><Check size={15}/> Clear, thoughtful communication</span><span><Check size={15}/> Residential and commercial options</span></div>
            <a href="#contact" className="button button-dark">Get to know us <ArrowUpRight size={16}/></a>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <div className="trust-heading"><span className="eyebrow"><i/> THE RAJWAD APPROACH</span><h2>A better property journey,<br/><em>built around you.</em></h2></div>
          <div className="trust-grid">
            {[
              {icon:ShieldCheck,title:"Guidance you can trust",desc:"A considered approach to helping you understand your options."},
              {icon:Compass,title:"Local perspective",desc:"Explore Indore neighbourhoods with context and clarity."},
              {icon:Handshake,title:"People-first service",desc:"Your priorities shape the search, not the other way around."},
              {icon:HeartHandshake,title:"Support at every step",desc:"From the first conversation to the next important decision."}
            ].map((x,i)=><motion.div className="trust-item" key={x.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}><span className="trust-icon"><x.icon size={23} strokeWidth={1.4}/></span><span className="trust-num">0{i+1}</span><h3>{x.title}</h3><p>{x.desc}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="container">
          <div className="section-topline"><SectionHeading eyebrow="A GLIMPSE OF POSSIBILITY" title={<>Spaces that inspire<br/><em>the everyday.</em></>} text="A visual moodboard of considered architecture, welcoming interiors and the feeling of home."/></div>
          <div className="gallery-grid">
            {gallery.map((src,i)=><button key={src} className={`gallery-item gallery-${i+1}`} onClick={()=>setGalleryImage(src)} aria-label={`Open gallery image ${i+1}`}><img src={src} alt={`Architectural inspiration ${i+1}`} loading="lazy"/><span><Maximize2 size={17}/></span></button>)}
          </div>
          <p className="demo-disclaimer">Photography is used for visual demonstration and does not represent confirmed Rajwad Realty listings.</p>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <SectionHeading eyebrow="A CLEARER WAY FORWARD" title={<>From first thought<br/><em>to the right address.</em></>} text="A simple, considered process that keeps you informed and in control." light/>
          <div className="process-grid">
            {[
              ["01","Tell us what matters","Share your plans, preferences and the kind of space you're looking for."],
              ["02","Explore your options","Review a considered shortlist that reflects your needs."],
              ["03","Visit and understand","Arrange a viewing and get the details you need to decide."],
              ["04","Make your next move","Move forward with clear communication and personal support."]
            ].map((s,i)=><motion.div className="process-step" key={s[0]} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}><span>{s[0]}</span><i/><h3>{s[1]}</h3><p>{s[2]}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg"/>
        <div className="container cta-content">
          <span className="eyebrow"><i/> YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Your dream property<br/>is closer than <em>you think.</em></h2>
          <p>Tell us what you're looking for. Let's make your next move a thoughtful one.</p>
          <div className="hero-actions"><a href={WA} target="_blank" rel="noreferrer" className="button button-gold"><MessageCircle size={17}/> Talk to our team</a><a href="#properties" className="button button-outline">Explore properties <ArrowUpRight size={16}/></a></div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <SectionHeading eyebrow="LET'S START A CONVERSATION" title={<>The right place<br/><em>begins with hello.</em></>} text="Share a little about what you're looking for. Our team would be glad to help you explore the possibilities."/>
            <div className="contact-details">
              <a href="tel:+919183022112"><span><Phone size={17}/></span><div><small>CALL US</small><strong>+91 91830 22112</strong></div><ArrowUpRight size={15}/></a>
              <a href={WA} target="_blank" rel="noreferrer"><span><MessageCircle size={17}/></span><div><small>WHATSAPP</small><strong>Chat with Rajwad Realty</strong></div><ArrowUpRight size={15}/></a>
              <div><span><MapPinned size={17}/></span><div><small>OUR LOCATION</small><strong>Indore, Madhya Pradesh, India</strong></div></div>
              <a href={INSTA} target="_blank" rel="noreferrer"><span><Instagram size={17}/></span><div><small>FOLLOW ALONG</small><strong>@rajwadrealty</strong></div><ArrowUpRight size={15}/></a>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading"><span className="eyebrow"><i/> PROPERTY ENQUIRY</span><h3>How can we help?</h3><p>Leave your details and tell us what you have in mind.</p></div>
            {submitted ? <div className="success-message"><span><Check size={24}/></span><h3>Thank you for reaching out.</h3><p>This is a frontend demo form. No enquiry has been sent or stored. Use WhatsApp to contact the business.</p><button className="text-link" onClick={()=>setSubmitted(false)}>Send another demo enquiry <ArrowRight size={15}/></button></div> :
            <form onSubmit={submitDemo}>
              <div className="form-row"><label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter your name"/></label><label>Phone number<input required type="tel" pattern="[0-9+\\s-]{8,15}" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 00000 00000"/></label></div>
              <label>Email address<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
              <label>I'm interested in<select value={form.requirement} onChange={e=>setForm({...form,requirement:e.target.value})}><option>Buying a property</option><option>Renting a property</option><option>Residential plot</option><option>Commercial property</option><option>Selling a property</option></select></label>
              <label>Your message<textarea rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us a little about your requirements..."/></label>
              <button className="button button-gold form-submit" type="submit">Send enquiry <ArrowUpRight size={16}/></button>
              <small className="form-demo-note">Demo interaction only — form submissions are not stored or transmitted.</small>
            </form>}
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container">
        <div className="footer-main"><div className="footer-brand"><Logo/><p>A more considered way to discover your next place in Indore.</p><a className="footer-social" href={INSTA} target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram <ArrowUpRight size={13}/></a></div>
          <div className="footer-col"><span>EXPLORE</span><a href="#about">Our story</a><a href="#properties">Properties</a><a href="#services">Services</a><a href="#gallery">Gallery</a></div>
          <div className="footer-col"><span>PROPERTY</span><a href="#properties" onClick={()=>setActiveCategory("Buy")}>Buy a home</a><a href="#properties" onClick={()=>setActiveCategory("Rent")}>Find a rental</a><a href="#properties" onClick={()=>setActiveCategory("Plot")}>Explore plots</a><a href="#properties" onClick={()=>setActiveCategory("Commercial")}>Commercial</a></div>
          <div className="footer-col footer-contact"><span>GET IN TOUCH</span><a href="tel:+919183022112">+91 91830 22112</a><a href={WA} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={13}/></a><p>Indore, Madhya Pradesh<br/>India</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Rajwad Realty. Demo concept for presentation.</span><span>DESIGNED WITH INTENTION <i>✦</i></span><a href="#home">BACK TO TOP ↑</a></div>
      </div>
    </footer>

    <a className="floating-whatsapp" href={WA} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={22}/><span>Let's talk</span></a>

    <AnimatePresence>
      {selected && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}>
        <motion.div className="property-modal" initial={{opacity:0,y:25,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:15}} onClick={e=>e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X/></button>
          <img src={selected.image} alt={selected.title}/>
          <div className="modal-content"><span className="eyebrow"><i/> SAMPLE PROPERTY · {selected.type.toUpperCase()}</span><h2>{selected.title}</h2><p className="property-location"><MapPin size={14}/>{selected.location}</p><h3>{selected.price}</h3><p>{selected.description}</p><div className="property-specs">{selected.beds&&<span><BedDouble size={15}/>{selected.beds} Beds</span>}{selected.baths&&<span><Bath size={15}/>{selected.baths} Baths</span>}<span><Maximize2 size={14}/>{selected.area}</span></div><a className="button button-gold" href={WA} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={16}/></a><small className="demo-disclaimer">Sample listing for demonstration. Details and availability are not verified.</small></div>
        </motion.div>
      </motion.div>}
      {galleryImage && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setGalleryImage(null)}><button onClick={()=>setGalleryImage(null)} aria-label="Close gallery"><X/></button><img src={galleryImage} alt="Property gallery enlarged"/></motion.div>}
    </AnimatePresence>
  </div>;
}