import { ReactNode } from "react";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87ceeb] via-[#6ea8fa] to-[#4a90e2] bg-blue-400 text-[#23243a] font-sans">
      <div className="max-w-4xl mx-auto p-6">{children}</div>
    </div>
  );
}
