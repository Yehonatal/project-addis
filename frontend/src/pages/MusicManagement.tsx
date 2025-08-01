import { useEffect } from "react";
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    AddButton,
    ContentArea,
    StatsBar,
} from "./MusicManagement.style";
import SearchBar from "@components/SearchBar";
import SortControls from "@components/SortControls";
import ThemeSwitcher from "@components/ThemeSwitcher";
import LoadingSpinner from "@/components/LoadingSpinner";
import SongList from "@components/SongList";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@components/Pagination";
import SongForm from "@/components/SongForm";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { openCreateModal, addNotification } from "@/store/slices/uiSlice";
import { RootState } from "@store/store";
import { fetchSongsRequest, setCurrentPage } from "@/store/slices/songsSlice";
import AOS from "aos";

const MusicManagement = () => {
    const dispatch = useDispatch();
    const { songs, pagination, isLoading, error, searchQuery } = useSelector(
        (state: RootState) => state.songs
    );
    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, [dispatch]);

    useEffect(() => {
        AOS.refresh();
    }, [songs]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleAddSong = () => {
        dispatch(openCreateModal());
    };

    // Test notification function (for development)
    // const testNotification = () => {
    //     const types = ["success", "error", "warning", "info"] as const;
    //     const messages = [
    //         "This is a success notification!",
    //         "This is an error notification!",
    //         "This is a warning notification!",
    //         "This is an info notification!",
    //     ];
    //     const randomType = types[Math.floor(Math.random() * types.length)];
    //     const randomMessage = messages[types.indexOf(randomType)];

    //     dispatch(
    //         addNotification({
    //             type: randomType,
    //             message: randomMessage,
    //             duration: 4000,
    //         })
    //     );
    // };

    if (isLoading && !songs.length) {
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    }

    return (
        <Container>
            <Header data-aos="fade-down" data-aos-delay="100">
                <HeaderLeft>
                    <div data-aos="fade-right" data-aos-delay="300">
                        <SearchBar />
                    </div>
                    <div data-aos="fade-right" data-aos-delay="400">
                        <SortControls />
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <div data-aos="fade-left" data-aos-delay="300">
                        <ThemeSwitcher />
                    </div>
                    {/* {process.env.NODE_ENV === "development" && (
                        <div data-aos="fade-left" data-aos-delay="350">
                            <AddButton
                                onClick={testNotification}
                                style={{
                                    background: "#667eea",
                                    fontSize: "0.8rem",
                                    padding: "0.5rem 1rem",
                                }}
                            >
                                Test 🔔
                            </AddButton>
                        </div>
                    )} */}
                    <div data-aos="fade-left" data-aos-delay="400">
                        <AddButton onClick={handleAddSong}>
                            Add New Song
                        </AddButton>
                    </div>
                </HeaderRight>
            </Header>
            {error && <ErrorMessage message={error} />}

            <ContentArea data-aos="fade-up" data-aos-delay="500">
                <StatsBar data-aos="fade-in" data-aos-delay="600">
                    <span>
                        {searchQuery ? (
                            <>
                                Showing {songs.length} of{" "}
                                {pagination.totalItems} songs matching "
                                {searchQuery}"
                            </>
                        ) : (
                            <>
                                Showing {songs.length} of{" "}
                                {pagination.totalItems} songs
                            </>
                        )}
                    </span>
                    <span>
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                </StatsBar>

                <div data-aos="fade-up" data-aos-delay="700">
                    <SongList songs={songs} isLoading={isLoading} />
                </div>
                {pagination.totalPages > 1 && (
                    <div data-aos="fade-up" data-aos-delay="800">
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </ContentArea>
            <SongForm />
            <DeleteConfirmModal />
        </Container>
    );
};

export default MusicManagement;
