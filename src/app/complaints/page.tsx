'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Phone, Mail, MapPin, Clock, CheckCircle, AlertTriangle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ComplaintsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        priority: 'medium'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission process
        setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        }, 2000);
    };

    const complaintCategories = [
        'Editorial Process',
        'Peer Review',
        'Publication Issue',
        'Website/Technical',
        'Subscription/Access',
        'Plagiarism Concern',
        'Ethical Violation',
        'Other'
    ];

    const faqItems = [
        {
        question: 'How long does it take to receive a response?',
        answer: 'We respond to most inquiries within 24-48 hours during business days. Urgent matters are prioritized and typically addressed within 24 hours.'
        },
        {
        question: 'What information should I include in my complaint?',
        answer: 'Please provide as much detail as possible, including dates, manuscript IDs (if applicable), and specific concerns. This helps us address your issue more efficiently.'
        },
        {
        question: 'Can I submit an anonymous complaint?',
        answer: 'While we prefer to have contact information to provide updates, you can submit concerns anonymously. However, this limits our ability to follow up with you.'
        },
        {
        question: 'What happens after I submit a complaint?',
        answer: 'You will receive an acknowledgment email with a reference number. Our team will review your complaint and provide regular updates on the investigation progress.'
        }
    ];

    const contactInfo = [
        {
        icon: Mail,
        title: 'Email',
        content: 'complaints@neap.org',
        description: 'Send us an email for detailed inquiries'
        },
        {
        icon: Phone,
        title: 'Phone',
        content: '+1 (555) 123-4567',
        description: 'Call us during business hours'
        },
        {
        icon: MapPin,
        title: 'Address',
        content: '123 Academic Street, Research City, RC 12345',
        description: 'Visit our main office'
        },
        {
        icon: Clock,
        title: 'Business Hours',
        content: 'Mon-Fri: 9:00 AM - 6:00 PM',
        description: 'We\'re here to help during these hours'
        }
    ];

    if (submitSuccess) {
        return (
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-xl"
            >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
                Thank you for contacting us. We have received your message and will respond within 24-48 hours. 
                Your reference number is: <span className="font-semibold text-indigo-600">#NEAP-2024-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <button
                onClick={() => {
                setSubmitSuccess(false);
                setFormData({
                    name: '', email: '', phone: '', category: '', 
                    subject: '', message: '', priority: 'medium'
                });
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
                Send Another Message
            </button>
            </motion.div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Contact & Complaints
                </h1>
                <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                We value your feedback and are committed to addressing your concerns promptly and professionally.
                </p>
            </motion.div>
            </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8"
                >
                <div className="flex items-center mb-6">
                    <MessageCircle className="w-6 h-6 text-indigo-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                        </label>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email address"
                        />
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                        </label>
                        <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                        </label>
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                        <option value="">Select a category</option>
                        {complaintCategories.map((category) => (
                            <option key={category} value={category}>
                            {category}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                    </label>
                    <div className="flex space-x-4">
                        {['low', 'medium', 'high', 'urgent'].map((level) => (
                        <label key={level} className="flex items-center">
                            <input
                            type="radio"
                            name="priority"
                            value={level}
                            checked={formData.priority === level}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className={`ml-2 text-sm font-medium capitalize ${
                            level === 'urgent' ? 'text-red-600' : 
                            level === 'high' ? 'text-orange-600' : 
                            level === 'medium' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                            {level === 'urgent' && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                            {level}
                            </span>
                        </label>
                        ))}
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Brief description of your concern"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-vertical"
                        placeholder="Please provide detailed information about your complaint or inquiry..."
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                    {isSubmitting ? (
                        <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending...
                        </>
                    ) : (
                        <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                        </>
                    )}
                    </button>
                </form>
                </motion.div>
            </div>

            {/* Contact Information & FAQ */}
            <div className="space-y-8">
                {/* Contact Information */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
                >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        <p className="text-indigo-600 font-medium">{info.content}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
                >
                <div className="flex items-center mb-6">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                        <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                        >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === index ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                        </button>
                        {expandedFaq === index && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-3"
                        >
                            <p className="text-gray-600">{faq.answer}</p>
                        </motion.div>
                        )}
                    </div>
                    ))}
                </div>
                </motion.div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ComplaintsPage;