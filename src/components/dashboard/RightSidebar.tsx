"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function RightSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-64 bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg z-50"
    >
      <div className="p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-1 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            How can I assist you with your job search today?
          </p>
          {/* Add more AI assistant content here */}
        </div>
      </div>
    </motion.div>
  );
}
