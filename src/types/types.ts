export interface Track {
  id: number;
  name: string;
  url: string;
  time: string;
}

export interface Playlist {
  id: string;
  title: string;
  trackIds: string[];
  coverUrl: string | null;
}
