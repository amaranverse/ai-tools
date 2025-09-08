"use client";

import { useState, useEffect } from "react";
import ThemeWrapper from "../../components/ThemeWrapper";
import { Copy } from "lucide-react";

type Inputs = {
  x: string;
  y: string;
  oldValue: string;
  newValue: string;
};

type HistoryItem = {
  res: string;
  exp: string;
};

export default function PercentageCalculator() {
  const [mode, setMode] = useState<string>("ofNumber");
  const [inputs, setInputs] = useState<Inputs>({
    x: "",
    y: "",
    oldValue: "",
    newValue: "",
  });
  const [result, setResult] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleChange = (field: keyof Inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    let res = "";
    let exp = "";
    const { x, y, oldValue, newValue } = inputs;

    switch (mode) {
      case "ofNumber":
        if (x && y) {
          const val = (+x / 100) * +y;
          res = `${x}% of ${y} = ${val}`;
          exp = `Formula: (X ÷ 100) × Y → (${x} ÷ 100) × ${y} = ${val}`;
        }
        break;
      case "increase":
        if (x && y) {
          const val = (+x + (+y / 100) * +x).toFixed(2);
          res = `Increase ${x} by ${y}% = ${val}`;
          exp = `Formula: X + (Y% of X) → ${x} + (${y}% of ${x}) = ${val}`;
        }
        break;
      case "decrease":
        if (x && y) {
          const val = (+x - (+y / 100) * +x).toFixed(2);
          res = `Decrease ${x} by ${y}% = ${val}`;
          exp = `Formula: X - (Y% of X) → ${x} - (${y}% of ${x}) = ${val}`;
        }
        break;
      case "change":
        if (oldValue && newValue) {
          const change = ((+newValue - +oldValue) / +oldValue) * 100;
          res = `Change from ${oldValue} to ${newValue} = ${change.toFixed(2)}%`;
          exp = `Formula: ((New - Old) ÷ Old) × 100 → ((${newValue} - ${oldValue}) ÷ ${oldValue}) × 100 = ${change.toFixed(2)}%`;
        }
        break;
      case "reverse":
        if (x && y) {
          const val = (+x * 100) / +y;
          res = `${x} is ${y}% of ${val}`;
          exp = `Formula: (X × 100) ÷ Y → (${x} × 100) ÷ ${y} = ${val}`;
        }
        break;
      case "discount":
        if (x && y) {
          const savings = (+x * +y) / 100;
          const finalPrice = +x - savings;
          res = `Final Price = ${finalPrice}, You Save = ${savings}`;
          exp = `Formula: Price - (Price × Discount%) → ${x} - (${x} × ${y}%) = ${finalPrice}`;
        }
        break;
      default:
        res = "";
    }

    setResult(res);
    setExplanation(exp);

    if (res) {
      setHistory((prev) => {
        const newHistory = [{ res, exp }, ...prev];
        return newHistory.slice(0, 5); // keep only last 5
      });
    }
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, mode]);

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ThemeWrapper>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#23243a] tracking-tight">
            Percentage Calculator
          </h1>
          <p className="mt-2 text-[#55596a]">
            Flexible calculator for percentages, discounts, changes & more.
          </p>
        </div>

        {/* Mode Selector */}
        <select
          className="w-full mb-6 p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a] shadow-sm"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setInputs({ x: "", y: "", oldValue: "", newValue: "" });
            setResult("");
            setExplanation("");
          }}
        >
          <option value="ofNumber">% of a Number</option>
          <option value="increase">Increase a Number by %</option>
          <option value="decrease">Decrease a Number by %</option>
          <option value="change">Percentage Change</option>
          <option value="reverse">Reverse Percentage</option>
          <option value="discount">Discount Calculator</option>
        </select>

        {/* Inputs */}
        <div className="grid gap-3 mb-6">
          {mode === "ofNumber" && (
            <>
              <input
                type="number"
                placeholder="Enter % (X)"
                value={inputs.x}
                onChange={(e) => handleChange("x", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
              <input
                type="number"
                placeholder="Enter Number (Y)"
                value={inputs.y}
                onChange={(e) => handleChange("y", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
            </>
          )}
          {(mode === "increase" || mode === "decrease") && (
            <>
              <input
                type="number"
                placeholder="Enter Number (X)"
                value={inputs.x}
                onChange={(e) => handleChange("x", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
              <input
                type="number"
                placeholder="Enter % (Y)"
                value={inputs.y}
                onChange={(e) => handleChange("y", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
            </>
          )}
          {mode === "change" && (
            <>
              <input
                type="number"
                placeholder="Old Value"
                value={inputs.oldValue}
                onChange={(e) => handleChange("oldValue", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
              <input
                type="number"
                placeholder="New Value"
                value={inputs.newValue}
                onChange={(e) => handleChange("newValue", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
            </>
          )}
          {mode === "reverse" && (
            <>
              <input
                type="number"
                placeholder="Enter Value (X)"
                value={inputs.x}
                onChange={(e) => handleChange("x", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
              <input
                type="number"
                placeholder="Enter % (Y)"
                value={inputs.y}
                onChange={(e) => handleChange("y", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
            </>
          )}
          {mode === "discount" && (
            <>
              <input
                type="number"
                placeholder="Price"
                value={inputs.x}
                onChange={(e) => handleChange("x", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
              <input
                type="number"
                placeholder="Discount %"
                value={inputs.y}
                onChange={(e) => handleChange("y", e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 text-[#23243a]"
              />
            </>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6">
            <p className="font-semibold text-[#23243a]">{result}</p>
            {explanation && (
              <small className="block mt-1 text-gray-600">{explanation}</small>
            )}
            <button
              onClick={() => copyResult(result)}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4169e1] text-white font-medium hover:bg-[#2647a5] transition-colors shadow-sm"
            >
              <Copy size={16} /> Copy
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-[#23243a] mb-2">
              History (Last 5)
            </h3>
            <ul className="space-y-2">
              {history.map((h, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm"
                >
                  <span>{h.res}</span>
                  <button
                    onClick={() => copyResult(h.res)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <Copy size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ThemeWrapper>
  );
}
