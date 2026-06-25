// src/features/player/playerSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  currentTrackUrl: string | null;
  trackName: string | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentTrackUrl: null,
  trackName: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack: (state, action: PayloadAction<{ url: string; name: string }>) => {
      state.currentTrackUrl = action.payload.url;
      state.trackName = action.payload.name;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setTrack, togglePlay } = playerSlice.actions;
export default playerSlice.reducer;
