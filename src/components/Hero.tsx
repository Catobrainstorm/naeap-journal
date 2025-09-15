'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6
        }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
            >
            <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <Award className="w-4 h-4 mr-2" />
                Premier Academic Journal
                </span>
            </motion.div>

            <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NAEAP
                </span>
                <br />
                <span className="text-3xl md:text-5xl font-normal text-gray-700">
                Academic Journal
                </span>
            </motion.h1>

            <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
                Advancing knowledge through rigorous research and scholarly excellence. 
                Discover groundbreaking studies and innovative perspectives from leading academics worldwide.
            </motion.p>

            <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
                <Link
                href="/archives"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                Explore Journals
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                href="/submissions"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                Submit Research
                <BookOpen className="ml-2 w-5 h-5" />
                </Link>
            </motion.div>
            </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
            <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-indigo-600 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-indigo-600 rounded-full mt-2 animate-pulse"></div>
            </div>
            </div>
        </motion.div>
        </section>
    );
};

export default Hero;