'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Users, Award, Send, Download, Info } from 'lucide-react';

const SubmissionsPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        authorName: '',
        authorEmail: '',
        affiliation: '',
        keywords: '',
        researchArea: '',
        manuscript: null as File | null,
        coverLetter: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
        }
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

    const researchAreas = [
        'Educational Psychology',
        'Assessment and Evaluation',
        'Curriculum Development',
        'Higher Education',
        'Educational Technology',
        'Special Education',
        'Educational Leadership',
        'Teacher Education',
        'Student Development',
        'Educational Policy'
    ];

    const submissionProcess = [
        {
        step: 1,
        title: 'Initial Review',
        description: 'Manuscript undergoes initial editorial review for scope and quality.',
        duration: '5-7 days',
        icon: FileText
        },
        {
        step: 2,
        title: 'Peer Review',
        description: 'Double-blind peer review by subject matter experts.',
        duration: '4-8 weeks',
        icon: Users
        },
        {
        step: 3,
        title: 'Editorial Decision',
        description: 'Final decision based on peer review recommendations.',
        duration: '1-2 weeks',
        icon: Award
        },
        {
        step: 4,
        title: 'Publication',
        description: 'Accepted manuscripts are prepared for publication.',
        duration: '2-4 weeks',
        icon: CheckCircle
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submission Successful!</h2>
            <p className="text-gray-600 mb-6">
                Your manuscript has been successfully submitted. You will receive a confirmation email shortly with your submission ID.
            </p>
            <button
                onClick={() => {
                setSubmitSuccess(false);
                setFormData({
                    title: '', abstract: '', authorName: '', authorEmail: '', 
                    affiliation: '', keywords: '', researchArea: '', 
                    manuscript: null, coverLetter: null
                });
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
                Submit Another Paper
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
                Submit Your Research
                </h1>
                <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                Share your groundbreaking research with the global academic community. 
                Join thousands of researchers who have published with NAEAP.
                </p>
            </motion.div>
            </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Submission Form */}
            <div className="lg:col-span-2">
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8"
                >
                <div className="flex items-center mb-6">
                    <Upload className="w-6 h-6 text-indigo-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Manuscript Submission</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Manuscript Title */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manuscript Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your manuscript title"
                    />
                    </div>

                    {/* Abstract */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Abstract *
                    </label>
                    <textarea
                        name="abstract"
                        required
                        rows={6}
                        value={formData.abstract}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your manuscript abstract (max 300 words)"
                    />
                    </div>

                    {/* Author Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lead Author Name *
                        </label>
                        <input
                        type="text"
                        name="authorName"
                        required
                        value={formData.authorName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Dr. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                        </label>
                        <input
                        type="email"
                        name="authorEmail"
                        required
                        value={formData.authorEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="john.doe@university.edu"
                        />
                    </div>
                    </div>

                    {/* Affiliation */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institutional Affiliation *
                    </label>
                    <input
                        type="text"
                        name="affiliation"
                        required
                        value={formData.affiliation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="University of Excellence, Department of Education"
                    />
                    </div>

                    {/* Research Area and Keywords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Research Area *
                        </label>
                        <select
                        name="researchArea"
                        required
                        value={formData.researchArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                        <option value="">Select research area</option>
                        {researchAreas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords *
                        </label>
                        <input
                        type="text"
                        name="keywords"
                        required
                        value={formData.keywords}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="keyword1, keyword2, keyword3"
                        />
                    </div>
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manuscript File * (PDF, DOC, DOCX)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-400 transition-colors">
                        <input
                            type="file"
                            name="manuscript"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="w-full"
                            required
                        />
                        {formData.manuscript && (
                            <p className="mt-2 text-sm text-green-600">
                            Selected: {formData.manuscript.name}
                            </p>
                        )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Letter (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-400 transition-colors">
                        <input
                            type="file"
                            name="coverLetter"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {formData.coverLetter && (
                            <p className="mt-2 text-sm text-green-600">
                            Selected: {formData.coverLetter.name}
                            </p>
                        )}
                        </div>
                    </div>
                    </div>

                    {/* Submit Button */}
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                    {isSubmitting ? (
                        <>
                        <div className="spinner mr-3"></div>
                        Submitting...
                        </>
                    ) : (
                        <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Manuscript
                        </>
                    )}
                    </button>
                </form>
                </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                {/* Submission Process */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
                >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Review Process</h3>
                <div className="space-y-4">
                    {submissionProcess.map((process, index) => (
                    <div key={process.step} className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        <process.icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                        <h4 className="font-semibold text-gray-900">{process.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{process.description}</p>
                        <p className="text-xs text-indigo-600 font-medium">{process.duration}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </motion.div>

                {/* Guidelines */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
                >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Submission Guidelines</h3>
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start">
                    <Info className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Manuscripts should be between 3,000-8,000 words</span>
                    </div>
                    <div className="flex items-start">
                    <Info className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use APA format for citations and references</span>
                    </div>
                    <div className="flex items-start">
                    <Info className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Include abstract (250-300 words)</span>
                    </div>
                    <div className="flex items-start">
                    <Info className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Provide 3-5 keywords</span>
                    </div>
                    <div className="flex items-start">
                    <Info className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ensure originality and ethical compliance</span>
                    </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Guidelines
                </button>
                </motion.div>

                {/* Contact */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white"
                >
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                    Our editorial team is here to assist you with your submission.
                </p>
                <div className="space-y-2 text-sm">
                    <p>📧 submissions@neap.com</p>
                    <p>📞 +1 (555) 123-4567</p>
                    <p>🕒 Mon-Fri, 9AM-5PM</p>
                </div>
                </motion.div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default SubmissionsPage;