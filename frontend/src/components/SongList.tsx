import SongCard from "./SongCard";
import LoadingSpinner from "./LoadingSpinner";
import {
    ListContainer,
    LoadingContainer,
    Grid,
    EmptyState,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
} from "@styles/SongList.style";
import { ISong } from "@/types/song";

const SongList = () => {
    const searchQuery = "";

    const songs: Omit<ISong, "id" | "createdAt" | "updatedAt">[] = [
        {
            title: "Bohemian Rhapsody",
            artist: "Queen",
            album: "A Night at the Opera",
            year: 1975,
            genre: "Rock",
            duration: "5:55",
        },
        {
            title: "Hotel California",
            artist: "Eagles",
            album: "Hotel California",
            year: 1976,
            genre: "Rock",
            duration: "6:30",
        },
    ];
    // const songs = [] as ISong[];

    const loading = false;

    if (loading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
            </LoadingContainer>
        );
    }
    if (!songs || songs.length === 0) {
        return (
            <ListContainer>
                <EmptyState
                    data-aos="fade-in"
                    data-aos-duration="800"
                    data-aos-easing="ease-out"
                >
                    <EmptyIcon data-aos="zoom-in" data-aos-delay="200">
                        {searchQuery ? "🔍" : "🎵"}
                    </EmptyIcon>
                    <EmptyTitle data-aos="fade-up" data-aos-delay="400">
                        {searchQuery
                            ? `No songs found for "${searchQuery}"`
                            : "No songs found"}
                    </EmptyTitle>
                    <EmptyDescription data-aos="fade-up" data-aos-delay="600">
                        {searchQuery ? (
                            <>
                                Try searching for a different term, or{" "}
                                <strong>clear your search</strong> to see all
                                songs.
                            </>
                        ) : (
                            <>
                                Start building your music collection by adding
                                your first song!
                            </>
                        )}
                    </EmptyDescription>
                </EmptyState>
            </ListContainer>
        );
    }

    return (
        <ListContainer>
            <Grid>
                {songs.map((song, index) => (
                    <SongCard />
                ))}
            </Grid>
        </ListContainer>
    );
};

export default SongList;
