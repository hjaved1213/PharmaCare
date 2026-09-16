import React from 'react';
import { Award, Code, Lightbulb, Rocket, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="p-6 md:p-10 mx-auto max-w-5xl transition-all duration-300">
      <div className="glass-card rounded-[40px] p-12 shadow-2xl relative overflow-hidden border border-white/10">
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10"></div>
        
        <h1 className="text-5xl font-black text-white mb-8 tracking-tighter italic">
          About PHARMA<span className="text-blue-500">CARE</span>
        </h1>
        
        <div className="space-y-10 text-gray-300 leading-relaxed">
          {/* Professional Vision Section */}
          <section className="relative">
            <h3 className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-2">
              <Award size={18} /> The Paradigm Shift
            </h3>
            <p className="text-lg font-medium text-gray-200">
              PharmaCare represents a paradigm shift in pharmaceutical management, meticulously engineered by lead developer <span className="text-white font-bold underline decoration-blue-500">Hamza Javed</span>. 
              Born from a vision of operational excellence, this comprehensive ecosystem bridges the gap between complex backend inventory control and a seamless, high-performance user experience.
            </p>
          </section>

          {/* Development Journey Section */}
          <section>
            <h3 className="text-purple-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-2">
              <Code size={18} /> Technical Resilience
            </h3>
            <p className="text-gray-300">
              The architecture of PharmaCare is a result of intensive research and iterative development. From implementing complex aggregation pipelines in MongoDB to crafting a responsive Glassmorphism interface, every line of code has been optimized for stability. We navigated through rigorous debugging phases and architectural challenges to deliver a robust, enterprise-grade solution that pharmacies can trust implicitly.
            </p>
          </section>

          {/* Cards with Custom Hover Effect (Up & Right Tilt) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-6">
            
            {/* Card 1: Innovation */}
            <div className="group bg-white/5 p-8 rounded-[32px] border border-white/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 hover:shadow-2xl hover:shadow-blue-500/20 cursor-default">
              <div className="bg-yellow-400/10 w-fit p-3 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500">
                <Lightbulb className="text-yellow-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Analytical Innovation</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Leveraging a context-aware AI assistant to provide real-time data interpretation, turning complex inventory metrics into actionable business intelligence.
              </p>
            </div>

            {/* Card 2: Scale */}
            <div className="group bg-white/5 p-8 rounded-[32px] border border-white/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 hover:shadow-2xl hover:shadow-purple-500/20 cursor-default">
              <div className="bg-blue-400/10 w-fit p-3 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500">
                <Rocket className="text-blue-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Unmatched Scalability</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Engineered for high-volume transactions with real-time synchronization, ensuring the platform scales seamlessly with your pharmacy's growth.
              </p>
            </div>

            {/* Card 3: Security */}
            <div className="group bg-white/5 p-8 rounded-[32px] border border-white/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 hover:shadow-2xl hover:shadow-green-500/20 cursor-default">
              <div className="bg-green-400/10 w-fit p-3 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="text-green-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Enterprise Security</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                A fortified system architecture featuring secure authentication and data encryption protocols to safeguard sensitive pharmaceutical records.
              </p>
            </div>

            {/* Card 4: Performance */}
            <div className="group bg-white/5 p-8 rounded-[32px] border border-white/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 hover:shadow-2xl hover:shadow-orange-500/20 cursor-default">
              <div className="bg-orange-400/10 w-fit p-3 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500">
                <Zap className="text-orange-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Ultra-Low Latency</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Optimized for rapid response times across all modules, from POS checkouts to deep inventory searches, ensuring zero downtime.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;