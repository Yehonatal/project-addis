import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setSortOrder } from "@/store/slices/songsSlice";
import { RootState } from "@/store/store";
import { ISong } from "@/types/song";
import {
    SortContainer,
    SortLabel,
    SortSelect,
    SortButton,
} from "@/styles/component-styles/SortControls.style";

const SortControls = () => {
    const dispatch = useDispatch();
    const { sortBy, sortOrder } = useSelector(
        (state: RootState) => state.songs
    );

    const sortOptions: { value: keyof ISong; label: string }[] = [
        { value: "title", label: "Title" },
        { value: "artist", label: "Artist" },
        { value: "album", label: "Album" },
        { value: "year", label: "Year" },
        { value: "genre", label: "Genre" },
        { value: "duration", label: "Duration" },
    ];

    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value as keyof ISong));
    };

    const handleSortOrderChange = (order: "asc" | "desc") => {
        dispatch(setSortOrder(order));
    };

    return (
        <SortContainer data-aos="zoom-in" data-aos-delay="200">
            <SortLabel>Sort by:</SortLabel>
            <SortSelect
                value={sortBy}
                onChange={handleSortByChange}
                data-aos="fade-right"
                data-aos-delay="300"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </SortSelect>
            <SortButton
                active={sortOrder === "asc"}
                onClick={() => handleSortOrderChange("asc")}
                data-aos="fade-left"
                data-aos-delay="400"
            >
                ↑ Asc
            </SortButton>
            <SortButton
                active={sortOrder === "desc"}
                onClick={() => handleSortOrderChange("desc")}
                data-aos="fade-left"
                data-aos-delay="500"
            >
                ↓ Desc
            </SortButton>
        </SortContainer>
    );
};

export default SortControls;
