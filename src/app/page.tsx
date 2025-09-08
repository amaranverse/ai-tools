"use client";

import Link from "next/link";
import ThemeWrapper from "./components/ThemeWrapper";
import {
  IconLock,
  Icon123,
  IconPercentage,
  IconCake,
} from "@tabler/icons-react";

const tools = [
  {
    name: "Password Generator",
    path: "/tools/password-generator",
    icon: <IconLock size={28} stroke={1.3} color="#4169E1" />,
  },
  {
    name: "Word & Character Counter",
    path: "/tools/word-counter",
    icon: <Icon123 size={28} stroke={1.3} color="#4169E1" />,
  },
  {
    name: "Percentage Calculator",
    path: "/tools/percentage-calculator",
    icon: <IconPercentage size={28} stroke={1.3} color="#4169E1" />,
  },
  {
    name: "Age Calculator",
    path: "/tools/age-calculator",
    icon: <IconCake size={28} stroke={1.3} color="#4169E1" />,
  },
];

export default function HomePage() {
  return (
    <ThemeWrapper>
      {/* Sticky Navbar */}
      <nav className="sticky top-4 z-50 bg-white/95 rounded-2xl border shadow border-gray-200 px-8 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-[#9ab] font-sans"
        >
          tools easy use
        </Link>
        {/* Nav Links */}
        <div className="flex gap-5 text-base font-medium">
          <Link
            href="/"
            className="text-gray-400 hover:text-[#2647a5] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/tools/password-generator"
            className="text-gray-400 hover:text-[#2647a5] transition-colors"
          >
            Tools
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-12">
        <h1 className="text-5xl md:text-6xl font-sans font-extrabold text-[#def] tracking-tight">
          tools easy use
        </h1>
        <p className="mt-3 text-lg text-[#55596a]">
          Professional, fast & elegant tools for everyday productivity
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-8 mt-14 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="block p-7 rounded-xl bg-white border border-gray-200 hover:border-[#4169e1] shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105"
          >
            {tool.icon && <div className="mb-2">{tool.icon}</div>}
            <h2 className="mt-2 text-lg font-semibold text-[#23243a]">
              {tool.name}
            </h2>
            <p className="text-sm mt-2 text-gray-500">
              Click to open this tool
            </p>
          </Link>
        ))}
      </div>
    </ThemeWrapper>
  );
}
