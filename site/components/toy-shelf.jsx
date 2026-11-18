"use client";

import { useState } from "react";

const interests = [
  { id: "robot", name: "Robotics", note: "It started with RoboCup at Bowdoin. Still a soft spot for machines that move." },
  { id: "computer", name: "Useful software", note: "Infrastructure, AI systems, and the satisfaction of getting something to work." },
  { id: "racket", name: "Tennis & padel", note: "Occasionally stepping away from the computer to hit a ball." },
  { id: "car", name: "Tinkering", note: "Electronics, cars, and a good excuse to figure out how something works." },
];

function ObjectDrawing({ kind }) {
  const common = { viewBox: "0 0 180 140", fill: "none", stroke: "currentColor", strokeWidth: "2.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (kind === "robot") return <svg {...common}>
    <g className="robot-body"><path d="M89 20V9m-5 0h10" /><rect x="58" y="22" width="64" height="48" rx="11" fill="var(--toy-blue)" /><path d="M51 38h7m64 0h8M73 56h34" /><circle className="robot-eye" cx="76" cy="42" r="4" fill="currentColor" /><circle className="robot-eye" cx="104" cy="42" r="4" fill="currentColor" /><path d="M66 72h48l-2 34H68Z" fill="var(--toy-blue)" /><path d="M77 107v16h-11m36-16v16h11M66 81 48 94l-10-7" /><g className="robot-arm"><path d="m114 81 20-16 4-21m-6 0 6 6 7-4" /></g><circle cx="90" cy="89" r="6" fill="var(--toy-yellow)" /></g>
  </svg>;
  if (kind === "computer") return <svg {...common}>
    <path d="M48 23h84l7 75H41Z" fill="var(--toy-mint)" /><rect x="55" y="34" width="70" height="48" rx="4" fill="var(--toy-screen)" /><path className="terminal-prompt" d="m65 48 9 8-9 8m18 0h13" stroke="var(--toy-mint)" /><path d="M76 99v9m27-9v9M37 110h106l7 15H30Z" fill="var(--toy-mint)" /><path d="M48 116h70m8 0h5M110 91h6" />
  </svg>;
  if (kind === "racket") return <svg {...common}>
    <g className="racket-drawing" transform="rotate(24 90 70)"><ellipse cx="83" cy="45" rx="27" ry="34" fill="var(--toy-peach)" /><path d="M59 30h48M57 42h52M58 54h49M64 66h37M70 18v53M82 13v64M94 16v58M64 73l18 28 20-28M78 101h9v29h-9Z" /><path d="m79 109 7 4m-7 4 7 4" /></g><g className="tennis-ball"><circle cx="129" cy="106" r="18" fill="var(--toy-yellow)" /><path d="M115 95c12 6 13 15 12 28m6-34c-2 11 2 20 12 25" stroke="var(--toy-ball-line)" strokeWidth="2" /></g>
  </svg>;
  return <svg {...common}>
    <g className="car-drawing"><path d="m29 84 14-21h58l21 22 24 5 6 21H24l-3-17Z" fill="var(--toy-orange)" /><path d="m51 69-9 16h68L96 69ZM77 69v16" fill="var(--toy-screen)" /><path d="M30 91h12m89 5h13M82 93h8" /><circle cx="49" cy="111" r="13" fill="var(--paper)" /><circle cx="128" cy="111" r="13" fill="var(--paper)" /><circle cx="49" cy="111" r="5" /><circle cx="128" cy="111" r="5" /></g><path className="car-speed" d="M12 71h16M4 81h17M9 101h6" />
  </svg>;
}

export default function ToyShelf() {
  const [selected, setSelected] = useState(null);
  return <section className="interests" aria-labelledby="interests-title">
    <div className="interests-heading"><h2 id="interests-title">A few things I’m into</h2><p className="shelf-hint">pick one <span aria-hidden="true">↙</span></p></div>
    <div className="toy-shelf">
      {interests.map((item) => <button key={item.id} type="button" className={`toy toy-${item.id}${selected?.id === item.id ? " is-selected" : ""}`} aria-pressed={selected?.id === item.id} aria-controls="interest-note" onClick={() => setSelected(selected?.id === item.id ? null : item)}><span className="toy-drawing"><ObjectDrawing kind={item.id} /></span><span className="toy-name">{item.name}<span className="toy-dot" aria-hidden="true" /></span></button>)}
    </div>
    <p className={`interest-note${selected ? " has-selection" : ""}`} id="interest-note" aria-live="polite" aria-atomic="true">{selected ? selected.note : "Curiosity tends to get the better of me."}</p>
  </section>;
}
