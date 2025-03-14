
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -5,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-1 flex flex-col w-full max-w-screen-2xl mx-auto px-4 sm:px-6 pb-8"
      >
        {children}
      </motion.main>
      <footer className="py-4 text-center text-sm text-muted-foreground bg-secondary/50 border-t border-border">
        <p>© {new Date().getFullYear()} HospitalGo. Making healthcare navigation simpler.</p>
      </footer>
    </div>
  );
};

export default Layout;
