import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Shield, Clock } from 'lucide-react';

export const CTASection = () => {
  const features = [
    {
      icon: Building2,
      title: 'Premium Selection',
      description: 'Curated properties in prime locations',
    },
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'Every property is thoroughly verified',
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get replies within 24 hours',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920"
              alt="Modern interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-lg text-white/90 mb-10 max-w-xl">
                Browse through hundreds of premium apartments and find the perfect match for your lifestyle. Start your journey today.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {features.map(feature => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-white/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link 
                to="/buildings"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Explore Buildings
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
