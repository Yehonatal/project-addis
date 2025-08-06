export interface ISong {
    _id: string;
    title: string;
    artist: string;
    album: string;
    year: number;
    genre: string;
    duration: string;
    createdAt?: string;
    updatedAt?: string;
}
