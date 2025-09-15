'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Adjust path as needed



const AboutPage = () => {

  
const [announcements, setAnnouncements] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
      const q = query(
        collection(db, 'announcements'), 
        orderBy('createdAt', 'desc') // Changed from 'date' to 'createdAt'
      );
      const querySnapshot = await getDocs(q);
      const announcementsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filter only active announcements
      const activeAnnouncements = announcementsData.filter(announcement => announcement.isActive === true);
      setAnnouncements(activeAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchAnnouncements();
}, []);


  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About NAEAP
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Nigerian Association for Educational Administration and Planning 
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The NAEAP Journal of in Educational Administration and Planning (NJEAP) is a journal of the Nigerian Association for Educational Administration and Planning. It is a high-quality, peer-reviewed journal that focuses on original research, advancements, and practical applications across various disciplines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To advance knowledge through rigorous peer-reviewed research and promote 
                academic excellence in educational assessment and publishing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading academic journal in Nigeria and Africa, recognized 
                globally for publishing high-quality research and scholarly work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <p className="text-gray-600">
                Integrity, excellence, innovation, and inclusivity guide our 
                commitment to advancing academic knowledge and research.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


<section id="announcements" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12 lg:mb-16"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mx-4">
          Announcements
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"></div>
      </div>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
        Stay updated with our latest news, updates, and important information
      </p>
    </motion.div>

    {/* Loading State */}
    {loading ? (
      <div className="flex flex-col items-center justify-center py-16 lg:py-24">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">Loading announcements...</p>
      </div>
    ) : announcements.length === 0 ? (
      /* Empty State */
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 lg:py-24"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5-5-5h5v-5a7 7 0 10-14 0v5h5l-5 5-5-5h5V7a9 9 0 1118 0v10z" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No Announcements Yet</h3>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Check back soon for the latest updates and announcements from NAEAP.
        </p>
      </motion.div>
    ) : (
      /* Announcements Grid */
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Latest
                </span>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs sm:text-sm font-medium">
                  {announcement.createdAt ? new Date(announcement.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : 'No date'}
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  {announcement.createdAt ? new Date(announcement.createdAt.seconds * 1000).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : ''}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-200 leading-tight">
                {announcement.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-4">
                {announcement.content}
              </p>
            </div>

            {/* Footer */}
            {announcement.updatedAt && announcement.updatedAt.seconds !== announcement.createdAt.seconds && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-medium">
                    Updated: {new Date(announcement.updatedAt.seconds * 1000).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            )}

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    )}

    {/* Call to Action */}
    {announcements.length > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12 lg:mt-16"
      >
      </motion.div>
    )}
  </div>
</section>

      {/* Editorial Board Section */}
      <section id="editorial-board" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Editorial Board</h2>
            <p className="text-xl text-gray-600">
              Our distinguished editorial board comprises leading academics and researchers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Professor Gospel G. Kpee",
                title: "Editor-in-Chief",
                affiliation: "University of Port Harcourt, Rivers State Nigeria",
                expertise: "Faculty of Education"
              },
              {
                name: "Prof Ugochukwu Kysburn Agi",
                title: "Members",
                affiliation: "Ignatius Ajuru University of Education, Port Harcourt",
                expertise: ""
              },
              {
                name: "Dr. Ezugoh, Theodora Chinelo",
                title: "Members",
                affiliation: "Federal College of Education (Technical), Asaba",
                expertise: ""
              },
              {
                name: "Dr. Amaonye, Chinenye Blessing",
                title: "Members",
                affiliation: "Nnamdi Azikiwe University",
                expertise: ""
              },
              {
                name: "Dr. Adeyemo, Deborah Adejumoke",
                title: "Members",
                affiliation: "Federal University, Oye-Ekiti, Ekiti State",
                expertise: ""
              },
              {
                name: "Dr Emmanuel Isah",
                title: "Members",
                affiliation: "National Editor NAEAP Journal and Ex-Officio",
                expertise: ""
              },  
              {
                name: "Rev. Sr. Chidumebi Ngozi Oguejofor, Ph.D.",
                title: "Members",
                affiliation: "Nnamdi Azikwe University",
                expertise: ""
              }, 
              {
                name: "Dr. Ovat Okpa",
                title: "Members",
                affiliation: "University of Calabar",
                expertise: ""
              },  
              {
                name: "Mr. Akpeghughu Mevrabor Kingsley",
                title: "Secretary",
                affiliation: "University of Port Harcourt",
                expertise: ""
              },    
              {
                name: "Mr. Akpeghughu Mevrabor Kingsley",
                title: "Consulting Editors",
                affiliation: "Faculty of Education University of Benin, Benin-City,Edo State Nigeria",
                expertise: ""
              },  
              {
                name: "Professor G. O. Akpa",
                title: "Consulting Editors",
                affiliation: "University of Jos, Plateau State",
                expertise: ""
              },
              {
                name: "Professor D. O. Durosaro",
                title: "Consulting Editors",
                affiliation: "University of Ilorin",
                expertise: "Department of Educational Management"
              }, 
              {
                name: "Professor Hauwa Imam",
                title: "Consulting Editors",
                affiliation: "University of Abuja",
                expertise: "Department of Educational Management"
              },  
              {
                name: "Professor J. B. Babalola",
                title: "Consulting Editors",
                affiliation: "University of Ibadan",
                expertise: "Department of Educational Management"
              },  
              {
                name: "Professor U. U. Bassey",
                title: "Consulting Editors",
                affiliation: "University of Calabar",
                expertise: "Department of Educational Administration & Planning"
              },  
              {
                name: "Professor Gospel G. Kpee",
                title: "National President",
                affiliation: "Faculty of Education, University of Port Harcourt, Rivers State,Nigeria",
                expertise: "FNAEAP, aHi"
              },   
              {
                name: "Dr. Sunday Dada",
                title: "National Vice President",
                affiliation: "Department of Educational ManagementUniversity of Abuja",
                expertise: ""
              } ,  
              {
                name: "Dr. Idowu Banjoko – FNAEAP",
                title: "National Secretary",
                affiliation: "Director, NLGE, Lagos State Nigeria",
                expertise: ""
              },    
              {
                name: "Dr. Felix Bua",
                title: "National Assistant Secretary",
                affiliation: "Department of Educational Foundations, Benue State University Makurdi",
                expertise: ""
              },  
              {
                name: "Dr. Clement Igbaji",
                title: "National PRO",
                affiliation: "Department of Educational foundations Federal University, Kashere, Gombe State Nigeria",
                expertise: ""
              }, 
              {
                name: "Professor Lucy Udida",
                title: "National Treasurer",
                affiliation: "University of Calabar Cross River State Nigeria",
                expertise: "Department of Educational Management"
              },   
              {
                name: "Dr. Nakazalle Nura Usman",
                title: "National Financial Secretary",
                affiliation: "Usman Dan Fodio University, Sokoto Sokoto State Nigeria",
                expertise: "Department of Educational Foundations"
              }, 
              {
                name: "Dr. Chika Ahamefula",
                title: "National Auditor",
                affiliation: "Alvan Ikoku Federal College of Education Owerri Imo State Nigeria",
                expertise: ""
              },    
              {
                name: "Professor Chinedu Aguba",
                title: "Ex-Officio I",
                affiliation: "Enugu State University of Science and Technology (ESUT) Enugu",
                expertise: ""
              },    
              {
                name: "Dr. Saheed Oyeniran",
                title: "Ex-Officio II",
                affiliation: "University of Illorin Kwara State Nigeria",
                expertise: "Department of Educational Management"
              },    
              {
                name: "Professor Hauwa Imam",
                title: "Immediate Past President (IPP)",
                affiliation: "University of Abuja",
                expertise: "Department of Educational Management"
              }    
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.title}</p>
                <p className="text-gray-600 text-sm">{member.affiliation}</p>
                <p className="text-gray-500 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Section */}
      <section id="current" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Current Issue</h2>
            <p className="text-xl text-gray-600">Volume 12, Issue 3 - December 2024</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Advanced Research in Educational Psychology and Assessment
            </h3>
            <p className="text-gray-600 mb-6">
              This issue features groundbreaking research on contemporary challenges in educational 
              assessment, innovative pedagogical approaches, and the intersection of technology 
              and learning outcomes.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Published: December 1, 2024
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                View Issue
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ethical Guidelines Section */}
      <section id="ethical-guidelines" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ethical Guidelines</h2>
            <p className="text-xl text-gray-600">
              Our commitment to academic integrity and ethical publishing practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Research Ethics</h3>
                <p className="text-gray-600">
                  All research must comply with institutional ethical standards and obtain 
                  appropriate approvals for studies involving human subjects.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Plagiarism Policy</h3>
                <p className="text-gray-600">
                  We maintain a zero-tolerance policy for plagiarism. All submissions are 
                  screened using advanced plagiarism detection software.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Peer Review</h3>
                <p className="text-gray-600">
                  Our double-blind peer review process ensures impartial evaluation of all 
                  manuscripts by qualified experts in the field.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authorship</h3>
                <p className="text-gray-600">
                  Authorship must be based on substantial contribution to conception, design, 
                  execution, or interpretation of the research.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Conflicts of Interest</h3>
                <p className="text-gray-600">
                  All authors must disclose potential conflicts of interest that could 
                  influence the research or its interpretation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Integrity</h3>
                <p className="text-gray-600">
                  Authors are expected to maintain accurate records and make data available 
                  for verification when requested.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;