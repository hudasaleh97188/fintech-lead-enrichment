
import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  city: string;
  country: string;
  company: string;
  interestedIn: string[];
  inquiry: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    city: '',
    country: '',
    company: '',
    interestedIn: [],
    inquiry: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    'United States', 'United Kingdom', 'United Arab Emirates', 'Canada', 'Australia',
    'Germany', 'France', 'Singapore', 'Hong Kong', 'Japan', 'India', 'Saudi Arabia',
    'Switzerland', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Other'
  ];

  const services = [
    'Digital Banking',
    'Investment Management',
    'Payment Solutions',
    'Asset Management',
    'Blockchain & Crypto Services',
    'Financial Consulting',
    'Insurance Tech'
  ];

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'contactNumber':
        return /^(\+|00)[1-9]\d{8,14}$/.test(value);
      case 'city':
        return value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
      case 'country':
        return value.length > 0;
      case 'company':
        return value.length >= 3;
      case 'interestedIn':
        return value.length > 0;
      case 'inquiry':
        return value.length > 0 && value.length <= 500;
      default:
        return true;
    }
  };

  const getErrorMessage = (name: string) => {
    switch (name) {
      case 'firstName':
        return 'Please enter your first name.';
      case 'lastName':
        return 'Please enter your last name.';
      case 'email':
        return 'Please enter a valid email.';
      case 'contactNumber':
        return 'Please enter a valid international number, e.g., +971500000000.';
      case 'city':
        return 'Please enter your city.';
      case 'country':
        return 'Please select your country.';
      case 'company':
        return 'Please enter your company name.';
      case 'interestedIn':
        return 'Please select at least one service.';
      case 'inquiry':
        return 'Please enter your inquiry (max 500 characters).';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      interestedIn: prev.interestedIn.includes(service)
        ? prev.interestedIn.filter(s => s !== service)
        : [...prev.interestedIn, service]
    }));
    
    if (errors.interestedIn) {
      setErrors(prev => ({ ...prev, interestedIn: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (!validateField(key, formData[key as keyof FormData])) {
        newErrors[key] = getErrorMessage(key);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const saveResponse = await fetch('/api/save-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save contact');
      }

      const saveData = await saveResponse.json();
      const leadId = saveData.lead_id;

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest.",
      });

      // Store data for enrichment before resetting form
      const enrichmentPayload = {
        lead_id: leadId,
        company_name: formData.company,
        person_name: `${formData.firstName} ${formData.lastName}`.trim(),
        enrichment_status: "pending"
      };

      // Reset form and UI state immediately
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        city: '',
        country: '',
        company: '',
        interestedIn: [],
        inquiry: ''
      });

      // Fire-and-forget the enrichment process
      fetch('/api/enrich-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichmentPayload),
      }).then(response => {
        if (!response.ok) {
          console.error('Background lead enrichment failed.');
        }
      }).catch(error => {
        console.error('Error in background lead enrichment:', error);
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your financial future? Our team of experts is here to help 
            you navigate the world of modern fintech solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 animate-slide-up">
            <div className="card-fintech">
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-fintech p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Headquarters</h4>
                    <p className="text-muted-foreground">
                      Dubai International Financial Centre<br />
                      Gate Village 10, Level 5<br />
                      Dubai, UAE
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-fintech p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-muted-foreground">+971 4 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-fintech p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">contact@primepulse.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                <h4 className="font-semibold text-primary mb-2">Business Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Sunday - Thursday: 9:00 AM - 6:00 PM GST<br />
                  Friday - Saturday: Closed
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card-fintech">
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                        errors.firstName ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                        errors.lastName ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                        errors.email ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                        errors.contactNumber ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="e.g., +971500000000"
                    />
                    {errors.contactNumber && (
                      <p className="text-destructive text-sm mt-1">{errors.contactNumber}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                        errors.city ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="text-destructive text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                        errors.country ? 'border-destructive' : 'border-border'
                      }`}
                    >
                      <option value="">Select your country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-destructive text-sm mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                      errors.company ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter your company name"
                  />
                  {errors.company && (
                    <p className="text-destructive text-sm mt-1">{errors.company}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Interested In *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map(service => (
                      <label key={service} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interestedIn.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
                        />
                        <span className="text-sm text-foreground">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.interestedIn && (
                    <p className="text-destructive text-sm mt-1">{errors.interestedIn}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type your inquiry * ({formData.inquiry.length}/500)
                  </label>
                  <textarea
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    rows={5}
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors resize-none ${
                      errors.inquiry ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Please describe how we can help you..."
                  />
                  {errors.inquiry && (
                    <p className="text-destructive text-sm mt-1">{errors.inquiry}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-hero flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
