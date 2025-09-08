"use client";

import { useState } from "react";

export default function AiOptimizer() {
  const [image, setImage] = useState<string | null>(null);
  const [optimized, setOptimized] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setOptimized(null);
    }
  };

  const optimizeImage = async () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    await img.decode();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    // Convert to WebP with adjustable quality
    const optimizedUrl = canvas.toDataURL("image/webp", quality / 100);
    setOptimized(optimizedUrl);
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6 gap-10">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Image Optimizer</h1>
        <p className="text-gray-400 text-sm">
          Upload your image, adjust settings, and download an optimized version instantly.
        </p>
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-md border-2 border-dashed border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-900">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Upload Image
        </label>
        {image && <img src={image} alt="preview" className="max-h-60 rounded-lg" />}
      </div>

      {/* Options */}
      {image && (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-400">Quality: {quality}%</label>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-40"
            />
          </div>
          <button
            onClick={optimizeImage}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Optimize Image
          </button>
        </div>
      )}

      {/* Output */}
      {optimized && (
        <div className="flex flex-col items-center gap-4">
          <img src={optimized} alt="optimized" className="max-h-60 rounded-lg" />
          <a
            href={optimized}
            download="optimized.webp"
            className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition"
          >
            Download Optimized
          </a>
        </div>
      )}
    </div>
  );
}
