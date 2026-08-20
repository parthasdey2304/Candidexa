"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function VideoPlayer({
  title,
  poster,
  className,
  autoPlay = false,
}: {
  title: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-[#2d3449] bg-black", className)}>
      <video
        ref={ref}
        src="/videos/placeholder-demo.mp4"
        poster={poster}
        className="aspect-video w-full object-cover"
        muted={muted}
        autoPlay={autoPlay}
        playsInline
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
      />
      {poster && !playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Play className="size-12 text-white/80" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-7 bg-white/10 text-white hover:bg-white/20"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-white/80 transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-7 bg-white/10 text-white hover:bg-white/20"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon-sm" className="size-7 bg-white/10 text-white hover:bg-white/20" aria-label="Fullscreen">
          <Maximize className="size-4" />
        </Button>
      </div>
      <span className="absolute top-2 left-3 text-xs font-medium text-white drop-shadow">{title}</span>
    </div>
  );
}

export function VideoEmptyState({ title }: { title: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-[#2d3449] bg-[#0b1326]">
      <div className="text-center">
        <Play className="mx-auto size-8 text-[#2d3449]" />
        <p className="mt-2 text-sm text-[#908fa0]">{title}</p>
        <p className="text-xs text-[#2d3449]">Demo video coming soon</p>
      </div>
    </div>
  );
}