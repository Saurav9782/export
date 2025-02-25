"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TextGenerationEffect = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((word) => word.split(""));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const letterVariants = {
    hidden: animationFrom,
    visible: (i) => ({
      ...animationTo,
      transition: {
        delay: i * (delay / 1000),
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <p
      ref={ref}
      className={`overflow-hidden inline ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="inline-block"
                onAnimationComplete={() => {
                  animatedCount.current += 1;
                  if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                    onLetterAnimationComplete();
                  }
                }}
              >
                {letter}
              </motion.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default TextGenerationEffect;
