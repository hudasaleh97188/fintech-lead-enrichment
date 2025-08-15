import { Target, Eye, MapPin, Calendar, Users, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2015', event: 'PrimePulse founded in Dubai, UAE' },
    { year: '2017', event: 'Reached $100M in assets under management' },
    { year: '2019', event: 'Expanded to 15 countries across MENA region' },
    { year: '2020', event: 'Launched first DeFi platform' },
    { year: '2022', event: 'Achieved $5B+ in managed assets' },
    { year: '2024', event: 'Leading fintech innovation in emerging markets' }
  ];

  const stats = [
    { icon: Users, number: '200+', label: 'Expert Team Members' },
    { icon: Award, number: '$5B+', label: 'Assets Under Management' },
    { icon: MapPin, number: '15+', label: 'Countries Served' },
    { icon: Calendar, number: '9+', label: 'Years of Excellence' }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            PrimePulse is a leading fintech innovator based in Dubai, UAE, founded in 2015. 
            We blend cutting-edge technology with financial expertise to deliver secure, scalable solutions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Mission & Vision */}
          <div className="space-y-8 animate-slide-up">
            <div className="card-fintech">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-fintech p-2 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize finance through innovation and inclusivity. We believe that advanced 
                financial tools should be accessible to everyone, from individual investors to large 
                institutions, empowering them to achieve their financial goals.
              </p>
            </div>

            <div className="card-fintech">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-accent p-2 rounded-lg mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become the go-to fintech partner for global prosperity. We envision a world where 
                financial barriers are eliminated, and every individual and business has the tools 
                to thrive in the digital economy.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-3xl font-bold text-primary mb-8">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="card-fintech text-center">
                    <div className="bg-gradient-fintech p-3 rounded-xl w-fit mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div className="card-fintech mb-16 animate-fade-in">
          <h3 className="text-3xl font-bold text-primary mb-6">About PrimePulse</h3>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Our team of 200+ experts includes blockchain pioneers, investment strategists, and fintech visionaries, 
              all committed to driving economic growth in emerging markets. We combine deep financial knowledge with 
              cutting-edge technology to create solutions that are not just innovative, but practical and secure.
            </p>
            <p>
              From our headquarters in Dubai, we serve clients across 15 countries, managing over $5 billion in assets. 
              Our comprehensive suite of services spans digital banking, investment management, blockchain solutions, 
              and financial consulting, making us a one-stop destination for all financial needs.
            </p>
            <p>
              What sets us apart is our commitment to security, transparency, and client success. Every solution we 
              develop undergoes rigorous testing and compliance checks, ensuring that our clients can trust us with 
              their most valuable assets.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="animate-fade-in">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Our Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-secondary h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="card-fintech">
                      <div className="text-2xl font-bold text-secondary mb-2">{milestone.year}</div>
                      <div className="text-muted-foreground">{milestone.event}</div>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-secondary rounded-full border-4 border-background shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;