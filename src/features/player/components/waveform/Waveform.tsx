import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../playerStore";

interface WaveformProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const Waveform = ({ audioRef }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const isPlaying = usePlayerStore((state) => state.isPlaying);

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;

    if (!audio || !canvas) return;

    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      if (!sourceRef.current) {
        sourceRef.current = ctx.createMediaElementSource(audio);
      }

      sourceRef.current.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
    }

    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    if (!ctx || !analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, "#a900e6");
      gradient.addColorStop(0.3, "#ff4d00");
      gradient.addColorStop(0.6, "#a1bbcc");
      gradient.addColorStop(1, "#9500ff");

      const barWidth = (canvas.width / dataArray.length) * 1.2;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        // ctx.fillStyle = "#d5ddd8";
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    if (isPlaying) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      render();
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [audioRef, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      style={{ background: "#111", borderRadius: "4px" }}
    />
  );
};
