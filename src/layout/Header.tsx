"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import TextEffect from "@/components/TextEffect";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const hasScroll = pathname === "/";

  useEffect(() => {
    function handleScroll() {
      const value =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      setIsScrolling(value > 500);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-between items-center h-16">
        <motion.nav
          className="hidden md:flex w-full justify-between uppercase"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex space-x-4 font-fjalla-one-placeholder ">
            <TextEffect text="WORKS" url="/works" className="text-header" />
            <TextEffect text="ABOUT" url="/about" className="text-header" />
          </div>
          <motion.a
            href="/"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isScrolling || !hasScroll ? 1 : 0,
              y: isScrolling || !hasScroll ? 0 : -20,
            }}
            transition={{ duration: 0.8 }}
            className="uppercase font-fjalla-one-placeholder text-2xl"
          >
            sacha FILMS
          </motion.a>
          <TextEffect
            text="LET'S TALK"
            url="/contact"
            className="text-header"
          />
        </motion.nav>

        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black hover:text-gray-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <a
              href="#works"
              className="block px-3 py-2 text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Works
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-black hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
