'use client';

import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';
import { ArrowRight, Code2, Sparkles, Zap, Brain, Shield, Users, TrendingUp, CheckCircle, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [stats, setStats] = useState({ users: 0, questions: 0, languages: 0 });
  
  // Stats animation effect
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 100;
      const increment = (target: number) => target / steps;
      
      const usersTarget = 10000;
      const questionsTarget = 250000;
      const languagesTarget = 50;
      
      let currentUsers = 0;
      let currentQuestions = 0;
      let currentLanguages = 0;
      
      const interval = setInterval(() => {
        currentUsers += increment(usersTarget);
        currentQuestions += increment(questionsTarget);
        currentLanguages += increment(languagesTarget);
        
        setStats({
          users: Math.min(Math.floor(currentUsers), usersTarget),
          questions: Math.min(Math.floor(currentQuestions), questionsTarget),
          languages: Math.min(Math.floor(currentLanguages), languagesTarget)
        });
        
        if (currentUsers >= usersTarget && 
            currentQuestions >= questionsTarget && 
            currentLanguages >= languagesTarget) {
          clearInterval(interval);
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    };
    
    animateStats();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-purple-400" />,
      title: "Smart Code Explanation",
      description: "Paste any code snippet and get detailed, line-by-line explanations suitable for your skill level.",
      color: "from-purple-500/20 to-purple-900/10",
      highlights: [
        "Understand complex algorithms",
        "Learn patterns & best practices",
        "Real-time code analysis"
      ]
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: "Instant Debugging",
      description: "Identify bugs instantly with smart fix suggestions and prevention tips for future coding.",
      color: "from-cyan-500/20 to-cyan-900/10",
      highlights: [
        "AI-powered bug detection",
        "Step-by-step solutions",
        "Performance optimization tips"
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-pink-400" />,
      title: "Personalized Learning",
      description: "Adaptive learning paths tailored to your current skill level and career goals.",
      color: "from-pink-500/20 to-pink-900/10",
      highlights: [
        "Custom curriculum builder",
        "Progress tracking",
        "Skill gap analysis"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with complete code privacy and data protection.",
      color: "from-green-500/20 to-green-900/10",
      highlights: [
        "End-to-end encryption",
        "No data sharing",
        "Compliance certified"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer @ Google",
      content: "DevOracle transformed how I mentor junior developers. The AI explanations are incredibly accurate.",
      avatar: "👩‍💻"
    },
    {
      name: "Marcus Rodriguez",
      role: "Bootcamp Instructor",
      content: "My students' progress accelerated by 300% after integrating DevOracle into our curriculum.",
      avatar: "👨‍🏫"
    },
    {
      name: "Alex Thompson",
      role: "Open Source Contributor",
      content: "As someone who reviews lots of PRs, this tool saves me hours of explanation time weekly.",
      avatar: "🧑‍💻"
    }
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30 overflow-hidden">
      <Navbar />
      
      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Demo video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 mb-8 hover:border-purple-500 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Trusted by 10,000+ Developers</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Master Coding with{' '}
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient"
              >
                Intelligent Mentorship
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Get instant code explanations, debugging help, and personalized learning paths. 
              Elevate your programming skills with your 24/7 AI code mentor.
            </motion.p>
            
            {/* Interactive CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link 
                href="/register" 
                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-cyan-600 group-hover:from-purple-700 group-hover:to-cyan-700 transition-all" />
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group w-full sm:w-auto px-8 py-4 bg-gray-900 border border-gray-800 rounded-xl font-semibold text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>
            
            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-colors">
                <div className="text-3xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {stats.users.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-400 mt-2">Active Developers</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-colors">
                <div className="text-3xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {stats.questions.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-400 mt-2">Questions Answered</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-colors">
                <div className="text-3xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {stats.languages}+
                </div>
                <div className="text-sm text-gray-400 mt-2">Languages Supported</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 bg-linear-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Developers{' '}
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Love DevOracle
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the future of code mentorship with our intelligent platform
            </p>
          </motion.div>

          {/* Feature Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeFeature === index 
                  ? 'bg-linear-to-r from-purple-600 to-cyan-600 text-white' 
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {feature.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Feature Display */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <div className="p-8 rounded-3xl bg-linear-to-br from-gray-900 to-black border border-gray-800">
              <div className="mb-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${features[activeFeature].color}`}>
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold">{features[activeFeature].title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{features[activeFeature].description}</p>
                <ul className="space-y-3">
                  {features[activeFeature].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Interactive Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
                    <div className="text-purple-400">// {features[activeFeature].title.toLowerCase()} example</div>
                    <div className="text-cyan-400 mt-2">function devOracleHelp() {'{'}</div>
                    <div className="text-green-400 ml-4">  // AI-powered analysis</div>
                    <div className="text-white ml-4">  return instantSolution();</div>
                    <div className="text-cyan-400">{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-6 rounded-2xl border transition-all ${hoveredCard === index 
                  ? 'border-purple-500/50 bg-gray-900/80' 
                  : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                <div className={`mb-4 p-3 rounded-xl w-fit transition-transform ${hoveredCard === index ? 'scale-110' : ''}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title.split(' ')[0]}</h3>
                <p className="text-sm text-gray-400">{feature.description.substring(0, 80)}...</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-linear-to-b from-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Trusted by{' '}
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Developers Worldwide
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            <button
              onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="overflow-hidden">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">{testimonials[testimonialIndex].avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold">{testimonials[testimonialIndex].name}</h3>
                    <p className="text-gray-400">{testimonials[testimonialIndex].role}</p>
                  </div>
                </div>
                <p className="text-xl text-gray-300 italic">"{testimonials[testimonialIndex].content}"</p>
                
                {/* Testimonial Indicators */}
                <div className="flex gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${testimonialIndex === idx 
                        ? 'bg-linear-to-r from-purple-400 to-cyan-400 w-8' 
                        : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-12">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Level Up Your{' '}
                <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Coding Skills?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already accelerating their learning journey with DevOracle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="group px-10 py-4 bg-linear-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="px-10 py-4 bg-gray-900 border border-gray-800 rounded-xl font-semibold text-gray-300 hover:bg-gray-800 transition-all"
                >
                  Sign In
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-6">No credit card required • Free forever plan available</p>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <div className="mb-6 p-4 rounded-xl bg-gray-950 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}