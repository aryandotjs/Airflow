interface GlowButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function GlowButton({ onClick, children, disabled = false }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2 w-full h-12 px-5 font-semibold text-base select-none rounded-2xl transition-all duration-200
        ${disabled 
          ? "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-50" 
          : "text-white border-[2px] border-white/10  bg-[linear-gradient(104deg,rgba(253,253,253,0.05)_5%,rgba(240,240,228,0.15)_100%)] hover:bg-white hover:text-black cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]"
        }
      `}
    >
      {children}
    </button>
  );
}


