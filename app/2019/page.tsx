'use client'

import CrosswordGrid from "@/components/crossword-grid";

export default function CrossCompatibility() {
  return (
    <div className="cross-compatibility-container-background">
      <div className="container cross-compatibility-container">
        <div className="row">
          <div className="col-xs-6 offset-1"><h3>Test your relationship knowledge with a fun puzzle:</h3></div>
        </div>
        <div className="row">
          <div className="col-xs-6"><CrosswordGrid/></div>
        </div>
      </div>
    </div>
  );
}