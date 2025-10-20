"use client";

import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import VideoControls from "./VideoControls";

export default function ProjectVideo({
  video,
  image,
  title,
  director,
}: {
  video: string;
  image: string;
  title: string;
  director: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setDuration(video.duration);

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as Element;
        if (!target.closest("[data-video-controls]")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="w-full flex justify-center items-center">
      <motion.div className="w-[min(30vw,300px)] aspect-[9/17] rounded-2xl overflow-hidden relative flex justify-center">
        <VideoControls
          image={image}
          title={title}
          director={director}
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          isOpen={isOpen}
          onToggleOpen={() => setIsOpen(!isOpen)}
          onTogglePlayPause={togglePlayPause}
        />

        <video
          ref={videoRef}
          src={video}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute bottom-2 h-0.75 w-1/3 bg-white rounded-full" />
      </motion.div>
    </div>
  );
}
