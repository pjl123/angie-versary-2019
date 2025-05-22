'use client'

import CrosswordGrid from "@/components/crossword-grid";

export default function CrossCompatibility() {
  return (
    <div className="flex justify-center bg-cyan-300 w-screen h-screen">
      <div className="flex flex-col text-center gap-2 pt-[50px] bg-amber-300 w-2/3">
        <div className="text-2xl">Test your relationship knowledge with a fun puzzle:</div>
        <CrosswordGrid/>
      </div>
    </div>
  );
}