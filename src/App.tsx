import React, { useState, useEffect, useRef } from 'react';
import { Code2, Terminal, Instagram, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

function TypewriterText({ text, delay = 70 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
}

function SpotifyIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.022-1.846-6.821-2.265-11.29-1.241-.424.091-.851-.201-.922-.614-.092-.413.201-.851.614-.922 4.89-1.121 9.11-.632 12.45 1.435.369.241.49.721.249 1.101zm1.481-3.291c-.301.452-.921.602-1.381.301-3.461-2.131-8.731-2.741-12.842-1.501-.522.161-1.062-.13-1.211-.652-.151-.522.13-1.062.652-1.211 4.671-1.421 10.471-.721 14.452 1.771.448.301.597.921.301 1.381l.029-.089zm.13-3.421c-4.151-2.461-11.001-2.692-14.962-1.491-.631.201-1.291-.161-1.481-.792-.201-.631.161-1.291.792-1.481 4.561-1.381 12.151-1.111 16.952 1.711.592.341.771 1.111.421 1.691-.331.591-1.101.771-1.691.421l-.031-.059z"/>
    </svg>
  );
}

function DiscordIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

const songs = [
  {
    title: "Sonne (Slowed)",
    artist: "Rammstein",
    src: "assets/sonne.mp3"
  },
  {
    title: "Dance!",
    artist: "Envacity",
    src: "assets/dance.mp3"
  },
  {
    title: "Mevsiom Olmayan Mekanlar: Kar",
    artist: "Farazi V Kayra",
    src: "assets/mevsim.mp3"
  }
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSongEnd = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentSongIndex(prev => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev === songs.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  return (
    <div className="absolute bottom-3 right-3 border border-white bg-[#0A0A0A] rounded-lg p-1 max-xs:w-[12rem] max-xs:p-1.3 w-40 max-xs:bottom-1.5 max-xs:right-1.5 xs:w-44 sm:w-52 sm:p-2.5 nt:w-60 nt:p-3 transform transition-all duration-300 hover:scale-[1.02] shadow-lg">
      <audio 
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleSongEnd}
      />
      
      <div className="flex items-center gap-1 max-xs:mb-0 mb-1">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] max-xs:leading-none sm:text-[11.5px] nt:text-xs font-semibold truncate">{currentSong.title}</div>
          <div className="text-[9px] max-xs:leading-none sm:text-[11px] nt:text-[11px] text-gray-400 truncate">{currentSong.artist}</div>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-1.5 max-xs:my-0 nt:gap-3 nt:my-2">
        <button 
          className="text-gray-400 hover:text-white transition-colors duration-300"
          onClick={handlePrevious}
        >
          <SkipBack size={8} className="max-xs:w-3 max-xs:h-3 nt:w-4 nt:h-4" />
        </button>
        <button 
          className="w-5 h-5 max-xs:w-5 max-xs:h-5 nt:w-7 nt:h-7 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? 
            <Pause size={8} className="translate-y-[0.5px] max-xs:w-3 max-xs:h-3 nt:w-4 nt:h-4" /> : 
            <Play size={8} className="translate-x-[0.5px] translate-y-[0.5px] max-xs:w-3 max-xs:h-3 nt:w-4 nt:h-4" />
          }
        </button>
        <button 
          className="text-gray-400 hover:text-white transition-colors duration-300"
          onClick={handleNext}
        >
          <SkipForward size={8} className="max-xs:w-3 max-xs:h-3 nt:w-4 nt:h-4" />
        </button>
      </div>
      
      <div className="mt-0">
        <div className="w-full bg-gray-800 rounded-full h-0.5 max-xs:h-[1px] nt:h-1">
          <div 
            className="bg-white h-0.5 max-xs:h-[1px] nt:h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[6px] max-xs:mt-0 nt:text-[9px] mt-0.5 nt:mt-1 text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [discordTooltip, setDiscordTooltip] = useState("Discord");

  const handleDiscordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("@enes0").then(() => {
      setDiscordTooltip("Copied to clipboard!");
      setTimeout(() => {
        setDiscordTooltip("Discord");
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8 font-mono flex items-center justify-center">
      <div className="max-w-3xl w-full relative">
        <div className="border border-white rounded-t-lg p-2 bg-[#1A1A1A] flex items-center gap-2">
          <Terminal size={16} className="md:w-[18px] md:h-[18px]" />
          <span className="text-xs md:text-sm">terminal@user:~</span>
        </div>
        
        <div className="border-x border-b border-white rounded-b-lg p-4 md:p-6 space-y-6 md:space-y-8">
          <div className="flex items-start gap-4 md:gap-8">
            <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-white rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src="https://i.imgur.com/sZgICh0.jpeg" 
                alt="Profile"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-bold bg-white text-[#0A0A0A] inline-block px-2 md:px-3 py-0.5 md:py-1">
                <TypewriterText text="enes" />
              </h1>
              <div className="text-gray-300 text-lg md:text-xl">
                <TypewriterText text="kedi fanatiği" delay={50} />
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-white pb-2 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300">
              <Code2 size={20} className="md:w-6 md:h-6" />
              <h2 className="text-xl md:text-2xl font-bold">About</h2>
            </div>
            <div className="pl-4 md:pl-6 text-gray-300 space-y-2 text-sm md:text-base">
              <p>
                <TypewriterText 
                  text="lover of vite and react; fuck you tsx"
                  delay={20}
                />
              </p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-white pb-2 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300">
              <Terminal size={20} className="md:w-6 md:h-6" />
              <h2 className="text-xl md:text-2xl font-bold">Skills</h2>
            </div>
            <div className="pl-4 md:pl-6 grid grid-cols-2 gap-1.5 md:gap-2 text-gray-300 text-sm md:text-base">
              <div>• Python</div>
              <div>• Lua</div>
              <div>• Node.js</div>
              <div>• GraphQL</div>
              <div>• AWS</div>
              <div>• Docker</div>
            </div>
          </div>

          <div className="pt-2 md:pt-4 flex items-center gap-4 md:gap-6 text-gray-300">
            <a 
              href="https://instagram.com/eneseker4900" 
              className="hover:text-white transition-colors relative group"
            >
              <Instagram size={20} className="md:w-6 md:h-6" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A0A0A] border border-white text-white px-2 py-1 rounded text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                Instagram
              </span>
            </a>
            <a 
              href="https://open.spotify.com/user/ea69e7owsm90et5v1z6o0kf5u" 
              className="hover:text-white transition-colors relative group"
            >
              <SpotifyIcon size={20} className="md:w-6 md:h-6" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A0A0A] border border-white text-white px-2 py-1 rounded text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                Spotify
              </span>
            </a>
            <a 
              href="#"
              onClick={handleDiscordClick}
              className="hover:text-white transition-colors relative group"
            >
              <DiscordIcon size={20} className="md:w-6 md:h-6" />
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0A0A0A] border border-white text-white px-2 py-1 rounded text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                {discordTooltip}
              </span>
            </a>
          </div>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;