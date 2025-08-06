import {
    Content,
    Icon,
    Title,
    Message,
    SongInfo,
    SongDetails,
    SongTitle,
    ButtonGroup,
    Button,
} from "@/styles/component-styles/DeleteConfirmModal.style";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteModal } from "@/store/slices/uiSlice";
import { deleteSongRequest, clearCurrentSong } from "@/store/slices/songsSlice";
import Modal from "./Modal";
import { RootState } from "@store/store";
import { ISong } from "@/types/song";

const DeleteConfirmModal = () => {
    const dispatch = useDispatch();
    const { isDeleteModalOpen } = useSelector((state: RootState) => state.ui);
    const { currentSong, isLoading } = useSelector<
        RootState,
        { currentSong: ISong | null; isLoading: boolean }
    >((state: RootState) => state.songs);

    const handleClose = () => {
        dispatch(closeDeleteModal());
        dispatch(clearCurrentSong());
    };

    const handleConfirm = () => {
        if (currentSong) {
            dispatch(deleteSongRequest(currentSong._id));
            handleClose();
        }
    };

    return (
        <Modal
            isOpen={isDeleteModalOpen}
            onClose={handleClose}
            title="Delete Song"
        >
            <Content>
                <Icon>🗑️</Icon>
                <Title>Are you sure?</Title>
                <Message>
                    This action cannot be undone. The song will be permanently
                    removed from your collection.
                </Message>

                {currentSong && (
                    <SongInfo>
                        <SongTitle>{currentSong.title}</SongTitle>
                        <SongDetails>
                            by {currentSong.artist} • {currentSong.album} (
                            {currentSong.year})
                        </SongDetails>
                    </SongInfo>
                )}

                <ButtonGroup>
                    <Button
                        type="button"
                        className="secondary"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="danger"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete Song"}
                    </Button>
                </ButtonGroup>
            </Content>
        </Modal>
    );
};

export default DeleteConfirmModal;
