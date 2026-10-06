export function Underline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className={className}>
      <path d="M2 8 C 40 3, 80 11, 120 6 S 180 4, 198 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Circle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 60" preserveAspectRatio="none" className={className}>
      <path d="M60 4 C 20 3, 3 18, 6 32 C 10 52, 70 60, 104 48 C 122 40, 118 14, 92 7 C 76 3, 50 4, 30 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 40" className={className}>
      <path d="M4 26 C 30 6, 70 4, 108 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M96 10 L 110 20 L 95 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
