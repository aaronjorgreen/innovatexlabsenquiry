import React from 'react';
import { Lightbulb, Code, BarChart as ChartBar, Rocket } from 'lucide-react';
import { motion } from './animations/Motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow group"
    >
      <div className="p-4 bg-blue-50 rounded-lg inline-block mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: 'Product Innovation',
      description: 'Transforming your ideas into market-ready products with cutting-edge technology and human-centered design.',
      icon: <Lightbulb size={28} />,
    },
    {
      title: 'Custom Development',
      description: 'Building tailored software solutions that solve complex problems and drive business growth.',
      icon: <Code size={28} />,
    },
    {
      title: 'Data Analytics',
      description: 'Unlocking insights from your data to make informed decisions and identify new opportunities.',
      icon: <ChartBar size={28} />,
    },
    {
      title: 'Go-to-Market Strategy',
      description: 'Creating comprehensive strategies to successfully launch your product into the market.',
      icon: <Rocket size={28} />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-blue-600 font-medium"
          >
            OUR SERVICES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900"
          >
            How We Help You Innovate
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            We combine deep technical expertise with strategic thinking to help you build the next generation of innovative products.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;