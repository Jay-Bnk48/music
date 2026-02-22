import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const bgColor = '#4557b2';
  const [songs, setSongs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        if (!response.ok) {
          throw new Error('Could not fetch songs.');
        }
        const data = await response.json();
        setSongs(Array.isArray(data) ? data : []);
      } catch {
        setError('Unable to load songs right now.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
  }, []);

  const getIndex = (index) => {
    if (!songs.length) {
      return 0;
    }
    return (index + songs.length) % songs.length;
  };

  const prevIndex = getIndex(activeIndex - 1);
  const nextIndex = getIndex(activeIndex + 1);
  const activeSong = songs[activeIndex];

  const decks = useMemo(
    () => [
      { key: 'prev', song: songs[prevIndex], index: prevIndex, active: false },
      { key: 'active', song: songs[activeIndex], index: activeIndex, active: true },
      { key: 'next', song: songs[nextIndex], index: nextIndex, active: false },
    ],
    [songs, prevIndex, activeIndex, nextIndex]
  );

  const onSelectSong = async (index) => {
    setActiveIndex(getIndex(index));
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!audioRef.current || !activeSong) {
      return;
    }
    try {
      audioRef.current.load();
    } catch {
      return;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeSong, isPlaying]);

  const togglePlayPause = async () => {
    if (!audioRef.current || !activeSong) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ backgroundColor: bgColor }}
    >
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-wide md:text-3xl">
          LOVE MUSIC ENTERTAINMENT
        </h1>

        {isLoading && <p className="text-sm text-zinc-300">Loading tracks...</p>}
        {error && <p className="text-sm text-rose-300">{error}</p>}

        {!isLoading && !error && songs.length > 0 && (
          <>
            <section className="flex w-full items-center justify-center gap-4 sm:gap-8">
              {decks.map((deck) => (
                <motion.button
                  key={`${deck.key}-${deck.song?.id ?? deck.index}`}
                  type="button"
                  className={`flex items-center justify-center rounded-full border border-white/20 transition ${
                    deck.active
                      ? 'h-44 w-44 sm:h-56 sm:w-56'
                      : 'h-24 w-24 opacity-75 sm:h-32 sm:w-32'
                  }`}
                  animate={
                    deck.active && isPlaying
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    deck.active && isPlaying
                      ? { duration: 3, repeat: Infinity, ease: 'linear' }
                      : { duration: 0.4 }
                  }
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => onSelectSong(deck.index)}
                  aria-label={`Select ${deck.song?.title ?? 'track'}`}
                >
                  <div
                    className={`rounded-full border border-white/25 ${
                      deck.active
                        ? 'h-[86%] w-[86%] bg-zinc-900'
                        : 'h-[84%] w-[84%] bg-zinc-800'
                    }`}
                  >
                    <div className="mx-auto mt-[39%] h-5 w-5 rounded-full bg-zinc-300/70" />
                  </div>
                </motion.button>
              ))}
            </section>

            <section className="mt-8 flex min-h-[140px] flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSong.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <h2 className="text-xl font-medium md:text-2xl">{activeSong.title}</h2>
                  <p className="text-sm text-zinc-300 md:text-base">{activeSong.artist}</p>
                  <p className="mx-auto max-w-xl text-sm text-zinc-400 md:text-base">
                    {activeSong.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </section>

            <section className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10"
                onClick={() => onSelectSong(activeIndex - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10"
                onClick={togglePlayPause}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10"
                onClick={() => onSelectSong(activeIndex + 1)}
              >
                Next
              </button>
            </section>

            <audio
              ref={audioRef}
              onEnded={() => onSelectSong(activeIndex + 1)}
              preload="none"
            >
              <source src={activeSong.file_url} type="audio/mpeg" />
            </audio>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
