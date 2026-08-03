"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ChatPanel from "./ChatPanel";

export default function ChatFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 22 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 md:right-10 z-50 w-14 h-14 rounded-full bg-text text-bg grid place-items-center shadow-lg hover:bg-accent transition-colors"
        aria-label="Open chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={20} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent border-2 border-bg" />
      </motion.button>

      <AnimatePresence>
        {open && <ChatPanel onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
