"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/dashboard/Navbar";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";
import MainContent from "@/components/dashboard/MainContent";
import CircularProgress from "@mui/material/CircularProgress";

const parabolicEasing = (t: number) => {
  return 1 - Math.pow(1 - t, 2);
};

export default function DashboardPage() {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isPageLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <CircularProgress size={60} style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AnimatePresence>
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: parabolicEasing }}
          className="flex h-full w-full"
        >
          <LeftSidebar
            isCollapsed={isLeftSidebarCollapsed}
            setIsCollapsed={setIsLeftSidebarCollapsed}
          />
          <div className="flex flex-col flex-grow">
            <Navbar openRightSidebar={() => setIsRightSidebarOpen(true)} />
            <MainContent />
          </div>
          <RightSidebar
            isOpen={isRightSidebarOpen}
            onClose={() => setIsRightSidebarOpen(false)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
