// src/components/DashboardSidebar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, RefreshCw, Settings, Trash2 } from "lucide-react";

export default function DashboardSidebar({
  chats,
  activeChatId,
  setActiveChatId,
  searchTerm,
  setSearchTerm,
  setShowSettings,
  deleteAllChats,
}) {
  const recent = chats.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90 }}
      className="w-72 bg-black/40 backdrop-blur-md border-r border-white/5 flex flex-col"
    >
      {/* Top Logo */}
      <div className="py-6 px-4 flex items-center justify-center border-b border-white/5">
        <button
          onClick={() => window.location.reload()}
          className="text-xl font-extrabold tracking-wide hover:opacity-80 transition"
        >
          NovaAI
        </button>
      </div>

      {/* Last Seen + Search */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <div className="flex items-center gap-2">
            <Clock />
            <span>Last seen</span>
          </div>
          <button
            className="text-xs px-2 py-1 bg-white/5 rounded hover:bg-white/10"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <input
          className="w-full bg-white/5 placeholder-gray-400 text-sm px-3 py-2 rounded outline-none"
          placeholder="Search recent chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-auto p-2 space-y-2">
        {recent.length === 0 && (
          <div className="text-sm text-gray-400 p-3">
            No recent chats yet — start a conversation!
          </div>
        )}
        <AnimatePresence>
          {recent.map((c) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.16 }}
              onClick={() => setActiveChatId(c.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition text-left ${
                c.id === activeChatId ? "bg-white/6 ring-1 ring-white/10" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                {c.title?.charAt(0)?.toUpperCase() || "N"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium truncate">{c.title}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(c.lastSeen).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-xs text-gray-400 truncate mt-1">
                  {c.messages[c.messages.length - 1]?.text?.slice(0, 60) ||
                    "No messages yet"}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-white/5">
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5"
          onClick={() => setShowSettings(true)}
        >
          <Settings />
          <span>Settings</span>
        </button>
        <button
          className="mt-2 w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-red-400"
          onClick={deleteAllChats}
        >
          <Trash2 />
          <span>Clear all chats</span>
        </button>
      </div>
    </motion.aside>
  );
}