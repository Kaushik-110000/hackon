"use client";

import { useState } from 'react';
import { 
  ChevronDown, 
  Leaf, 
  Bot, 
  Brain, 
  Award, 
  Users, 
  BarChart3,
  ShoppingCart,
  Recycle,
  Star,
  Shield,
  Target,
  Heart,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordian';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#00A76F] via-[#00A76F] to-[#008A5C] text-white">
    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
            🌱 Sustainable E-commerce Revolution
          </Badge>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Welcome to the
          <span className="block text-green-200">Green Store</span>
        </h1>
        
        <p className="text-xl lg:text-2xl mb-8 text-green-100 leading-relaxed">
          Where sustainability meets technology. Discover eco-friendly products, 
          track your environmental impact, and join a community committed to saving our planet.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-green-200" />
            </div>
            <h3 className="font-semibold text-lg mb-2">100% Eco-Verified</h3>
            <p className="text-green-100">Every product undergoes carbon footprint verification</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-green-200" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Guidance</h3>
            <p className="text-green-100">Sprout chatbot helps you make sustainable choices</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-200" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Rewarding Impact</h3>
            <p className="text-green-100">Earn Green Coins and Eco Badges for sustainable shopping</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Browse Green Store",
      description: "Explore our curated marketplace of 100% sustainable products",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: Bot,
      title: "Chat with Sprout",
      description: "Get personalized recommendations from our AI sustainability assistant",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: Brain,
      title: "AI Recommendations",
      description: "Receive smart product suggestions based on your eco-preferences",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: Star,
      title: "Check Green Score",
      description: "View detailed sustainability ratings and eco-impact data",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      icon: Users,
      title: "Join Group Buys",
      description: "Reduce shipping waste by participating in community purchases",
      color: "bg-orange-100 text-orange-700"
    },
    {
      icon: BarChart3,
      title: "Track Your Impact",
      description: "Monitor your environmental savings and earn rewards in your dashboard",
      color: "bg-green-100 text-green-700"
    }
  ];

  return (
    <section className="py-20 bg-[#F4F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How Green Store Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with verified sustainable products 
            to make eco-friendly shopping effortless and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#00A76F] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-[#00A76F]" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesHighlight = () => {
  const features = [
    {
      icon: Shield,
      title: "LCA Carbon Verification",
      description: "Every product undergoes comprehensive Life Cycle Assessment to ensure authentic sustainability claims."
    },
    {
      icon: Target,
      title: "Green Score System",
      description: "Transparent sustainability ratings help you make informed eco-conscious decisions."
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Join thousands of eco-warriors making a positive environmental impact together."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Green Store?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're not just another e-commerce platform. We're a movement towards 
              a sustainable future, powered by technology and driven by community impact.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-[#00A76F] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:pl-8">
            <Card className="bg-gradient-to-br from-[#00A76F] to-[#008A5C] text-white p-8">
              <div className="text-center">
                <Recycle className="h-16 w-16 mx-auto mb-6 text-green-200" />
                <h3 className="text-2xl font-bold mb-4">Environmental Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-200">50K+</div>
                    <div className="text-sm text-green-100">CO₂ Saved (tons)</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-200">125K+</div>
                    <div className="text-sm text-green-100">Eco Products</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-200">300K+</div>
                    <div className="text-sm text-green-100">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-200">95%</div>
                    <div className="text-sm text-green-100">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What makes Green Store different from other e-commerce platforms?",
      answer: "Green Store is the world's first AI-powered sustainable marketplace that verifies every product through comprehensive Life Cycle Assessment (LCA). We combine cutting-edge technology with environmental responsibility, featuring our AI chatbot Sprout, Green Score ratings, and community-driven Group Buy features."
    },
    {
      question: "How does the Green Score system work?",
      answer: "Our Green Score is calculated using multiple sustainability factors including carbon footprint, renewable energy usage, packaging materials, transportation methods, and manufacturing processes. Each product receives a score from 1-100, with detailed breakdowns so you can make informed eco-friendly choices."
    },
    {
      question: "What is Sprout and how can it help me?",
      answer: "Sprout is our AI-powered sustainability assistant that provides personalized product recommendations based on your preferences, budget, and environmental goals. It can answer questions about product sustainability, suggest alternatives, and help you track your environmental impact over time."
    },
    {
      question: "How do Green Coins and Eco Badges work?",
      answer: "Green Coins are our reward currency earned through sustainable shopping behaviors like choosing high Green Score products, participating in Group Buys, and referring eco-conscious friends. Eco Badges are achievements that recognize your environmental milestones and unlock special perks and discounts."
    },
    {
      question: "What is Life Cycle Assessment (LCA) verification?",
      answer: "LCA is a comprehensive analysis that evaluates a product's environmental impact throughout its entire lifecycle - from raw material extraction to manufacturing, transportation, use, and disposal. Our team of sustainability experts verifies each product's LCA data to ensure authentic environmental claims."
    },
    {
      question: "How do Group Buys reduce environmental impact?",
      answer: "Group Buys allow multiple customers to purchase the same product together, reducing packaging waste and transportation emissions. When you join a Group Buy, you save money while minimizing the carbon footprint per item through consolidated shipping and bulk purchasing."
    },
    {
      question: "Can I track my environmental impact on the platform?",
      answer: "Yes! Your personal dashboard shows detailed metrics including CO₂ saved, water conserved, waste reduced, and renewable energy supported. You can see your progress over time, compare with community averages, and set sustainability goals for future purchases."
    },
    {
      question: "How do you ensure all products are genuinely sustainable?",
      answer: "Every product undergoes our rigorous 5-step verification process: supplier sustainability audit, LCA analysis, third-party certifications review, ongoing monitoring, and customer feedback integration. We maintain a zero-tolerance policy for greenwashing and regularly update our standards."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes! Our mobile app offers all web platform features plus location-based eco-tips, barcode scanning for sustainability checks, offline access to your Green Coins and badges, and push notifications for Group Buy opportunities and personalized recommendations from Sprout."
    },
    {
      question: "How can I become a verified sustainable seller on Green Store?",
      answer: "Sellers must complete our comprehensive sustainability certification process, including business practice audit, product LCA verification, supply chain transparency documentation, and ongoing compliance monitoring. Contact our seller support team to begin the application process."
    }
  ];

  return (
    <section className="py-20 bg-[#F4F8F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Green Store and sustainable shopping
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 rounded-lg">
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-gradient-to-r from-[#00A76F] to-[#008A5C] text-white">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6">
        Ready to Start Your Sustainable Journey?
      </h2>
      <p className="text-xl text-green-100 mb-8">
        Join thousands of eco-conscious shoppers making a positive impact on our planet.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-white text-[#00A76F] hover:bg-gray-100 font-semibold px-8 py-3"
        >
          Start Shopping Green
          <ShoppingCart className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-white text-white hover:bg-white hover:text-[#00A76F] font-semibold px-8 py-3"
        >
          Chat with Sprout
          <MessageCircle className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-200" />
          <div className="font-semibold">Free Account</div>
          <div className="text-green-100 text-sm">No subscription fees</div>
        </div>
        <div>
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-200" />
          <div className="font-semibold">Instant Green Coins</div>
          <div className="text-green-100 text-sm">Start earning rewards</div>
        </div>
        <div>
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-200" />
          <div className="font-semibold">AI Guidance</div>
          <div className="text-green-100 text-sm">Personalized recommendations</div>
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesHighlight />
      <FAQSection />
      <CTASection />
    </main>
  );
}