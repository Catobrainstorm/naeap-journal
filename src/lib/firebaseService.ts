// lib/firebaseService.ts
import { 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    doc,
    orderBy,
    query,
    Timestamp 
    } from 'firebase/firestore';
    import { db } from './firebase';
    import { Journal, Announcement } from '../types';

    // Journal Functions
    export const addJournal = async (journalData: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
        const docRef = await addDoc(collection(db, 'journals'), {
        ...journalData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding journal:', error);
        return { success: false, error: error.message };
    }
    };

    export const getJournals = async () => {
    try {
        const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const journals: Journal[] = [];
        
        querySnapshot.forEach((doc) => {
        const data = doc.data();
        journals.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Journal);
        });
        
        return { success: true, data: journals };
    } catch (error) {
        console.error('Error getting journals:', error);
        return { success: false, error: error.message };
    }
    };

    export const updateJournal = async (id: string, journalData: Partial<Journal>) => {
    try {
        const journalRef = doc(db, 'journals', id);
        await updateDoc(journalRef, {
        ...journalData,
        updatedAt: Timestamp.now(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating journal:', error);
        return { success: false, error: error.message };
    }
    };

    export const deleteJournal = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'journals', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting journal:', error);
        return { success: false, error: error.message };
    }
    };

    // Announcement Functions
    export const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
        const docRef = await addDoc(collection(db, 'announcements'), {
        ...announcementData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding announcement:', error);
        return { success: false, error: error.message };
    }
    };

    export const getAnnouncements = async () => {
    try {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const announcements: Announcement[] = [];
        
        querySnapshot.forEach((doc) => {
        const data = doc.data();
        announcements.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Announcement);
        });
        
        return { success: true, data: announcements };
    } catch (error) {
        console.error('Error getting announcements:', error);
        return { success: false, error: error.message };
    }
    };

    export const updateAnnouncement = async (id: string, announcementData: Partial<Announcement>) => {
    try {
        const announcementRef = doc(db, 'announcements', id);
        await updateDoc(announcementRef, {
        ...announcementData,
        updatedAt: Timestamp.now(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating announcement:', error);
        return { success: false, error: error.message };
    }
    };

    export const deleteAnnouncement = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'announcements', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting announcement:', error);
        return { success: false, error: error.message };
    }
};