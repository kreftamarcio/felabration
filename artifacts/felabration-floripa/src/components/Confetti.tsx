export function fireConfetti() {
  const colors = ["#FFD700", "#E6392B", "#FF4500", "#C9A227", "#fff", "#FF2D95"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -10px;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      z-index: 9000;
      pointer-events: none;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(el);
    const dur = Math.random() * 2 + 1.5;
    el.animate(
      [
        { top: "-10px", opacity: 1 },
        {
          top: "110vh",
          opacity: 0,
          transform: `rotate(${Math.random() * 720}deg) translateX(${(Math.random() - 0.5) * 200}px)`,
        },
      ],
      { duration: dur * 1000, easing: "cubic-bezier(.25,.46,.45,.94)" }
    );
    setTimeout(() => el.remove(), dur * 1000);
  }
}
