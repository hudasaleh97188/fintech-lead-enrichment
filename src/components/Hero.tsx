import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Empowering Your{' '}
              <span className="text-gradient bg-gradient-to-r from-white to-secondary-light bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
              PrimePulse delivers cutting-edge fintech solutions that transform how you manage, invest, and grow your wealth. 
              Experience the future of finance today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contact" className="btn-hero group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="btn-outline bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                Explore Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-light">200+</div>
                <div className="text-white/80">Expert Team</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-light">$5B+</div>
                <div className="text-white/80">Assets Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-light">50K+</div>
                <div className="text-white/80">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative lg:pl-12 animate-slide-up">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="card-fintech bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                  <TrendingUp className="h-8 w-8 text-secondary-light mb-4" />
                  <h3 className="text-white font-semibold mb-2">Smart Investing</h3>
                  <p className="text-white/80 text-sm">AI-powered portfolio management for optimal returns</p>
                </div>
                <div className="card-fintech bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 mt-8">
                  <Shield className="h-8 w-8 text-secondary-light mb-4" />
                  <h3 className="text-white font-semibold mb-2">Bank-Grade Security</h3>
                  <p className="text-white/80 text-sm">Military-grade encryption protects your assets</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="card-fintech bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                  <Zap className="h-8 w-8 text-secondary-light mb-4" />
                  <h3 className="text-white font-semibold mb-2">Instant Transfers</h3>
                  <p className="text-white/80 text-sm">Lightning-fast global payments and transfers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;