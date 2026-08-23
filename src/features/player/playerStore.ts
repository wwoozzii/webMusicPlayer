import { create } from "zustand";

const initialValues = {
  tracks: [],
  currentTrack: null,
  isPlaying: false,
  currentVolume: 1,
  currentTime: 0,
  maxTimeCurrentTrack: 0,
  duration: 0,
  seekTime: null,
};

interface Track {
  id: string;
  name: string;
  author: string;
  url: string;
  duration: number;
}

interface Playerstate {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentVolume: number;
  currentTime: number;
  duration: number;
  seekTime: number | null;

  //экшены
  addTrack: (track: Track) => void;
  setCurrentTrack: (track: Track) => void;
  setCurrentVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  togglePlay: () => void;
  toggleTrack: (track: Track) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setDuration: (time: number) => void;
  handleTrackEnded: () => void;
}

export const usePlayerStore = create<Playerstate>((set, get) => ({
  ...initialValues,

  addTrack: (newTrack) =>
    set((state) => ({
      tracks: [...state.tracks, { ...newTrack }],
    })), //принимает массив с url и name из fileUploader и вставляет в массив треков tracks[]

  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
      duration: track.duration,
      isPlaying: true,
      currentTime: 0,
    }),

  setCurrentVolume: (volume) =>
    set({
      currentVolume: volume,
    }),

  setCurrentTime: (time) =>
    set({
      currentTime: time,
    }),

  setDuration: (time: number) =>
    set(() => ({
      duration: time,
    })),

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
        duration: track.duration,
        currentTime: 0,
      };
    }),

  nextTrack: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;
    if (tracks.length <= 1) {
      console.log("oops, it's the only track");
      return;
    }

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;

    const nextTrackItem = tracks[nextIndex];

    set({
      currentTrack: tracks[nextIndex],
      isPlaying: true,
      currentTime: 0,
      duration: nextTrackItem.duration,
    });
  },

  prevTrack: () => {
    const { tracks, currentTrack } = get();
    if (!currentTrack) return;
    if (tracks.length <= 1) {
      console.log("oops, it's the only track");
      return;
    }

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex + tracks.length - 1) % tracks.length;

    const prevTrackItem = tracks[prevIndex];
    set({
      currentTrack: tracks[prevIndex],
      isPlaying: true,
      currentTime: 0,
      duration: prevTrackItem.duration,
    });
  },

  seek(time) {
    set({
      seekTime: time,
      currentTime: time,
    });
  },

  handleTrackEnded: () => {
    const { tracks, togglePlay, nextTrack } = get();
    if (tracks.length <= 1) {
      togglePlay();
    } else {
      nextTrack();
    }
  },
}));
