import { Flashlight, FlashlightOff, Volume2, VolumeOff } from "lucide-react";
import { motion } from "motion/react";

export default function SoundControl({
  toogleMute,
  toggleLight,
  isLight,
  isMuted,
}: {
  toogleMute: () => void;
  toggleLight: () => void;
  isLight: boolean;
  isMuted: boolean;
}) {
  return (
    <>
      <motion.div className="absolute bottom-8 left-0 z-10 w-full px-8 flex place-content-between">
        {isMuted ? (
          <motion.div
            whileTap={{ scale: 0.95, filter: "blur(5px)" }}
            onClick={toogleMute}
            className="size-8 flex items-center justify-center backdrop-blur-lg rounded-full bg-[#afb5b677] border border-white/50 "
          >
            <VolumeOff size={20} />
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.95, filter: "blur(5px)" }}
            onClick={toogleMute}
            className="size-8 flex items-center justify-center backdrop-blur-lg rounded-full bg-[#afb5b677] border border-white/50 "
          >
            <Volume2 size={20} />
          </motion.div>
        )}
        {isLight ? (
          <motion.div
            whileTap={{ scale: 0.95, filter: "blur(5px)" }}
            onClick={toggleLight}
            className="size-8 flex items-center justify-center backdrop-blur-lg rounded-full bg-[#afb5b677] border border-white/50 "
          >
            <Flashlight size={20} />
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.95, filter: "blur(5px)" }}
            onClick={toggleLight}
            className="size-8 flex items-center justify-center backdrop-blur-lg rounded-full bg-[#afb5b677] border border-white/50 "
          >
            <FlashlightOff size={20} />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
