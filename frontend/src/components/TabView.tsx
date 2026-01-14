import { Eye, MessageSquare, Edit3 } from "lucide-react";

interface TabViewProps {
  activeTab: "editor" | "chat" | "preview";
  onTabChange: (tab: "editor" | "chat" | "preview") => void;
}

export function TabView({ activeTab, onTabChange }: TabViewProps) {
  return (
    <div className="flex space-x-2 mb-4 p-2 bg-gray-950 rounded-lg">
      
      <button
        onClick={() => onTabChange("editor")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === "editor"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
        }`}
      >
        <Edit3 className="w-4 h-4" />
        Editor
      </button>
      <button
        onClick={() => onTabChange("chat")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === "chat"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        Chat
      </button>
      <button
        onClick={() => onTabChange("preview")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === "preview"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
        }`}
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>
    </div>
  );
}