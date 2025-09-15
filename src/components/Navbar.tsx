'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', href: '/' },
        {
        label: 'About',
        href: '/about',
        isDropdown: true,
        dropdownItems: [
            { label: 'About Us', href: '/about#about-us' },
            { label: 'Announcements', href: '/about#announcements' },
            { label: 'Editorial Board', href: '/about#editorial-board' },
            { label: 'Current', href: '/about#current' },
            { label: 'Ethical Guidelines', href: '/about#ethical-guidelines' },
        ]
        },
        { label: 'Archives/Indexing', href: '/archives' },
        { label: 'Submissions', href: '/submissions' },
        { label: 'Complaints', href: '/complaints' },
    ];

    const handleDropdownToggle = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    return (
        <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                NAEAP
                </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                    <div key={item.label} className="relative group">
                    {item.isDropdown ? (
                        <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                        >
                        {item.label}
                        <ChevronDown 
                            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                        />
                        </button>
                    ) : (
                        <Link
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                        >
                        {item.label}
                        </Link>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {item.isDropdown && activeDropdown === item.label && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                        >
                            {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                onClick={() => setActiveDropdown(null)}
                            >
                                {dropdownItem.label}
                            </Link>
                            ))}
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                ))}
                </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" />
                ) : (
                    <Menu className="block h-6 w-6" />
                )}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
            {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white border-t border-gray-200"
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                    <div key={item.label}>
                    {item.isDropdown ? (
                        <>
                        <button
                            onClick={() => handleDropdownToggle(item.label)}
                            className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        >
                            {item.label}
                            <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                            />
                        </button>
                        <AnimatePresence>
                            {activeDropdown === item.label && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-1"
                            >
                                {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                    key={dropdownItem.label}
                                    href={dropdownItem.href}
                                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                                    onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setActiveDropdown(null);
                                    }}
                                >
                                    {dropdownItem.label}
                                </Link>
                                ))}
                            </motion.div>
                            )}
                        </AnimatePresence>
                        </>
                    ) : (
                        <Link
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {item.label}
                        </Link>
                    )}
                    </div>
                ))}
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;