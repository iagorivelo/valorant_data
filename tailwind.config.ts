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
        // Neutros com viés frio (não cinza puro) + um único acento.
        ground: '#0B0F14',           // fundo da página (near-black azulado)
        surface: '#121821',          // cards / painéis
        'surface-raised': '#1A222C', // estados elevados / hover
        line: '#232E39',             // hairlines
        ink: '#EDF1F4',              // texto primário
        'ink-muted': '#9DAAB4',      // texto secundário (≥ AA)
        'ink-faint': '#788591',      // legendas / terciário (≥ AA)
        accent: '#FF4655',           // vermelho VALORANT (acento único)
        'accent-soft': '#FF6470',
        // ── Alias de marca (compat) ────────────────────────────────
        valorant: { red: '#FF4655', dark: '#0B0F14', card: '#121821' },
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Escala tipográfica consistente (roles nomeados).
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }], // 11px
        caption: ['0.75rem', { lineHeight: '1.5' }],                          // 12px
        body: ['0.9375rem', { lineHeight: '1.65' }],                          // 15px
      },
      boxShadow: {
        // Elevação suave para o hover dos cards (tema escuro → sombras profundas).
        lift: '0 18px 40px -20px rgba(0, 0, 0, 0.75), 0 6px 16px -10px rgba(0, 0, 0, 0.55)',
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
