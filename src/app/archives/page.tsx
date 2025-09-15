'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust path to your Firebase config
import JournalCard from '@/components/JournalCard';
import { Journal } from '@/types';

const ArchivesPage = () => {
    const [journals, setJournals] = useState<Journal[]>([]);
    const [filteredJournals, setFilteredJournals] = useState<Journal[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMoreJournals, setHasMoreJournals] = useState(true);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    
    const JOURNALS_PER_PAGE = 6;

    // Fetch journals from Firebase
    const fetchJournals = async (loadMore = false) => {
        try {
            if (loadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
                setError(null);
            }

        let journalsQuery = query(
            collection(db, 'journals'),
            orderBy('createdAt', 'desc'), // Change this from 'publishDate' to 'createdAt'
            limit(JOURNALS_PER_PAGE)
        );

            // If loading more, start after the last document
            if (loadMore && lastDoc) {
                journalsQuery = query(
                    collection(db, 'journals'),
                    orderBy('publishDate', 'desc'),
                    startAfter(lastDoc),
                    limit(JOURNALS_PER_PAGE)
                );
            }

            const querySnapshot = await getDocs(journalsQuery);
            
            if (querySnapshot.empty && !loadMore) {
                setJournals([]);
                setFilteredJournals([]);
                setHasMoreJournals(false);
                return;
            }

            const fetchedJournals: Journal[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const journal: Journal = {
                    id: doc.id,
                    title: data.title || '',
                    description: data.shortDescription || '', // Map shortDescription to description
                    coverImage: data.coverImage || '/api/placeholder/400/600', // Default placeholder
                    downloadLink: data.downloadLink || '',
                    publishDate: data.createdAt?.toDate() || new Date(), // Use createdAt as publishDate
                    volume: data.volume || '',
                    issue: data.issue || '',
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    // Handle optional fields that might not exist in your admin data
                    tags: data.tags || [],
                    authors: data.authors || [],
                    category: data.category || '',
                    isPublished: data.isPublished !== false, // Default to true if not specified
                };
                fetchedJournals.push(journal);
            });

            if (loadMore) {
                setJournals(prev => [...prev, ...fetchedJournals]);
            } else {
                setJournals(fetchedJournals);
            }

            // Set up pagination
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastDoc(lastVisible);
            
            // Check if there are more journals to load
            setHasMoreJournals(fetchedJournals.length === JOURNALS_PER_PAGE);

        } catch (err) {
            console.error('Error fetching journals:', err);
            setError('Failed to load journals. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchJournals();
    }, []);

    // Filter journals based on search and year
    useEffect(() => {
        let filtered = journals.filter(journal => journal.isPublished !== false);

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(journal =>
                journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                journal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (journal.tags && journal.tags.some(tag => 
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                )) ||
                (journal.authors && journal.authors.some(author => 
                    author.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            );
        }

        // Year filter
        if (selectedYear !== 'all') {
            filtered = filtered.filter(journal =>
                journal.publishDate.getFullYear().toString() === selectedYear
            );
        }

        setFilteredJournals(filtered);
    }, [searchTerm, selectedYear, journals]);

    const availableYears = Array.from(
        new Set(journals.map(journal => journal.publishDate.getFullYear()))
    ).sort((a, b) => b - a);

    const handleLoadMore = () => {
        if (!loadingMore && hasMoreJournals) {
            fetchJournals(true);
        }
    };

    const handleRetry = () => {
        setError(null);
        fetchJournals();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mb-4"></div>
                    <p className="text-gray-600">Loading journals...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Journals</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={handleRetry}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
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
                            Journal Archives
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                            Explore our comprehensive collection of peer-reviewed research publications spanning multiple disciplines and academic fields.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-2xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search journals by title, content, tags, or authors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filters and View Controls */}
                        <div className="flex items-center gap-4">
                            {/* Year Filter */}
                            <div className="relative">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="all">All Years</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year.toString()}>{year}</option>
                                    ))}
                                </select>
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-gray-600">
                            Showing {filteredJournals.length} of {journals.length} publications
                        </p>
                        {searchTerm && (
                            <p className="text-sm text-gray-500">
                                Results for "{searchTerm}"
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Journals Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredJournals.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No journals found</h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedYear !== 'all' 
                                    ? 'Try adjusting your search criteria or filters.' 
                                    : 'No journals are currently available.'}
                            </p>
                        </motion.div>
                    ) : (
                        <div className={`grid gap-8 ${
                            viewMode === 'grid' 
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                                : 'grid-cols-1 max-w-4xl mx-auto'
                        }`}>
                            {filteredJournals.map((journal, index) => (
                                <JournalCard 
                                    key={journal.id} 
                                    journal={journal} 
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Load More Button */}
            {filteredJournals.length > 0 && hasMoreJournals && !searchTerm && selectedYear === 'all' && (
                <section className="py-12 text-center">
                    <button 
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="inline-flex items-center px-8 py-3 text-lg font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loadingMore ? (
                            <>
                                <div className="spinner-small mr-2"></div>
                                Loading More...
                            </>
                        ) : (
                            'Load More Journals'
                        )}
                    </button>
                </section>
            )}

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-gray-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-indigo-600 mb-2">{journals.length}</div>
                            <div className="text-gray-600">Total Publications</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-purple-600 mb-2">{availableYears.length}</div>
                            <div className="text-gray-600">Years of Publishing</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                            <div className="text-gray-600">Total Downloads</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-3xl font-bold text-pink-600 mb-2">200+</div>
                            <div className="text-gray-600">Contributing Authors</div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArchivesPage;