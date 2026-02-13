// src/components/SettingsModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal({
  showSettings,
  setShowSettings,
  clearChats,
}) {
  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          key="settings"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140 }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-sm text-gray-400"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-gray-300">
              <div>
                <div className="text-xs text-gray-400">Theme</div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 bg-white/5 rounded">Dark</button>
                  <button className="px-3 py-1 bg-white/5 rounded">Light</button>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Model / API</div>
                <div className="mt-2">
                  <input
                    className="w-full bg-white/5 px-3 py-2 rounded"
                    placeholder="API endpoint / key (optional)"
                  />
                </div>
              </div>

              <div className="text-xs text-gray-400">Storage</div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 bg-red-600 rounded"
                  onClick={clearChats}
                >
                  Clear all conversations
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}