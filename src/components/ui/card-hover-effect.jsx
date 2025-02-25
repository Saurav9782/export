import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback } from "react";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleHover = useCallback((index) => setHoveredIndex(index), []);
  const clearHover = useCallback(() => setHoveredIndex(null), []);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 py-10", className)}>
      {items?.map((item, idx) => (
        item?.link && (
          <Link
            href={item.link}
            key={item.id || idx}
            aria-label={`Navigate to ${item.title}`}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => handleHover(idx)}
            onMouseLeave={clearHover}
            onTouchStart={() => handleHover(idx)}
            onTouchEnd={clearHover}
            onFocus={() => handleHover(idx)}
            onBlur={clearHover}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-slate-800/80 block rounded-2xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Link>
        )
      ))}
    </div>
  );
};

// Card components remain similar with adjusted styling
export const Card = ({ className, children }) => (
  <div className={cn(
    "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-white/20",
    "group-hover:border-slate-600 transition-colors duration-300 relative z-20",
    className
  )}>
    <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 text-lg", className)}>
    {children}
  </h4>
);

export const CardDescription = ({ className, children }) => (
  <p className={cn("mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
    {children}
  </p>
);