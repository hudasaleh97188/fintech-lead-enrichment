import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Coins, 
  Users, 
  Shield 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: CreditCard,
      title: 'Digital Banking',
      description: 'Secure online banking platforms for seamless transactions',
      features: ['Mobile app integration', 'Real-time transfers', 'Multi-currency support']
    },
    {
      icon: TrendingUp,
      title: 'Investment Management',
      description: 'Personalized portfolios and advisory services',
      features: ['AI-driven insights', 'Robo-advisors', 'ESG-focused investments']
    },
    {
      icon: DollarSign,
      title: 'Payment Solutions',
      description: 'Efficient payment gateways for businesses',
      features: ['Contactless payments', 'Fraud detection', 'International remittances']
    },
    {
      icon: Briefcase,
      title: 'Asset Management',
      description: 'Handling of assets for high-net-worth individuals',
      features: ['Diversified funds', 'Real estate tokenization', 'Performance tracking']
    },
    {
      icon: Coins,
      title: 'Blockchain & Crypto',
      description: 'Decentralized finance (DeFi) solutions',
      features: ['Wallet integrations', 'Smart contracts', 'NFT marketplaces']
    },
    {
      icon: Users,
      title: 'Financial Consulting',
      description: 'Expert advice on mergers, acquisitions, and compliance',
      features: ['Regulatory guidance', 'Risk assessment', 'Tailored strategies']
    },
    {
      icon: Shield,
      title: 'Insurance Tech',
      description: 'Digital insurance products with instant quotes',
      features: ['AI underwriting', 'Claims processing', 'Customizable policies']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From digital banking to blockchain innovation, we provide cutting-edge fintech services 
            that drive growth and ensure security for individuals, businesses, and institutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.title}
                className="card-service group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-fintech p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-foreground">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className="btn-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-primary rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Finance?</h3>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of satisfied clients who trust PrimePulse with their financial future.
            </p>
            <a href="#contact" className="btn-hero">
              Start Your Journey Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;