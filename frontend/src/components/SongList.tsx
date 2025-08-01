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
} from "@/styles/component-styles/SongList.style";
import { ISong } from "@/types/song";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SongList = ({
    songs,
    isLoading,
}: {
    songs: ISong[];
    isLoading: boolean;
}) => {
    const { searchQuery } = useSelector((state: RootState) => state.songs);

    if (isLoading) {
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
            <Grid data-aos="fade-up" data-aos-delay="100">
                {songs.map((song, index) => (
                    <SongCard key={song._id} song={song} index={index} />
                ))}
            </Grid>
        </ListContainer>
    );
};

export default SongList;
