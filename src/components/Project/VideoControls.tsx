"use client";

import { motion } from "motion/react";
import MediaIcon from "../MediaIcon";
import Image from "next/image";
import AnimatedAudioLines from "../AnimatedAudioLines";

const videoVariants = {
  open: {
    width: "90%",
    height: "125px",
    borderRadius: "14px",
    padding: "16px",
  },
  closed: {
    width: "25%",
    height: "20px",
    borderRadius: "16px",
    padding: "0px",
  },
};

const itemscommandsVariants = {
  open: {
    scale: 1,
    opacity: 1,
  },
  closed: {
    scale: 0.5,
    opacity: 0,
  },
};

interface VideoControlsProps {
  image: string;
  title: string;
  director: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
  onTogglePlayPause: () => void;
}

export default function VideoControls({
  image,
  title,
  director,
  currentTime,
  duration,
  isPlaying,
  isOpen,
  onToggleOpen,
  onTogglePlayPause,
}: VideoControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={videoVariants}
      whileTap={{ scale: isOpen ? 1 : 0.9 }}
      className="absolute top-3 bg-black rounded-full  z-10 flex flex-col place-content-between gap-1 overflow-hidden"
      onClick={onToggleOpen}
      data-video-controls
    >
      <motion.div
        variants={itemscommandsVariants}
        className="flex items-center gap-2"
      >
        <div className="size-9 rounded-lg overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">{title}</p>
          <p className="text-[8px] text-gray-400">{director}</p>
        </div>
        <div className="flex-1 flex justify-end">
          <AnimatedAudioLines />
        </div>
      </motion.div>
      <motion.div
        variants={itemscommandsVariants}
        className="flex w-full items-center justify-center gap-2"
      >
        <p className="text-[8px] flex-1 text-gray-400">
          {formatTime(currentTime)}
        </p>
        <div className="w-[90%] relative flex items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentTime / duration) * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              mass: 0.4,
            }}
            className="h-1 bg-white rounded-full absolute z-10"
          />
          <motion.div className="w-full h-1 bg-gray-400 rounded-full absolute" />
        </div>
        <p className="text-[8px] flex-1 text-gray-400">
          {formatTime(duration)}
        </p>
      </motion.div>

      <motion.div
        variants={itemscommandsVariants}
        className="w-full flex items-center justify-center"
      >
        <div className="flex items-center justify-center gap-4">
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MediaIcon name="previous" size={34} />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9, opacity: 0.5, filter: "blur(2px)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MediaIcon
              name={isPlaying ? "play" : "stop"}
              size={34}
              className=""
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onTogglePlayPause();
              }}
            />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MediaIcon name="next" size={34} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
