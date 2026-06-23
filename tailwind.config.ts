import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Sistema semântico ──────────────────────────────────────
        ground: '#0C1116',           // fundo da página (near-black azulado)
        surface: '#11181E',          // cards / painéis
        'surface-raised': '#18222B', // estados elevados / hover
        line: '#1E2731',             // hairlines
        ink: '#E7ECEF',              // texto primário
        'ink-muted': '#8A97A0',      // texto secundário
        'ink-faint': '#566069',      // legendas / terciário
        accent: '#FF4655',           // vermelho VALORANT (acento)
        'accent-soft': '#FF6470',
        // ── Alias de marca (compat) ────────────────────────────────
        valorant: { red: '#FF4655', dark: '#0C1116', card: '#11181E' },
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        panel: '0 24px 80px -20px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
        'fade-up': 'fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'modal-in': 'fade-in 0.2s ease-out, zoom-in 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
