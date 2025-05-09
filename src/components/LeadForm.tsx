import React, { useState } from 'react';

interface LeadFormProps {
  onSubmitSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  services: string[];
  budget: string;
  description: string;
  revenue: string;
  currentlySourcing?: string;
  timeline: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    services: [],
    budget: '',
    description: '',
    revenue: '',
    timeline: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.services.length) newErrors.services = 'Please select at least one service';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.description.trim()) newErrors.description = 'Please provide a description';
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Combine description with sourcing info if applicable
        let finalDescription = formData.description;
        if (formData.services.includes('Product Sourcing') && formData.currentlySourcing) {
          finalDescription = `Currently Sourcing: ${formData.currentlySourcing}\n\n${finalDescription}`;
        }

        const response = await fetch('https://hook.eu2.make.com/u3dsdlaehi936wr9kmdwx4t576wolv7o', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || null,
            website: formData.website || null,
            services: formData.services,
            budget: formData.budget,
            description: finalDescription,
            revenue: formData.revenue || null,
            timeline: formData.timeline
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        onSubmitSuccess();
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          website: '',
          services: [],
          budget: '',
          description: '',
          revenue: '',
          timeline: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({
          submit: 'There was an error submitting the form. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-200 text-sm font-medium mb-1">
          Your Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-black/40 border ${
            errors.name ? 'border-red-500' : 'border-orange-500/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-200 text-sm font-medium mb-1">
          Email Address*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-black/40 border ${
            errors.email ? 'border-red-500' : 'border-orange-500/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-gray-200 text-sm font-medium mb-1">
          Phone Number*
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-black/40 border ${
            errors.phone ? 'border-red-500' : 'border-orange-500/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-gray-200 text-sm font-medium mb-1">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black/40 border border-orange-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          placeholder="Company Name (Optional)"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-gray-200 text-sm font-medium mb-1">
          Website or LinkedIn
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black/40 border border-orange-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          placeholder="https:// (Optional)"
        />
      </div>

      <div>
        <label className="block text-gray-200 text-sm font-medium mb-2">
          Services Needed*
        </label>
        <div className="space-y-2">
          {['Product Sourcing', 'Product Development', 'Marketing', 'Other'].map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="services"
                value={service}
                checked={formData.services.includes(service)}
                onChange={handleCheckboxChange}
                className="form-checkbox text-orange-500 rounded border-orange-500/20 bg-black/40"
              />
              <span className="text-white">{service}</span>
            </label>
          ))}
        </div>
        {errors.services && <p className="mt-1 text-sm text-red-400">{errors.services}</p>}
      </div>

      {formData.services.includes('Product Sourcing') && (
        <div>
          <label htmlFor="currentlySourcing" className="block text-gray-200 text-sm font-medium mb-1">
            Are you currently sourcing?
          </label>
          <select
            id="currentlySourcing"
            name="currentlySourcing"
            value={formData.currentlySourcing}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/40 border border-orange-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="budget" className="block text-gray-200 text-sm font-medium mb-1">
          Project Budget*
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-black/40 border ${
            errors.budget ? 'border-red-500' : 'border-orange-500/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
          placeholder="Enter your budget"
        />
        {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-200 text-sm font-medium mb-1">
          Project Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 bg-black/40 border ${
            errors.description ? 'border-red-500' : 'border-orange-500/20'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
          placeholder="Tell us about your project..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="revenue" className="block text-gray-200 text-sm font-medium mb-1">
          Annual Revenue
        </label>
        <select
          id="revenue"
          name="revenue"
          value={formData.revenue}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black/40 border border-orange-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
        >
          <option value="">Select Revenue Range (Optional)</option>
          <option value="<$100,000">Less than $100,000</option>
          <option value="$100,000 – $500,000">$100,000 – $500,000</option>
          <option value="$500,000 – $1,000,000">$500,000 – $1,000,000</option>
          <option value="$1,000,000 - $3,000,000">$1,000,000 - $3,000,000</option>
          <option value="$3,000,000 - $5,000,000">$3,000,000 - $5,000,000</option>
          <option value="$6,000,000+">$6,000,000+</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-200 text-sm font-medium mb-2">
          Project Timeline*
        </label>
        <div className="space-y-2">
          {[
            { value: 'immediate', label: 'Immediate' },
            { value: '1-2-weeks', label: '1–2 Weeks' },
            { value: '1-2-months', label: '1–2 Months' },
            { value: 'flexible', label: 'Flexible' },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="timeline"
                value={option.value}
                checked={formData.timeline === option.value}
                onChange={handleChange}
                className="form-radio text-orange-500 border-orange-500/20 bg-black/40"
              />
              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.timeline && <p className="mt-1 text-sm text-red-400">{errors.timeline}</p>}
      </div>

      {errors.submit && (
        <p className="text-sm text-red-400 text-center">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        By submitting, you agree to our{' '}
        <a href="#" className="text-orange-400 hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="#" className="text-orange-400 hover:underline">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
};

export default LeadForm;