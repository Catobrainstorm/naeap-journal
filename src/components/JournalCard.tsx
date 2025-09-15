'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Eye, Calendar, Users } from 'lucide-react';
import { Journal } from '@/types';

interface JournalCardProps {
  journal: Journal;
  index?: number;
}

const JournalCard: React.FC<JournalCardProps> = ({ journal, index = 0 }) => {
    const handleDownload = () => {
        window.open(journal.downloadLink, '_blank');
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
        {/* Journal Cover */}
        <div className="relative h-64 bg-gradient-to-br from-indigo-600 to-purple-600 overflow-hidden">
            {journal.coverImage ? (
            <img
                src={journal.coverImage}
                alt={journal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            ) : (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                <div className="w-20 h-24 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <BookOpen className="w-10 h-10" />
                </div>
                <p className="text-sm font-medium">NEAP Journal</p>
                {journal.volume && (
                    <p className="text-xs opacity-80">Vol. {journal.volume}</p>
                )}
                </div>
            </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
                onClick={handleDownload}
                className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
                <Download className="w-4 h-4" />
                <span>Download</span>
            </button>
            </div>
        </div>

        {/* Journal Details */}
        <div className="p-6">
            <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                {journal.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {journal.description}
            </p>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center space-x-3">
                <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {journal.publishDate.toLocaleDateString()}
                </div>
                {journal.volume && (
                <div className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Vol. {journal.volume}
                </div>
                )}
            </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {Math.floor(Math.random() * 5000) + 500} views
                </div>
                <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {Math.floor(Math.random() * 2000) + 200} downloads
                </div>
            </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
            <button
                onClick={handleDownload}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
            </button>
            <button className="px-4 py-2 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 text-sm font-medium rounded-lg transition-colors duration-200">
                Preview
            </button>
            </div>
        </div>
        </motion.div>
    );
};

export default JournalCard;