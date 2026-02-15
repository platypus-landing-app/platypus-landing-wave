interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

const WaveDivider = ({ color = '#ffffff', flip = false, className = '' }: WaveDividerProps) => {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[40px] sm:h-[60px] md:h-[80px] block"
        fill={color}
      >
        <path d="M0,32 C360,80 720,0 1080,48 C1260,64 1380,24 1440,32 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
};

export default WaveDivider;
