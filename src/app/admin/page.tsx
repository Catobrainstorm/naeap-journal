"use client"

import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit3, Trash2, Eye, EyeOff, Calendar, Save, X, Check, AlertCircle, FileText, Megaphone } from 'lucide-react';
import { 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    doc, 
    serverTimestamp,
    orderBy,
    query
    } from 'firebase/firestore';
    import { db } from '../../lib/firebase'; // You'll need to create this file

    // Types
    interface Journal {
    id?: string;
    title: string;
    shortDescription: string;
    downloadLink: string;
    volume: string;
    content: string;
    createdAt?: any;
    updatedAt?: any;
    }

    interface Announcement {
    id?: string;
    title: string;
    content: string;
    isActive: boolean;
    createdAt?: any;
    updatedAt?: any;
    }

    interface FormData {
    title: string;
    shortDescription: string;
    downloadLink: string;
    volume: string;
    content: string;
    }

    // Firebase service implementation
    const firebaseService = {
    // Journals
    addJournal: async (data: FormData) => {
        try {
        const docRef = await addDoc(collection(db, 'journals'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { success: true, data: { ...data, id: docRef.id } };
        } catch (error) {
        console.error('Error adding journal:', error);
        return { success: false, error };
        }
    },

    getJournals: async () => {
        try {
        const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const journals: Journal[] = [];
        querySnapshot.forEach((doc) => {
            journals.push({ id: doc.id, ...doc.data() } as Journal);
        });
        return { success: true, data: journals };
        } catch (error) {
        console.error('Error fetching journals:', error);
        return { success: false, data: [] as Journal[], error };
        }
    },

    updateJournal: async (id: string, data: FormData) => {
        try {
        await updateDoc(doc(db, 'journals', id), {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
        } catch (error) {
        console.error('Error updating journal:', error);
        return { success: false, error };
        }
    },

    deleteJournal: async (id: string) => {
        try {
        await deleteDoc(doc(db, 'journals', id));
        return { success: true };
        } catch (error) {
        console.error('Error deleting journal:', error);
        return { success: false, error };
        }
    },

    // Announcements
    addAnnouncement: async (data: any) => {
        try {
        const docRef = await addDoc(collection(db, 'announcements'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { success: true, data: { ...data, id: docRef.id } };
        } catch (error) {
        console.error('Error adding announcement:', error);
        return { success: false, error };
        }
    },

    getAnnouncements: async () => {
        try {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const announcements: Announcement[] = [];
        querySnapshot.forEach((doc) => {
            announcements.push({ id: doc.id, ...doc.data() } as Announcement);
        });
        return { success: true, data: announcements };
        } catch (error) {
        console.error('Error fetching announcements:', error);
        return { success: false, data: [] as Announcement[], error };
        }
    },

    updateAnnouncement: async (id: string, data: any) => {
        try {
        await updateDoc(doc(db, 'announcements', id), {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
        } catch (error) {
        console.error('Error updating announcement:', error);
        return { success: false, error };
        }
    },

    deleteAnnouncement: async (id: string) => {
        try {
        await deleteDoc(doc(db, 'announcements', id));
        return { success: true };
        } catch (error) {
        console.error('Error deleting announcement:', error);
        return { success: false, error };
        }
    },
    };

    const AdminDashboard: React.FC = () => {
    // State management
    const [activeTab, setActiveTab] = useState<'journals' | 'announcements'>('journals');
    const [journals, setJournals] = useState<Journal[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    
    // Form states
    const [showJournalForm, setShowJournalForm] = useState(false);
    const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
    const [editingJournal, setEditingJournal] = useState<Journal | null>(null);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

    const [journalForm, setJournalForm] = useState<FormData>({
        title: '',
        shortDescription: '',
        downloadLink: '',
        volume: '',
        content: '',
    });

    const [announcementForm, setAnnouncementForm] = useState({
        title: '',
        content: '',
        isActive: true,
    });

    // Load data on mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await Promise.all([fetchJournals(), fetchAnnouncements()]);
    };

    const fetchJournals = async () => {
        setLoading(true);
        try {
        const result = await firebaseService.getJournals();
        if (result.success) {
            setJournals(result.data);
        } else {
            showMessage('error', 'Failed to fetch journals');
        }
        } catch (error) {
        showMessage('error', 'Error loading journals');
        }
        setLoading(false);
    };

    const fetchAnnouncements = async () => {
        try {
        const result = await firebaseService.getAnnouncements();
        if (result.success) {
            setAnnouncements(result.data);
        } else {
            showMessage('error', 'Failed to fetch announcements');
        }
        } catch (error) {
        showMessage('error', 'Error loading announcements');
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    // Journal handlers
    const handleJournalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        if (editingJournal) {
            const result = await firebaseService.updateJournal(editingJournal.id!, journalForm);
            if (result.success) {
            showMessage('success', 'Journal updated successfully');
            fetchJournals();
            resetJournalForm();
            } else {
            showMessage('error', 'Failed to update journal');
            }
        } else {
            const result = await firebaseService.addJournal(journalForm);
            if (result.success) {
            showMessage('success', 'Journal uploaded successfully');
            fetchJournals();
            resetJournalForm();
            } else {
            showMessage('error', 'Failed to upload journal');
            }
        }
        } catch (error) {
        showMessage('error', 'An error occurred');
        }
        setLoading(false);
    };

    const handleJournalEdit = (journal: Journal) => {
        setJournalForm({
        title: journal.title,
        shortDescription: journal.shortDescription,
        downloadLink: journal.downloadLink,
        volume: journal.volume,
        content: journal.content,
        });
        setEditingJournal(journal);
        setShowJournalForm(true);
    };

    const handleJournalDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this journal?')) {
        try {
            const result = await firebaseService.deleteJournal(id);
            if (result.success) {
            showMessage('success', 'Journal deleted successfully');
            fetchJournals();
            } else {
            showMessage('error', 'Failed to delete journal');
            }
        } catch (error) {
            showMessage('error', 'Error deleting journal');
        }
        }
    };

    const resetJournalForm = () => {
        setJournalForm({
        title: '',
        shortDescription: '',
        downloadLink: '',
        volume: '',
        content: '',
        });
        setEditingJournal(null);
        setShowJournalForm(false);
    };

    // Announcement handlers
    const handleAnnouncementSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        if (editingAnnouncement) {
            const result = await firebaseService.updateAnnouncement(editingAnnouncement.id!, announcementForm);
            if (result.success) {
            showMessage('success', 'Announcement updated successfully');
            fetchAnnouncements();
            resetAnnouncementForm();
            } else {
            showMessage('error', 'Failed to update announcement');
            }
        } else {
            const result = await firebaseService.addAnnouncement(announcementForm);
            if (result.success) {
            showMessage('success', 'Announcement created successfully');
            fetchAnnouncements();
            resetAnnouncementForm();
            } else {
            showMessage('error', 'Failed to create announcement');
            }
        }
        } catch (error) {
        showMessage('error', 'An error occurred');
        }
        setLoading(false);
    };

    const handleAnnouncementEdit = (announcement: Announcement) => {
        setAnnouncementForm({
        title: announcement.title,
        content: announcement.content,
        isActive: announcement.isActive,
        });
        setEditingAnnouncement(announcement);
        setShowAnnouncementForm(true);
    };

    const handleAnnouncementDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
        try {
            const result = await firebaseService.deleteAnnouncement(id);
            if (result.success) {
            showMessage('success', 'Announcement deleted successfully');
            fetchAnnouncements();
            } else {
            showMessage('error', 'Failed to delete announcement');
            }
        } catch (error) {
            showMessage('error', 'Error deleting announcement');
        }
        }
    };

    const resetAnnouncementForm = () => {
        setAnnouncementForm({
        title: '',
        content: '',
        isActive: true,
        });
        setEditingAnnouncement(null);
        setShowAnnouncementForm(false);
    };

    // Format date helper
    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
        }
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                </div>
                </div>
                <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                    {journals.length} Journals • {announcements.length} Announcements
                </div>
                </div>
            </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
            {/* Message */}
            {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
                {message.type === 'success' ? (
                <Check className="h-5 w-5 text-green-600" />
                ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">{message.text}</span>
            </div>
            )}

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
                <button
                onClick={() => setActiveTab('journals')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === 'journals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                >
                <FileText className="h-4 w-4" />
                <span>Journals ({journals.length})</span>
                </button>
                <button
                onClick={() => setActiveTab('announcements')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === 'announcements'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                >
                <Megaphone className="h-4 w-4" />
                <span>Announcements ({announcements.length})</span>
                </button>
            </nav>
            </div>

            {/* Content */}
            <div className="space-y-6">
            {/* Journals Tab */}
            {activeTab === 'journals' && (
                <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Journal Management</h2>
                    <button
                    onClick={() => setShowJournalForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Journal
                    </button>
                </div>

                {/* Journal List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {journals.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No journals</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by uploading a new journal.</p>
                        <div className="mt-6">
                        <button
                            onClick={() => setShowJournalForm(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Upload Journal
                        </button>
                        </div>
                    </div>
                    ) : (
                    <ul className="divide-y divide-gray-200">
                        {journals.map((journal) => (
                        <li key={journal.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-medium text-gray-900 truncate">
                                    {journal.title}
                                </h3>
                                {journal.volume && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {journal.volume}
                                    </span>
                                )}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{journal.shortDescription}</p>
                                <div className="mt-2 flex items-center text-xs text-gray-400 space-x-4">
                                <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Created: {formatDate(journal.createdAt)}
                                </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                onClick={() => handleJournalEdit(journal)}
                                className="text-gray-400 hover:text-gray-600"
                                >
                                <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                onClick={() => handleJournalDelete(journal.id!)}
                                className="text-gray-400 hover:text-red-600"
                                >
                                <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
                <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
                    <button
                    onClick={() => setShowAnnouncementForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Announcement
                    </button>
                </div>

                {/* Announcements List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {announcements.length === 0 ? (
                    <div className="text-center py-12">
                        <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No announcements</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new announcement.</p>
                        <div className="mt-6">
                        <button
                            onClick={() => setShowAnnouncementForm(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Announcement
                        </button>
                        </div>
                    </div>
                    ) : (
                    <ul className="divide-y divide-gray-200">
                        {announcements.map((announcement) => (
                        <li key={announcement.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-medium text-gray-900 truncate">
                                    {announcement.title}
                                </h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    announcement.isActive 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {announcement.isActive ? (
                                    <>
                                        <Eye className="h-3 w-3 mr-1" />
                                        Active
                                    </>
                                    ) : (
                                    <>
                                        <EyeOff className="h-3 w-3 mr-1" />
                                        Inactive
                                    </>
                                    )}
                                </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{announcement.content}</p>
                                <div className="mt-2 flex items-center text-xs text-gray-400 space-x-4">
                                <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Created: {formatDate(announcement.createdAt)}
                                </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                onClick={() => handleAnnouncementEdit(announcement)}
                                className="text-gray-400 hover:text-gray-600"
                                >
                                <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                onClick={() => handleAnnouncementDelete(announcement.id!)}
                                className="text-gray-400 hover:text-red-600"
                                >
                                <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                </div>
            )}
            </div>
        </div>

        {/* Journal Form Modal */}
        {showJournalForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                    {editingJournal ? 'Edit Journal' : 'Upload New Journal'}
                </h3>
                <button
                    onClick={resetJournalForm}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="h-5 w-5" />
                </button>
                </div>

                <form onSubmit={handleJournalSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Title *</label>
                    <input
                        type="text"
                        required
                        value={journalForm.title}
                        onChange={(e) => setJournalForm({...journalForm, title: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter journal title"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Volume</label>
                    <input
                        type="text"
                        value={journalForm.volume}
                        onChange={(e) => setJournalForm({...journalForm, volume: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., Vol. 1 Issue 2"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                    value={journalForm.shortDescription}
                    onChange={(e) => setJournalForm({...journalForm, shortDescription: e.target.value})}
                    rows={2}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Brief description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Download Link</label>
                    <input
                    type="url"
                    value={journalForm.downloadLink}
                    onChange={(e) => setJournalForm({...journalForm, downloadLink: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content *</label>
                    <textarea
                    required
                    value={journalForm.content}
                    onChange={(e) => setJournalForm({...journalForm, content: e.target.value})}
                    rows={6}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter journal content"
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                    type="button"
                    onClick={resetJournalForm}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                    {loading ? (
                        'Processing...'
                    ) : (
                        <>
                        <Save className="h-4 w-4 mr-2" />
                        {editingJournal ? 'Update Journal' : 'Upload Journal'}
                        </>
                    )}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* Announcement Form Modal */}
        {showAnnouncementForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                    {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                </h3>
                <button
                    onClick={resetAnnouncementForm}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X className="h-5 w-5" />
                </button>
                </div>

                <form onSubmit={handleAnnouncementSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title *</label>
                    <input
                    type="text"
                    required
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter announcement title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content *</label>
                    <textarea
                    required
                    value={announcementForm.content}
                    onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                    rows={6}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter announcement content"
                    />
                </div>

                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="isActive"
                    checked={announcementForm.isActive}
                    onChange={(e) => setAnnouncementForm({...announcementForm, isActive: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Make this announcement active and visible
                    </label>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                    type="button"
                    onClick={resetAnnouncementForm}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                    {loading ? (
                        'Processing...'
                    ) : (
                        <>
                        <Save className="h-4 w-4 mr-2" />
                        {editingAnnouncement ? 'Update Announcement' : 'Create Announcement'}
                        </>
                    )}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
};

export default AdminDashboard;