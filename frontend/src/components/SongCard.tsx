import {
    Card,
    CardHeader,
    SongInfo,
    Title,
    Meta,
    ActionButtons,
    CardBottom,
    Detail,
    Label,
    Value,
    GenreBadge,
} from "@/styles/component-styles/SongCard.style";
import { ISong } from "@/types/song";
import { useDispatch } from "react-redux";
import { openEditModal, openDeleteModal } from "@/store/slices/uiSlice";
import { setCurrentSong } from "@/store/slices/songsSlice";

const SongCard = ({ song, index }: { song: ISong; index: number }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setCurrentSong(song));
        dispatch(openEditModal());
    };

    const handleDelete = () => {
        dispatch(setCurrentSong(song));
        dispatch(openDeleteModal());
    };

    const animationDelay = index * 100;

    const animationTypes = ["fade-up", "fade-up", "fade-up", "zoom-in"];
    const animationType = animationTypes[index % animationTypes.length];

    return (
        <Card
            data-aos={animationType}
            data-aos-delay={animationDelay}
            data-aos-duration="600"
            data-aos-easing="ease-out-cubic"
            className="song-card-container"
        >
            <CardHeader>
                <SongInfo>
                    <Title>{song.title}</Title>
                    <Meta>
                        {song.artist} • {song.album}
                    </Meta>
                </SongInfo>
                <ActionButtons>
                    <button
                        className="edit"
                        onClick={handleEdit}
                        title="Edit song"
                    >
                        ✏️
                    </button>
                    <button
                        className="delete"
                        onClick={handleDelete}
                        title="Delete song"
                    >
                        🗑️
                    </button>
                </ActionButtons>
            </CardHeader>

            <CardBottom>
                <Detail>
                    <Label>Year</Label>
                    <Value>{song.year}</Value>
                </Detail>
                <Detail>
                    <Label>Duration</Label>
                    <Value>{song.duration}</Value>
                </Detail>
                <GenreBadge>{song.genre}</GenreBadge>
            </CardBottom>
        </Card>
    );
};

export default SongCard;
