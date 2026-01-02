import { useEffect, useRef } from "react";

const MatrixRain = ({ speed = 33, hiddenName = "FAIZAN" }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const letters = "アァカサタナハマヤラワ0123456789";
    const fontSize = 16;
    let drops = [];
    let columns = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array(columns).fill(1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        let text;
        let color = "#00ff00"; // default green

        // 🔴 1% chance to show hidden name in red
        if (Math.random() > 0.99) {
          const index = Math.floor(Math.random() * hiddenName.length);
          text = hiddenName[index];
          color = "#ff0000"; // red
        } else {
          text = letters.charAt(Math.floor(Math.random() * letters.length));
        }

        ctx.fillStyle = color;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationRef.current = setInterval(draw, speed);

    return () => {
      clearInterval(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [speed, hiddenName]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full touch-none"
    />
  );
};

export default MatrixRain;
