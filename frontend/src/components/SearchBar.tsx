import {
    SearchContainer,
    SearchInput,
    SearchIcon,
    ClearButton,
} from "@/styles/component-styles/SearchBar.style";

const SearchBar = () => {
    return (
        <SearchContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="Search..." />
            <ClearButton>✖</ClearButton>
        </SearchContainer>
    );
};

export default SearchBar;
