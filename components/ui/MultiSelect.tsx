"use client";

import { useState, useRef, useEffect, useMemo } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string[];
  options: Option[];
  placeholder?: string;
  onChange: (value: string[]) => void;
};

export function MultiSelect({
  value,
  options,
  placeholder = "Select…",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () => options.filter((o) => value.includes(o.value)),
    [options, value]
  );

  const available = useMemo(
    () =>
      options.filter(
        (o) =>
          !value.includes(o.value) &&
          o.label.toLowerCase().includes(query.toLowerCase())
      ),
    [options, value, query]
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Input */}
      <div
        onClick={() => setOpen((v) => !v)}
        className="
          min-h-[42px] w-full
          rounded-lg border border-neutral-700
          bg-neutral-800 px-2 py-1
          flex flex-wrap items-center gap-1
          cursor-text
        "
      >
        {selected.map((opt) => (
          <span
            key={opt.value}
            className="
              flex items-center gap-1
              rounded-full bg-neutral-700
              px-2 py-1 text-xs text-white
            "
          >
            {opt.label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(value.filter((v) => v !== opt.value));
              }}
              className="opacity-60 hover:opacity-100"
            >
              ×
            </button>
          </span>
        ))}

        {selected.length === 0 && (
          <span className="text-sm text-neutral-500 px-1">{placeholder}</span>
        )}

        <div className="ml-auto px-1 text-neutral-400">▾</div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-20 mt-1 w-full
            rounded-lg border border-neutral-700
            bg-neutral-900 shadow-xl
            max-h-60 overflow-hidden
          "
        >
          {/* Search */}
          <div className="p-2 border-b border-neutral-800">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="
                w-full rounded-md
                bg-neutral-800 px-2 py-1
                text-sm text-white
                outline-none
              "
            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {available.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange([...value, opt.value]);
                  setQuery("");
                }}
                className="
                  w-full px-3 py-2 text-left text-sm
                  text-neutral-200
                  hover:bg-neutral-800
                "
              >
                {opt.label}
              </button>
            ))}

            {available.length === 0 && (
              <div className="px-3 py-2 text-sm text-neutral-500">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
