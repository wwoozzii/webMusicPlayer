import { create } from "zustand";
interface Track {
  id: string;
  name: string;
  url: string;
}

interface Playerstate {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentVolume: number;

  //экшены
  addTrack: (track: Omit<Track, "id">) => void;
  setCurrentTrack: (track: Track) => void;
  setCurrentVolume: (volume: number) => void;
  togglePlay: () => void;
  toggleTrack: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const usePlayerStore = create<Playerstate>((set, get) => ({
  tracks: [],
  currentTrack: null,
  isPlaying: false,
  currentVolume: 0.08,

  addTrack: (newTrack) =>
    set((state) => ({
      tracks: [...state.tracks, { ...newTrack, id: crypto.randomUUID() }],
    })), //принимает массив с url и name из fileUploader и вставляет в массив треков tracks[]

  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
    }),

  setCurrentVolume: (volume) =>
    set({
      currentVolume: volume,
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  toggleTrack: (track) =>
    set((state) => {
      if (state.currentTrack?.id === track.id) {
        return { isPlaying: !state.isPlaying };
      }

      return {
        currentTrack: track,
        isPlaying: true,
      };
    }),

  nextTrack: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;

    set({
      currentTrack: tracks[nextIndex],
      isPlaying: true,
    });
  },

  prevTrack: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex + tracks.length - 1) % tracks.length;

    set({
      currentTrack: tracks[prevIndex],
      isPlaying: true,
    });
  },
}));
