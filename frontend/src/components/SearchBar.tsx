import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/slices/songsSlice";
import { RootState } from "@/store/store";
import {
    SearchContainer,
    SearchInput,
    SearchIcon,
    ClearButton,
} from "@/styles/component-styles/SearchBar.style";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(
        (state: RootState) => state.songs.searchQuery
    );
    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setSearchQuery(localSearch));
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [localSearch, dispatch]);

    const handleClear = () => {
        setLocalSearch("");
    };

    return (
        <SearchContainer data-aos="zoom-in" data-aos-delay="100">
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
                placeholder="Search songs, artists, albums..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
            />
            {localSearch && (
                <ClearButton
                    onClick={handleClear}
                    data-aos="fade-in"
                    data-aos-duration="200"
                >
                    ✖
                </ClearButton>
            )}
        </SearchContainer>
    );
};

export default SearchBar;
