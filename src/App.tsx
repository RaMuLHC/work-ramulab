import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  Clock, 
  Layers, 
  Menu,
  X
} from 'lucide-react';

import { RESUME_INFO, WORK_EXPERIENCES, EDUCATION, SKILL_CATEGORIES } from './data';
import ContactForm from './components/ContactForm';

export default function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedSkillTag, setSelectedSkillTag] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Maintain active local running terminal-style clock reflecting real local browser time
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      
      let tzText = '';
      try {
        const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tzName) {
          // Get abbreviation or general city/zone name
          const parts = tzName.split('/');
          const city = parts[parts.length - 1].replace('_', ' ');
          tzText = ` (${city})`;
        }
      } catch (e) {
        tzText = ' (Local)';
      }

      const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setCurrentTime(formatted + tzText);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter experiences highlighting which used the selected skill
  const highlightedExpIds = selectedSkillTag 
    ? WORK_EXPERIENCES.filter(exp => exp.skillsAssociated.includes(selectedSkillTag)).map(exp => exp.id)
    : WORK_EXPERIENCES.map(exp => exp.id);

  const handlePrint = () => {
    window.print();
  };

  const navItems = [
    { id: 'profile', label: '01 / PROFILE' },
    { id: 'experience', label: '02 / TIMELINE' },
    { id: 'skills', label: '03 / SKILLS MATRIX' },
    { id: 'contact', label: '04 / CONTACT ME' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* SCREEN VIEWPORT UTILITY FOR PORTFOLIO */}
      <div className="no-print min-h-screen bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white/10 selection:text-white flex flex-col md:flex-row relative">
        
        {/* MOBILE TOP RAIL CONTROL BAR */}
        <header className="md:hidden w-full bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-50 px-6 py-4 flex items-center justify-between select-none">
          <div className="flex flex-col">
            <span className="font-sans text-lg font-medium tracking-tight text-white uppercase">RAM LIU</span>
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-[0.1em] font-light">IT Support Specialist & Technical Liaison</span>
          </div>
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 rounded bg-white/5 border border-white/10 text-[#A1A1AA] focus:text-white min-h-[44px] hover:bg-white/10 transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* MOBILE MENU MODAL OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden fixed top-[68px] left-0 w-full bg-[#0A0A0A] border-b border-white/10 p-6 z-40 space-y-4 shadow-2xl select-none"
            >
              <div className="space-y-2 flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left font-mono py-3 px-4 rounded text-xs tracking-wider transition ${
                      activeSection === item.id 
                        ? 'bg-white/10 text-white font-semibold border border-white/20' 
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePrint}
                className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[10px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-2 transition"
              >
                <Download size={13} className="text-[#A1A1AA]" /> Print / Export PDF
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAILED COLUMN LEFT: STICKY BRAND IDENTITY RAIL */}
        <aside className="hidden md:flex w-80 shrink-0 border-r border-white/10 h-screen sticky top-0 flex-col justify-between p-8 bg-[#0A0A0A] select-none overflow-y-auto">
          <div className="space-y-8">
            
            {/* Logo and Core ID */}
            <div className="space-y-2">
              <div className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono">
                Personal Portfolio
              </div>
              <h1 className="text-4xl font-medium tracking-tighter text-white">
                RAM LIU
              </h1>
              <div className="text-[#A1A1AA] text-xs uppercase tracking-[0.15em] font-light leading-none">
                {RESUME_INFO.fullName}
              </div>
              <div className="text-xs text-[#D4D4D8] leading-tight pt-1 font-sans">
                IT Support Specialist & Technical Liaison
              </div>
            </div>

            {/* Live Terminal Clock Indicator */}
            <div className="p-4 bg-white/[0.02] border border-white/10 rounded font-mono text-[10px] space-y-2.5 relative overflow-hidden">
              <div className="flex items-center justify-between text-[8px] text-white/40 uppercase tracking-widest">
                <span>Local Time</span>
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                  ONLINE
                </span>
              </div>
              <div className="text-[#F5F5F5] font-semibold tracking-wider flex items-center gap-1.5">
                <Clock size={12} className="text-white/60" /> {currentTime || 'Loading...'}
              </div>
              <div className="text-[9px] text-[#A1A1AA]/60 pt-1.5 border-t border-white/5 uppercase tracking-wider">
                Richmond, BC, Canada
              </div>
            </div>

            {/* Navigation Jump anchors */}
            <nav className="flex flex-col gap-1">
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono mb-2">Section Navigation</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-mono text-[10px] py-2 px-3 rounded tracking-wider cursor-pointer transition ${
                    activeSection === item.id 
                      ? 'bg-white/5 border border-white/10 text-white font-bold' 
                      : 'text-[#A1A1AA]/60 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Quick specifications and contact lists */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">
                Direct Transport
              </div>
              <div className="space-y-2 text-xs">
                <a 
                  href={`mailto:${RESUME_INFO.contact.email}`} 
                  className="flex items-center gap-2.5 text-[#A1A1AA] hover:text-white transition group"
                >
                  <Mail size={12} className="text-white/40 group-hover:text-white" />
                  <span className="truncate font-mono">{RESUME_INFO.contact.email}</span>
                </a>
                <div className="flex items-center gap-2.5 text-[#A1A1AA]">
                  <Phone size={12} className="text-white/40" />
                  <span className="font-mono">{RESUME_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#A1A1AA] leading-snug">
                  <MapPin size={12} className="text-white/40 shrink-0" />
                  <span className="text-[11px] text-[#D4D4D8]">{RESUME_INFO.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA Footer button (Action component) */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <button
              onClick={handlePrint}
              type="button"
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-2 transition duration-200 cursor-pointer min-h-[44px]"
            >
              <Download size={13} className="text-white/60" /> PRINT FULL RESUME
            </button>
            
            <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
              VANCOUVER, CANADA
            </div>
          </div>
        </aside>

        {/* DETAILED COLUMN RIGHT: SCROLLABLE MAIN CONTENT SPACE */}
        <main className="flex-grow p-6 md:p-12 space-y-16 max-w-5xl mx-auto overflow-x-hidden">
          
          {/* PROFILE SUMMARY SECTION */}
          <section id="profile" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-4 select-none">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">01 / Profile Overview</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="col-span-1 md:col-span-2 p-8 bg-white/[0.01] border border-white/10 rounded-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-white mb-4">
                    Broadcom Regional Service Specialist
                  </h3>
                  <p className="text-sm text-[#D4D4D8] font-sans leading-relaxed">
                    {RESUME_INFO.summary}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    CANADA L2 SPECIALIST
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    VMWARE INTEGRATION
                  </span>
                </div>
              </div>

              {/* Education Bento Component */}
              <div className="col-span-1 p-8 bg-white/[0.01] border border-white/10 rounded-lg space-y-4">
                <div className="flex items-center justify-between text-white/40 font-mono text-[9px] uppercase tracking-widest select-none">
                  <span>Education</span>
                  <BookOpen size={12} className="text-white/40" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-white leading-tight">
                    {EDUCATION.degree}
                  </h4>
                  <div className="text-[10px] text-white/60 font-mono mt-1">
                    {EDUCATION.institution}
                  </div>
                  <div className="text-[9px] text-white/40 font-mono mt-0.5">
                    {EDUCATION.period}
                  </div>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {EDUCATION.description}
                </p>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-2">
                    Key Modules
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {EDUCATION.curriculum.slice(0, 4).map(curr => (
                      <span key={curr} className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-mono text-[#D4D4D8]">
                        {curr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TIMELINE SEGMENT CONTAINER */}
          <section id="experience" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-4 select-none">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">02 / Career Timeline</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {selectedSkillTag && (
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded flex items-center justify-between font-mono text-[10px] text-white">
                <span>Active filter: <strong className="text-white font-semibold">{selectedSkillTag}</strong></span>
                <button 
                  onClick={() => setSelectedSkillTag(null)} 
                  className="p-1 px-2.5 uppercase text-[9px] bg-white/10 hover:bg-white/20 text-white font-medium rounded transition cursor-pointer"
                >
                  Show All Timeline
                </button>
              </div>
            )}

            <div className="space-y-8 relative pl-4 border-l border-white/10">
              {WORK_EXPERIENCES.map((exp, idx) => {
                const isFilteredOut = !highlightedExpIds.includes(exp.id);
                return (
                  <motion.div
                    key={exp.id}
                    animate={{ opacity: isFilteredOut ? 0.35 : 1 }}
                    className="relative space-y-3"
                  >
                    {/* Anchor Dot Indicator */}
                    <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0A0A0A] transition-all ${
                      isFilteredOut ? 'bg-white/10' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    }`} />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-1">
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{exp.company}</div>
                        <h4 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
                          {exp.role}
                        </h4>
                      </div>
                      <div className="text-right flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-white/40">{exp.location}</span>
                        <span className="text-white/10">|</span>
                        <span className="text-white/80 font-bold">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pl-2">
                      {exp.highlights.map((bullet, idxb) => (
                        <li key={idxb} className="text-xs text-[#A1A1AA] pl-4 leading-relaxed relative before:content-['—'] before:absolute before:left-0 before:text-white/20">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Skill pills assigned to the work block */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5 pl-2 select-none">
                      {exp.skillsAssociated.map(sk => {
                        const isMainActive = sk === selectedSkillTag;
                        return (
                          <button
                            key={sk}
                            type="button"
                            onClick={() => setSelectedSkillTag(isMainActive ? null : sk)}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono border transition cursor-pointer ${
                              isMainActive 
                                ? 'bg-white/10 border-white/20 text-white' 
                                : 'bg-white/[0.02] border-white/5 text-white/40 hover:text-white hover:border-white/10'
                            }`}
                          >
                            #{sk}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* SYSTEM SKILLS MATRIX SECTION */}
          <section id="skills" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-4 select-none">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">03 / Key Competencies</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-6 bg-white/[0.01] border border-white/10 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-xs font-medium text-white border-b border-white/10 pb-3 mb-4 tracking-[0.15em] select-none flex items-center justify-between uppercase">
                      <span>{cat.title}</span>
                      <Layers size={11} className="text-white/40" />
                    </h4>
                    
                    <div className="flex flex-col gap-1">
                      {cat.skills.map((skill, skIdx) => {
                        const isCurrentlySelected = selectedSkillTag === skill.name;
                        return (
                          <button
                            key={skIdx}
                            type="button"
                            onClick={() => setSelectedSkillTag(isCurrentlySelected ? null : skill.name)}
                            className={`w-full text-left p-2 rounded transition cursor-pointer flex items-center justify-between ${
                              isCurrentlySelected 
                                ? 'bg-white/10 border-l-2 border-white text-white font-medium' 
                                : 'hover:bg-white/5 text-[#A1A1AA] hover:text-white'
                            }`}
                          >
                            <span className="text-xs font-sans">{skill.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 text-[8px] font-mono text-white/30 tracking-wider uppercase select-none">
                    * Click technology to filter career timeline.
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT COMMUNICATION NODE */}
          <section id="contact" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-4 select-none">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">04 / Contact Me</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-8 border-t border-white/10 pb-12 flex flex-col md:flex-row justify-between items-center text-white/30 font-mono text-[9px] gap-4 select-none tracking-widest uppercase">
            <div>
              © 2026 RAM HAU-CHOI LIU. ALL SYSTEM RIGHTS CONFIGURED & PRESERVED.
            </div>
          </footer>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* PERFECT STANDARD BLACK-AND-WHITE PRINTABLE RESUME (HIDDEN ON SCREEN)     */}
      {/* ========================================================================= */}
      <div className="print-only p-8 max-w-4xl mx-auto text-black font-sans bg-white">
        
        {/* Header segment */}
        <div className="border-b-4 border-black pb-4 mb-5 text-center">
          <h1 className="text-3xl font-bold tracking-tight uppercase">{RESUME_INFO.fullName} (Ram Liu)</h1>
          <div className="text-sm font-semibold tracking-wide text-zinc-700 mt-1 uppercase">{RESUME_INFO.title}</div>
          <div className="text-xs text-zinc-650 mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1">
            <span>📍 {RESUME_INFO.contact.address}</span>
            <span>✉️ {RESUME_INFO.contact.email}</span>
            <span>📞 {RESUME_INFO.contact.phone}</span>
          </div>
        </div>
        
        {/* Profile segment */}
        <div className="mb-5">
          <h2 className="text-sm uppercase font-extrabold tracking-wider border-b-2 border-black pb-1 mb-2">Professional Summary</h2>
          <p className="text-xs text-zinc-800 leading-relaxed text-justify">{RESUME_INFO.summary}</p>
        </div>

        {/* Work Timeline segment */}
        <div className="mb-5">
          <h2 className="text-sm uppercase font-extrabold tracking-wider border-b-2 border-black pb-1 mb-3">Work Experience</h2>
          {WORK_EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between font-bold text-xs items-center">
                <span className="text-xs uppercase">{exp.role} — {exp.company}</span>
                <span className="font-normal text-zinc-600 text-[10px]">{exp.period}</span>
              </div>
              <div className="text-[10px] text-zinc-500 italic mb-1.5">{exp.location}</div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {exp.highlights.map((bullet, i) => (
                  <li key={i} className="text-[10px] text-zinc-800 leading-normal pl-1">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Educations segment */}
        <div className="mb-5">
          <h2 className="text-sm uppercase font-extrabold tracking-wider border-b-2 border-black pb-1 mb-2">Education & Professional Development</h2>
          <div className="flex justify-between text-xs font-bold items-center">
            <span className="uppercase">{EDUCATION.degree}</span>
            <span className="font-normal text-zinc-600 text-[10px]">{EDUCATION.period}</span>
          </div>
          <div className="text-[10px] text-zinc-500 italic">{EDUCATION.institution}</div>
          <p className="text-[10px] text-zinc-800 mt-1 lines-relaxed">{EDUCATION.description}</p>
          <div className="text-[9px] text-zinc-500 mt-1.5">
            Core Specialized Modules: {EDUCATION.curriculum.join(', ')}
          </div>
        </div>

        {/* Technical Core categories */}
        <div>
          <h2 className="text-sm uppercase font-extrabold tracking-wider border-b-2 border-black pb-1 mb-2">Systems & Technical Competency</h2>
          <div className="grid grid-cols-1 gap-2.5">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="text-xs">
                <strong className="text-[11px] block uppercase text-zinc-800">{cat.title}</strong>
                <span className="text-[10px] text-zinc-700">
                  {cat.skills.map(s => `${s.name}${s.isKey ? ' (Core Strength)' : ''}`).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
