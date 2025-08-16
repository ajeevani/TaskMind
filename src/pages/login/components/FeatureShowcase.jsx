import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureShowcase = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      id: 1,
      title: "AI-Powered Task Creation",
      description: "Let AI help you break down complex projects into manageable tasks with smart suggestions and automatic prioritization.",
      icon: "Brain",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
      benefits: ["Smart task breakdown", "Auto-prioritization", "Context-aware suggestions"]
    },
    {
      id: 2,
      title: "Intelligent Scheduling",
      description: "AI analyzes your work patterns and automatically schedules tasks at optimal times for maximum productivity.",
      icon: "Calendar",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?w=600&h=400&fit=crop&crop=center",
      benefits: ["Optimal time slots", "Pattern recognition", "Productivity insights"]
    },
    {
      id: 3,
      title: "Smart Collaboration",
      description: "Seamlessly collaborate with team members while AI handles task distribution and progress tracking.",
      icon: "Users",
      image: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=600&h=400&fit=crop&crop=center",
      benefits: ["Auto task assignment", "Progress tracking", "Team insights"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features?.length]);

  const currentFeatureData = features?.[currentFeature];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center h-full bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 p-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-success/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-primary/5 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="relative z-10 max-w-lg text-center space-y-8">
        {/* Logo and Tagline */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center ambient-glow">
              <Icon name="Brain" size={24} color="white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TaskMind AI</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Supercharge your productivity with AI-powered task management
          </p>
        </div>

        {/* Feature Showcase */}
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 shadow-elevated border border-border/50">
          {/* Feature Image */}
          <div className="relative mb-6 overflow-hidden rounded-xl">
            <Image
              src={currentFeatureData?.image}
              alt={currentFeatureData?.title}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm rounded-full p-2">
              <Icon name={currentFeatureData?.icon} size={20} color="white" />
            </div>
          </div>

          {/* Feature Content */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-semibold text-foreground">
              {currentFeatureData?.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentFeatureData?.description}
            </p>

            {/* Benefits */}
            <div className="space-y-2">
              {currentFeatureData?.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Navigation Dots */}
        <div className="flex justify-center space-x-2">
          {features?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeature(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20
                ${index === currentFeature 
                  ? 'bg-primary scale-110' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }
              `}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">95%</div>
            <div className="text-sm text-muted-foreground">Productivity Boost</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">AI Assistant</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;