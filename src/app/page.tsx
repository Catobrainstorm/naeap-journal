'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Users, 
  Award, 
  Download, 
  ArrowRight, 
  Eye, 
  Clock, 
  Star,
  Search,
  TrendingUp,
  Globe,
  FileText,
  CheckCircle,
  Zap
} from 'lucide-react';
import Hero from '@/components/Hero';

const HomePage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Powerful search capabilities across all published research papers and articles."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Peer Reviewed",
      description: "All submissions undergo rigorous peer review by experts in respective fields."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connect with researchers and academics from institutions worldwide."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Open Access",
      description: "Free access to high-quality research promoting knowledge sharing."
    }
  ];

  const stats = [
    { number: "5K+", label: "Published Papers", icon: <FileText className="w-6 h-6" /> },
    { number: "2K+", label: "Active Researchers", icon: <Users className="w-6 h-6" /> },
    { number: "100+", label: "Universities", icon: <Award className="w-6 h-6" /> },
    { number: "95%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> }
  ];

  const recentJournals = [
    {
      title: "Advances in Machine Learning",
      category: "Computer Science",
      publishDate: "March 2024",
      downloads: "2.3K",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Climate Change Research",
      category: "Environmental Science",
      publishDate: "February 2024",
      downloads: "1.8K",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Medical Innovations",
      category: "Healthcare",
      publishDate: "January 2024",
      downloads: "3.1K",
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide researchers with the tools and platform they need to share groundbreaking 
              discoveries and advance human knowledge.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-4 text-indigo-200">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-indigo-200 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Journals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Publications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most recent research publications from leading academics 
              and institutions around the world.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {recentJournals.map((journal, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{journal.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {journal.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {journal.publishDate}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {journal.downloads}
                    </div>
                  </div>
                  <Link
                    href={`/journals/${index + 1}`}
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/archives"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Journals
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Accelerate Your Research Impact
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our platform empowers researchers to share their work with a global audience, 
                facilitating collaboration and advancing scientific knowledge.
              </p>
              <div className="space-y-4">
                {[
                  "Fast-track publication process",
                  "Global visibility and citations",
                  "Expert peer review network",
                  "Advanced analytics and metrics"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                    <div className="text-3xl font-bold mb-2">40%</div>
                    <div className="text-indigo-200">Faster Publication</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-indigo-200">Support Available</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                    <div className="text-3xl font-bold mb-2">180+</div>
                    <div className="text-indigo-200">Countries Reached</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                    <div className="text-3xl font-bold mb-2">4.9</div>
                    <div className="text-indigo-200">Average Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Share Your Research?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Join our community of researchers and contribute to the advancement of knowledge. 
              Submit your manuscript today and reach a global academic audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submissions"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Your Paper
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Learn More
                <BookOpen className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;