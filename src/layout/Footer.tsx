"use client";

import Accroche from "./Accroche";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";

const footerSections = [
  {
    title: "SOCIALS",
    links: [
      { text: "Instagram", href: "https://www.instagram.com/sachafilms_/" },
      { text: "Facebook", href: "" },
      { text: "Linkedin", href: "" },
    ],
  },
  {
    title: "WORK",
    links: [{ text: "All Projects", href: "/works" }],
  },
  {
    title: "let's talk",
    links: [
      { text: "email", href: "sachafilms1@gmail.com", copyable: true },
      {
        text: "phone",
        href: "https://wa.me/+34640322557?text=Buenas%20me%20gustaria%20un%20video%20gracias",
      },
    ],
  },
  {
    title: "About",
    links: [{ text: "About me", href: "/about" }],
  },
  {
    title: "Made by",
    links: [
      { text: "Albo", href: "https://allan-boussemart-coquelet.vercel.app/" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/contact" && <Accroche />}

      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="flex flex-col gap-8 sm:items-center justify-center text-secondary font-fjalla-one-placeholder m-8 uppercase"
      >
        <motion.div
          className="flex flex-col sm:flex-row gap-10"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {footerSections.slice(0, 2).map((section, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <p className="text-5xl">{section.title}</p>
              <div
                className={`flex items-end ${
                  section.links.length > 1 ? "gap-2" : ""
                } text-2xl`}
              >
                {section.links.map((link, linkIndex) => (
                  <FlipLink
                    key={linkIndex}
                    href={link.href}
                    copyable={link.copyable}
                  >
                    {link.text}
                  </FlipLink>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-10"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {footerSections.slice(2).map((section, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <p className="text-5xl">{section.title}</p>
              <div
                className={`flex items-end ${
                  section.links.length > 1 ? "gap-2" : ""
                } text-2xl`}
              >
                {section.links.map((link, linkIndex) => (
                  <FlipLink
                    key={linkIndex}
                    href={link.href}
                    copyable={link.copyable}
                  >
                    {link.text}
                  </FlipLink>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.footer>
    </>
  );
}

const DURATION = 0.35;
const STAGGER = 0.025;

const FlipLink = ({
  children,
  href,
  copyable,
}: {
  children: string;
  href: string;
  copyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    if (copyable) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      whileTap={{ scale: 0.95 }}
      href={copyable ? undefined : href}
      onClick={handleClick}
      className={`relative block overflow-hidden whitespace-nowrap font-black uppercase ${
        copyable ? "cursor-pointer" : ""
      }`}
      style={{
        lineHeight: 1,
        perspective: 600,
      }}
      title={copied ? "Copied!" : copyable ? "Click to copy" : undefined}
    >
      <div className="relative z-10">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0 text-secondary">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block drop-shadow-[0_0_4px_rgba(180,100,255,0.4)]"
          >
            {l}
          </motion.span>
        ))}
      </div>

      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute -top-6 left-0 text-xs normal-case text-secondary"
        >
          Copied!
        </motion.span>
      )}
    </motion.a>
  );
};
