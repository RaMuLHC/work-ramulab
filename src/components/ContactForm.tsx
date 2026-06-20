import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle, Clock } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [localFeeds, setLocalFeeds] = useState<ContactMessage[]>([]);

  // On mount, load previously typed messages for simulated persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ram_contact_dispatches');
      if (saved) {
        setLocalFeeds(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const newDispatch: ContactMessage = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || 'General Inquiry',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    const updated = [newDispatch, ...localFeeds];
    setLocalFeeds(updated);
    try {
      localStorage.setItem('ram_contact_dispatches', JSON.stringify(updated));
    } catch {}

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-white/[0.01] border border-white/10 rounded-lg p-6 shadow-2xl" id="contact-form-component">
      <div className="border-b border-white/10 pb-4 mb-5 select-none">
        <span className="text-[9px] font-mono font-medium text-white/40 uppercase tracking-widest">Inquiry Form</span>
        <h4 className="text-xs font-semibold text-white font-mono mt-1 flex items-center gap-1.5 uppercase tracking-wider">
          <MessageSquare size={13} className="text-white/40" /> Send a Message
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono text-white/40 uppercase mb-1 tracking-wider">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hiring Manager"
              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 text-white text-xs rounded p-2.5 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-white/40 uppercase mb-1 tracking-wider">Your Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hr@company.com"
              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 text-white text-xs rounded p-2.5 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-white/40 uppercase mb-1 tracking-wider">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. IT Career Opportunity"
            className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 text-white text-xs rounded p-2.5 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-white/40 uppercase mb-1 tracking-wider">Your Message *</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please write your inquiry, potential career opportunities, or project details here..."
            className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 text-white text-xs rounded p-2.5 outline-none transition resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-[10px] font-mono text-white/30 flex items-center gap-1 select-none">
            <AlertCircle size={11} className="text-white/20" /> All submissions are processed securely
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 font-mono text-[10px] font-bold tracking-widest text-[#F5F5F5] bg-white/5 border border-white/10 hover:bg-white/10 transition rounded flex items-center gap-2 cursor-pointer min-h-[40px] uppercase"
          >
            SEND MESSAGE <Send size={11} />
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-4 p-3 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 rounded text-[11px] font-mono flex items-center gap-2">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span>Your message has been submitted successfully. Scroll below to view the message history queue.</span>
        </div>
      )}

      {/* Recruiter Inbox Feed Section */}
      {localFeeds.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 font-semibold select-none">
            Submitted Messages Queue ({localFeeds.length})
          </div>
          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
            {localFeeds.map((feed, idx) => (
              <div key={idx} className="p-4 bg-white/[0.01] border border-white/5 rounded space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-medium">● {feed.name}</span>
                    <span className="text-white/20">({feed.email})</span>
                  </div>
                  <span className="flex items-center gap-1 text-[9px]"><Clock size={10} /> {feed.timestamp}</span>
                </div>
                <div className="text-white text-xs font-semibold leading-snug font-mono mt-0.5">
                  Subject: {feed.subject}
                </div>
                <p className="text-[11px] text-[#A1A1AA] font-mono italic leading-normal whitespace-pre-wrap pl-3 border-l-2 border-white/20">
                  {feed.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
