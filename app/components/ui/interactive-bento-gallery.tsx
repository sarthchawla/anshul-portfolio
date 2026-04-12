"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Image from "next/image";
import VideoPlayer from './video-player';
import { Z } from '@/lib/z-index';
import { downloadMedia } from '@/lib/download';
import { gdriveLoader } from "@/lib/google-drive";
import { BLUR_DATA_URL } from "@/lib/blur-placeholder";


// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    /** For images: direct URL. For videos: embed URL (iframe src) or direct mp4 URL. */
    url: string;
    /** Thumbnail image for video items in the grid. If set, grid shows image+play icon instead of <video>. */
    thumbnailUrl?: string;
    /** Aspect ratio for videos, e.g. "16/9" or "9/16". Defaults to 16/9. */
    aspectRatio?: string;
    span: string;
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick, sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" }: { item: MediaItemType, className?: string, onClick?: () => void, sizes?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        // If thumbnailUrl is set (e.g. Google Drive videos), show thumbnail + play icon
        if (item.thumbnailUrl) {
            return (
                <div className={`${className} relative overflow-hidden`} onClick={onClick}>
                    <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes={sizes}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        {...(item.thumbnailUrl.includes("lh3.googleusercontent.com") ? { loader: gdriveLoader } : {})}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            );
        }

        // Direct mp4 URLs: autoplay inline with <video> tag
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`${className} relative overflow-hidden`} onClick={onClick}>
            <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover cursor-pointer"
                loading="lazy"
                sizes={sizes}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                {...(item.url.includes("lh3.googleusercontent.com") ? { loader: gdriveLoader } : {})}
            />
        </div>
    );
};



// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
    const goToPrev = () => {
        const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        setSelectedItem(mediaItems[prevIndex]);
    };
    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % mediaItems.length;
        setSelectedItem(mediaItems[nextIndex]);
    };

    // Close on Escape key + lock body scroll
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-0 w-full h-full backdrop-blur-lg
                          overflow-hidden"
                style={{ zIndex: Z.MODAL_BACKDROP }}
                onClick={onClose}
            >
                {/* Main Content */}
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-surface-base/80">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className="relative flex flex-col items-center"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.3}
                                onDragEnd={(_e, info) => {
                                    if (info.offset.x < -50) goToNext();
                                    else if (info.offset.x > 50) goToPrev();
                                }}
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    transition: { duration: 0.15 }
                                }}
                            >
                                {selectedItem.type === 'video' && selectedItem.thumbnailUrl ? (
                                    // Google Drive videos: use iframe embed with aspect ratio
                                    <div
                                        className={`rounded-lg overflow-hidden ${
                                            selectedItem.aspectRatio === '9/16'
                                                ? 'w-[320px] sm:w-[380px] md:w-[420px]'
                                                : 'w-[90vw] max-w-5xl'
                                        }`}
                                        style={{ aspectRatio: selectedItem.aspectRatio || '16/9' }}
                                    >
                                        <iframe
                                            src={selectedItem.url}
                                            className="w-full h-full"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            frameBorder="0"
                                            title={selectedItem.title}
                                        />
                                    </div>
                                ) : selectedItem.type === 'video' ? (
                                    // Direct mp4 videos: use VideoPlayer
                                    <div className="w-[90vw] max-w-5xl rounded-lg overflow-hidden">
                                        <VideoPlayer src={selectedItem.url} className="w-full h-full" />
                                    </div>
                                ) : (
                                    <div
                                        className="rounded-lg overflow-hidden"
                                        style={{
                                            aspectRatio: selectedItem.aspectRatio || undefined,
                                            maxHeight: '75vh',
                                            maxWidth: '90vw',
                                            width: selectedItem.aspectRatio
                                                ? `calc(75vh * ${(() => {
                                                    const parts = (selectedItem.aspectRatio || '1/1').split('/');
                                                    return Number(parts[0]) / Number(parts[1]);
                                                })()})`
                                                : undefined,
                                        }}
                                    >
                                        <img
                                            src={selectedItem.url}
                                            alt={selectedItem.title}
                                            className="w-full h-full object-contain cursor-pointer"
                                            onClick={onClose}
                                        />
                                    </div>
                                )}
                                <div className="mt-3 text-center pointer-events-none">
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                                        {selectedItem.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4
                              p-2.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/70
                              backdrop-blur-sm"
                    style={{ zIndex: Z.MODAL_CONTROLS + 5 }}
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClose(); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-5 h-5 sm:w-4 sm:h-4' />
                </motion.button>

                {/* Download Button */}
                <motion.button
                    className="absolute top-3 left-3 sm:top-4 sm:left-4
                              p-2.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-accent-400/80
                              backdrop-blur-sm border border-white/10 hover:border-accent-400/40"
                    style={{ zIndex: Z.MODAL_CONTROLS + 5 }}
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); downloadMedia(selectedItem.url, selectedItem.title); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Download ${selectedItem.title}`}
                >
                    <Download className='w-5 h-5 sm:w-4 sm:h-4' />
                </motion.button>

                {/* Navigation Arrow Zones — strips that block touch from reaching the iframe, offset below top buttons */}
                <div
                    className="absolute left-0 top-16 bottom-20 w-14 sm:w-20 flex items-center justify-center"
                    style={{ zIndex: Z.MODAL_CONTROLS }}
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); goToPrev(); }}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <div className="p-3 rounded-full bg-white/10 text-white backdrop-blur-sm">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                </div>
                <div
                    className="absolute right-0 top-16 bottom-20 w-14 sm:w-20 flex items-center justify-center"
                    style={{ zIndex: Z.MODAL_CONTROLS }}
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); goToNext(); }}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <div className="p-3 rounded-full bg-white/10 text-white backdrop-blur-sm">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>

            </motion.div>

            {/* Thumbnail Dock */}
            <motion.div
                initial={false}
                className="fixed left-4 right-4 bottom-4"
                style={{ zIndex: Z.MODAL_DOCK }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <div
                    className="relative rounded-xl bg-sky-400/20 backdrop-blur-xl
                             border border-blue-400/30 shadow-lg"
                >
                    <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto scrollbar-none">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0
                                    rounded-lg overflow-hidden
                                    cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id
                                        ? 'ring-2 ring-white/70 shadow-lg'
                                        : 'hover:ring-2 hover:ring-white/30'}
                                `}
                                initial={{ rotate: 0 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.15 : 1,
                                    y: selectedItem.id === item.id ? -6 : 0,
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    y: -6,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} sizes="40px" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-white/20 blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};



interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center">
                {title && (
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent
                                 bg-gradient-to-r from-white via-gray-200 to-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                )}
                <motion.p
                    className="mt-2 text-sm sm:text-base text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                                onClick={() => setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full"
                                    onClick={() => setSelectedItem(item)}
                                />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                    {/* Download button — top-left */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            downloadMedia(item.url, item.title);
                                        }}
                                        aria-label={`Download ${item.title}`}
                                        className="absolute top-2 left-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 cursor-pointer hover:bg-accent-400/80 hover:text-white hover:border-accent-400/40 transition-all duration-200"
                                    >
                                        <Download size={16} strokeWidth={2} />
                                    </button>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default InteractiveBentoGallery
