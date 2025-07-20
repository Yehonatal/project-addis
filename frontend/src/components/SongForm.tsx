import {
    Form,
    FormGroup,
    Label,
    Input,
    Select,
    ButtonGroup,
    Button,
    ErrorText,
} from "@/styles/component-styles/SongForm.style";

import {
    createSongRequest,
    updateSongRequest,
    clearCurrentSong,
} from "@/store/slices/songsSlice";
import { closeCreateModal, closeEditModal } from "@/store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useState, useEffect } from "react";

const genres: string[] = [
    "Rock",
    "Pop",
    "Hip Hop",
    "Jazz",
    "Classical",
    "Electronic",
    "Country",
    "R&B",
    "Folk",
    "Blues",
    "Reggae",
    "Punk",
    "Metal",
    "Alternative",
    "Indie",
    "Soul",
    "Funk",
    "Disco",
    "House",
    "Techno",
    "Other",
];
import { ISong } from "@/types/song";
import Modal from "@/components/Modal";

const SongForm = () => {
    const dispatch = useDispatch();
    const { isCreateModalOpen, isEditModalOpen } = useSelector(
        (state: RootState) => state.ui
    );
    const { currentSong, isLoading } = useSelector<
        RootState,
        { currentSong: ISong | null; isLoading: boolean }
    >((state: RootState) => state.songs);

    const isOpen = isCreateModalOpen || isEditModalOpen;
    const isEditing = isEditModalOpen && currentSong;

    const [formData, setFormData] = useState<Omit<ISong, "id">>({
        title: "",
        artist: "",
        album: "",
        genre: "Other",
        year: new Date().getFullYear(),
        duration: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isEditing) {
            setFormData({
                title: currentSong.title || "",
                artist: currentSong.artist || "",
                album: currentSong.album || "",
                year: currentSong.year || new Date().getFullYear(),
                genre: currentSong.genre || "Other",
                duration: currentSong.duration || "",
            });
        } else {
            setFormData({
                title: "",
                artist: "",
                album: "",
                genre: "Other",
                year: new Date().getFullYear(),
                duration: "",
            });
        }
    }, [isEditing, currentSong]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.artist.trim()) {
            newErrors.artist = "Artist is required";
        }

        if (!formData.album.trim()) {
            newErrors.album = "Album is required";
        }

        if (
            !formData.year ||
            formData.year < 1900 ||
            formData.year > new Date().getFullYear()
        ) {
            newErrors.year = "Please enter a valid year";
        }

        if (!formData.genre) {
            newErrors.genre = "Genre is required";
        }

        if (!formData.duration.trim()) {
            newErrors.duration = "Duration is required";
        } else if (!/^\d{1,2}:\d{2}$/.test(formData.duration)) {
            newErrors.duration =
                "Duration must be in MM:SS format (e.g., 3:45)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (isEditing) {
            dispatch(
                updateSongRequest({
                    id: currentSong!.id,
                    songData: formData,
                })
            );
            dispatch(closeEditModal());
        } else {
            dispatch(createSongRequest(formData));
            dispatch(closeCreateModal());
        }
    };

    const handleClose = () => {
        if (isCreateModalOpen) {
            dispatch(closeCreateModal());
        } else if (isEditModalOpen) {
            dispatch(closeEditModal());
            dispatch(clearCurrentSong());
        }

        setFormData({
            title: "",
            artist: "",
            album: "",
            genre: "Other",
            year: new Date().getFullYear(),
            duration: "",
        });
        setErrors({});
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditing ? "Edit Song" : "Add New Song"}
        >
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter song title"
                        required
                    />
                    {errors.title && <ErrorText>{errors.title}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="artist">Artist *</Label>
                    <Input
                        id="artist"
                        name="artist"
                        type="text"
                        value={formData.artist}
                        onChange={handleChange}
                        placeholder="Enter artist name"
                        required
                    />
                    {errors.artist && <ErrorText>{errors.artist}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="album">Album *</Label>
                    <Input
                        id="album"
                        name="album"
                        type="text"
                        value={formData.album}
                        onChange={handleChange}
                        placeholder="Enter album name"
                        required
                    />
                    {errors.album && <ErrorText>{errors.album}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="year">Year *</Label>
                    <Input
                        id="year"
                        name="year"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                    {errors.year && <ErrorText>{errors.year}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="genre">Genre *</Label>
                    <Select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a genre</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </Select>
                    {errors.genre && <ErrorText>{errors.genre}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                        id="duration"
                        name="duration"
                        type="text"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 3:45"
                        pattern="\d{1,2}:\d{2}"
                        required
                    />
                    {errors.duration && (
                        <ErrorText>{errors.duration}</ErrorText>
                    )}
                </FormGroup>

                <ButtonGroup>
                    <Button
                        data-aos="fade-right"
                        type="button"
                        className="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        data-aos="fade-left"
                        type="submit"
                        className="primary"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Saving..."
                            : isEditing
                              ? "Update Song"
                              : "Add Song"}
                    </Button>
                </ButtonGroup>
            </Form>
        </Modal>
    );
};

export default SongForm;
