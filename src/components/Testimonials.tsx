import React, { useRef } from 'react';
import { motion } from './animations/Motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Innovate X Labs transformed our concept into a market-leading product in record time. Their technical expertise and strategic approach are unmatched.",
    author: "Sarah Johnson",
    role: "CTO",
    company: "TechVision Inc."
  },
  {
    quote: "Working with the team at Innovate X Labs was a game-changer for our startup. They helped us refine our product and scale quickly in a competitive market.",
    author: "Michael Chen",
    role: "Founder",
    company: "NexGen Solutions"
  },
  {
    quote: "The insights and innovation that Innovate X Labs brought to our project exceeded our expectations. They're true partners in our success story.",
    author: "Emily Rodriguez",
    role: "VP of Product",
    company: "Frontier Tech"
  },
  {
    quote: "From concept to launch, Innovate X Labs delivered excellence at every stage. Their ability to solve complex technical challenges while keeping sight of our business goals was impressive.",
    author: "David Park",
    role: "CEO",
    company: "Elevate Digital"
  }
];

const Testimonials: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-blue-400 font-medium"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-300"
          >
            We've helped companies across industries turn their ideas into successful products.
          </motion.p>
        </div>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px] snap-center flex-shrink-0 bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 shadow-xl"
              >
                <p className="text-gray-200 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-white">{testimonial.author}</h4>
                  <p className="text-gray-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;