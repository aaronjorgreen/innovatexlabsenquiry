import React, { useState } from 'react';

interface LeadFormProps {
  onSubmitSuccess: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Product Development',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      console.log('Form submitted:', formData);
      
      // Call the success callback
      onSubmitSuccess();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        interest: 'Product Development',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-200 text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-white/5 border ${
            errors.name ? 'border-red-500' : 'border-white/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-200 text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-white/5 border ${
            errors.email ? 'border-red-500' : 'border-white/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="company" className="block text-gray-200 text-sm font-medium mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-white/5 border ${
            errors.company ? 'border-red-500' : 'border-white/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white`}
          placeholder="Acme Inc."
        />
        {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
      </div>
      
      <div>
        <label htmlFor="interest" className="block text-gray-200 text-sm font-medium mb-1">
          Primary Interest
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="Product Development">Product Development</option>
          <option value="Research & Innovation">Research & Innovation</option>
          <option value="Technology Consulting">Technology Consulting</option>
          <option value="Digital Transformation">Digital Transformation</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Get Started
      </button>
      
      <p className="text-xs text-gray-400 text-center mt-4">
        By submitting, you agree to our{' '}
        <a href="#" className="text-blue-400 hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="#" className="text-blue-400 hover:underline">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
};

export default LeadForm;