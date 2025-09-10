"use client";

import { useState } from "react";
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import ThemeWrapper from "../../components/ThemeWrapper";

type Options = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(12);
  const [options, setOptions] = useState<Options>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Password Generator Logic
  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const sym = "!@#$%^&*()_+[]{}<>?/";

    let allChars = "";
    const guaranteedChars: string[] = [];

    if (options.uppercase) {
      allChars += upper;
      guaranteedChars.push(upper[Math.floor(Math.random() * upper.length)]);
    }
    if (options.lowercase) {
      allChars += lower;
      guaranteedChars.push(lower[Math.floor(Math.random() * lower.length)]);
    }
    if (options.numbers) {
      allChars += num;
      guaranteedChars.push(num[Math.floor(Math.random() * num.length)]);
    }
    if (options.symbols) {
      allChars += sym;
      guaranteedChars.push(sym[Math.floor(Math.random() * sym.length)]);
    }

    if (!allChars) {
      setPassword("⚠️ Select at least one option");
      return;
    }

    const remainingLength = length - guaranteedChars.length;
    const passwordChars = [...guaranteedChars];

    for (let i = 0; i < remainingLength; i++) {
      passwordChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle
    for (let i = passwordChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    setPassword(passwordChars.join(""));
  };

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  return (
    <ThemeWrapper>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#23243a] tracking-tight">
            Password Generator
          </h1>
          <p className="mt-2 text-[#55596a]">
            Create strong, secure, and customizable passwords instantly.
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block font-medium text-[#23243a] mb-2">
              Length: <span className="font-bold">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#4169e1]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.keys(options).map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 text-[#23243a] font-medium"
              >
                <input
                  type="checkbox"
                  checked={options[key as keyof Options]}
                  onChange={() =>
                    setOptions({
                      ...options,
                      [key]: !options[key as keyof Options],
                    })
                  }
                  className="accent-[#4169e1]"
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="mt-8">
          <div className="flex items-center gap-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              placeholder="Click Generate to create a password"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a] font-mono text-lg shadow-sm"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={generatePassword}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4169e1] text-white font-medium hover:bg-[#2647a5] transition-colors shadow-md"
            >
              <RefreshCw size={18} /> Generate
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
            >
              <Copy size={18} /> Copy
            </button>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
