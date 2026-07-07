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

  //экшены
  addTrack: (track: Omit<Track, "id">) => void;
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
}

export const usePlayerStore = create<Playerstate>((set, get) => ({
  tracks: [],
  currentTrack: null,
  isPlaying: false,

  addTrack: (newTrack) =>
    set((state) => ({
      tracks: [...state.tracks, { ...newTrack, id: crypto.randomUUID() }],
    })),

  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
    }),
  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  nextTrack: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length; // Если трек последний, вернется к первому

    set({
      currentTrack: tracks[nextIndex],
      isPlaying: true,
    });
  },
}));
