import React from 'react';

export function LogoIcon({ size = 36 }) {
  const id = 'lg' + size;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="#1a2b3c" />
      {/* Head profile outline */}
      <path
        d="M20 7 C26.5 7 31 11.8 31 18 C31 22.5 28.5 26.2 25 28 L24.5 33 L15.5 33 L15 28 C11.5 26.2 9 22.5 9 18 C9 11.8 13.5 7 20 7Z"
        stroke={`url(#${id})`}
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Three overlapping insight circles inside head */}
      <circle cx="18" cy="18" r="5.5" stroke={`url(#${id})`} strokeWidth="1.4" fill="none" />
      <circle cx="22" cy="16.5" r="5" stroke={`url(#${id})`} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="21" r="4.5" stroke={`url(#${id})`} strokeWidth="1.4" fill="none" />
    </svg>
  );
}

export function Logo({ text = 'Perfil Comportamental', dark = false }) {
  return (
    <div className={`logo ${dark ? 'logo--dark' : ''}`}>
      <LogoIcon />
      <span>{text}</span>
    </div>
  );
}
