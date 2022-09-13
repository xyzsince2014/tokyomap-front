declare interface Tweet {
  tweetId: string;
  userId?: number;
  userName: string;
  profileImageUrl: string | null;
  message: string;
  postedAt: string;
  disappearAt: string;
  lat: number;
  lng: number;
}
