interface Props {
  color?: string;
  size?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Fingerprint({ color = "#FFD700", size = 200, style, className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
        <path d="M100 22 C 60 22, 30 55, 30 100 C 30 130, 40 160, 55 178" />
        <path d="M100 32 C 68 32, 42 60, 42 100 C 42 124, 48 148, 60 168" />
        <path d="M100 42 C 76 42, 54 65, 54 100 C 54 120, 58 140, 68 158" />
        <path d="M100 52 C 84 52, 66 70, 66 100 C 66 116, 70 132, 78 148" />
        <path d="M100 62 C 90 62, 78 75, 78 100 C 78 114, 82 128, 88 140" />
        <path d="M100 72 C 96 72, 90 80, 90 100 C 90 112, 92 124, 96 134" />
        <path d="M100 82 C 102 84, 104 92, 104 102 C 104 112, 104 122, 106 130" />
        <path d="M120 30 C 145 45, 165 70, 168 100 C 168 130, 158 158, 144 178" />
        <path d="M132 38 C 152 52, 164 75, 164 100 C 164 122, 156 142, 145 160" />
        <path d="M141 50 C 154 62, 158 78, 158 96 C 158 114, 152 130, 142 144" />
        <path d="M148 65 C 152 75, 152 88, 152 98 C 152 110, 148 122, 142 132" />
      </g>
    </svg>
  );
}
