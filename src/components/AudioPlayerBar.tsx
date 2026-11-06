import React, { useState, useEffect } from 'react';
import { Article } from '../types/magazine';
import { Play, Pause, X, Volume2, VolumeX, RotateCcw, FastForward, Radio } from 'lucide-react';

interface AudioPlayerBarProps {
  article: Article | null;
  onClose: () => void;
  onOpenArticle: (article: Article) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  article,
  onClose,
  onOpenArticle
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5 * speed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  if (!article) return null;

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  return (
    <aside aria-label="مشغل الصوت" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[450px] z-50 bg-stone-950/95 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-stone-800 backdrop-blur-xl animate-fade-in-up">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60">
            <Radio className="w-3 h-3 animate-pulse text-amber-400" />
            <span>بودكاست وقارئ أفق الصوتي</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Article Info & Soundwave */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={article.coverImage}
          alt={article.title}
          onClick={() => onOpenArticle(article)}
          className="w-12 h-12 rounded-xl object-cover shrink-0 cursor-pointer hover:opacity-80 transition-opacity border border-stone-800"
        />
        <div className="min-w-0 flex-1">
          <h4
            onClick={() => onOpenArticle(article)}
            className="font-bold text-xs sm:text-sm truncate cursor-pointer hover:text-amber-400 transition-colors"
          >
            {article.title}
          </h4>
          <p className="text-[11px] text-stone-400 truncate">
            بصوت الكاتب: {article.author.name}
          </p>
        </div>

        {/* Animated Waveform */}
        <div className="flex items-center gap-0.5 h-6 px-1">
          {[40, 70, 100, 50, 85, 60, 90, 45, 75, 30].map((h, i) => (
            <span
              key={i}
              className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
                isPlaying ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 0.8 : 1.2)) % 24)}px` : '4px',
                animation: isPlaying ? `bounce 1s infinite ${i * 0.1}s` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-2.5 cursor-pointer relative">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold transition-all transform hover:scale-105 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
          </button>
          
          <button
            onClick={() => setProgress(Math.max(0, progress - 10))}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="رجوع 10 ثوان"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setProgress(Math.min(100, progress + 10))}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="تقديم 10 ثوان"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Speed badge */}
          <button
            onClick={toggleSpeed}
            className="bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer"
          >
            {speed}x
          </button>

          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <span className="text-[11px] text-stone-400 font-mono">
            {article.audioDuration || '04:30'}
          </span>
        </div>
      </div>
    </aside>
  );
};
