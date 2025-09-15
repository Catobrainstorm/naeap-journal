'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, BookOpen } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        journal: [
        { name: 'Current Issue', href: '/archives' },
        { name: 'Archives', href: '/archives' },
        { name: 'Submit Article', href: '/submissions' },
        { name: 'Editorial Board', href: '/about#editorial-board' },
        ],
        about: [
        { name: 'About Us', href: '/about#about-us' },
        { name: 'Editorial Guidelines', href: '/about#ethical-guidelines' },
        { name: 'Announcements', href: '/about#announcements' },
        { name: 'Contact', href: '/complaints' },
        ],
        policies: [
        { name: 'Submission Guidelines', href: '/submissions' },
        { name: 'Ethical Guidelines', href: '/about#ethical-guidelines' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        ]
    };

    return (
        <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div className="lg:col-span-1">
                <div className="flex items-center mb-4">
                    <BookOpen className="w-8 h-8 text-indigo-400 mr-3" />
                    <h3 className="text-2xl font-bold">NEAP</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    Advancing academic excellence through rigorous research and scholarly publication. 
                    Join our community of researchers and academics.
                </p>
                <div className="flex space-x-4">
                    <a 
                    href="#" 
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    aria-label="Facebook"
                    >
                    <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                    href="#" 
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    aria-label="Twitter"
                    >
                    <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                    href="#" 
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    aria-label="LinkedIn"
                    >
                    <Linkedin className="w-5 h-5" />
                    </a>
                </div>
                </div>

                {/* Journal Links */}
                <div>
                <h4 className="text-lg font-semibold mb-4">Journal</h4>
                <ul className="space-y-3">
                    {footerLinks.journal.map((link) => (
                    <li key={link.name}>
                        <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                        {link.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>

                {/* About Links */}
                <div>
                <h4 className="text-lg font-semibold mb-4">About</h4>
                <ul className="space-y-3">
                    {footerLinks.about.map((link) => (
                    <li key={link.name}>
                        <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                        {link.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Contact & Policies */}
                <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-3 text-indigo-400" />
                    <span className="text-sm">naeapjseam2023@gmail.com</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-3 text-indigo-400" />
                    <span className="text-sm">+234 703 440 5533</span>
                    </div>
                    <div className="flex items-start text-gray-300">
                    <MapPin className="w-4 h-4 mr-3 mt-0.5 text-indigo-400 flex-shrink-0" />
                    <span className="text-sm">123 Academic Ave, University City, UC 12345</span>
                    </div>
                </div>
                
                <h5 className="text-sm font-semibold mb-3 text-gray-200">Policies</h5>
                <ul className="space-y-2">
                    {footerLinks.policies.map((link) => (
                    <li key={link.name}>
                        <Link 
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                        >
                        {link.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="border-t border-gray-800 py-8">
            <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
                <p className="text-gray-300">Get notified about new publications and announcements.</p>
                </div>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:rounded-r-none"
                />
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-r-md transition-colors duration-200 mt-2 sm:mt-0">
                    Subscribe
                </button>
                </div>
            </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © {currentYear} NEAP Academic Journal. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                    Terms of Service
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                    Accessibility
                </Link>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;