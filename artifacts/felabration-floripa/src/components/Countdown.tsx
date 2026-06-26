import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("2026-10-23T18:00:00-03:00").getTime();

    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { label: "Dias", value: pad(time.days) },
    { label: "Horas", value: pad(time.hours) },
    { label: "Min", value: pad(time.mins) },
    { label: "Seg", value: pad(time.secs) },
  ];

  return (
    <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginBottom: "32px" }}>
      {units.map((u) => (
        <div
          key={u.label}
          data-testid={`countdown-${u.label.toLowerCase()}`}
          style={{
            textAlign: "center",
            padding: "14px 20px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            minWidth: "80px",
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2.4rem",
              color: "var(--fela-gold)",
              display: "block",
              lineHeight: 1,
            }}
          >
            {u.value}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              color: "var(--fela-muted)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
            }}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
