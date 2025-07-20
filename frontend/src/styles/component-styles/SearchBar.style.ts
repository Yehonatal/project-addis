import styled from "@emotion/styled";

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    max-width: 400px;
    width: 100%;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e9ecef;
    border-radius: 25px;
    font-size: 1rem;
    background: white;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 2px solid #131314;
    border-bottom: 5px solid #131314;
    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
        color: #adb5bd;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 1rem;
    color: #6c757d;
    font-size: 1.1rem;
    pointer-events: none;
    z-index: 1;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background: #f8f9fa;
        color: #495057;
    }
`;

export { SearchContainer, SearchInput, SearchIcon, ClearButton };
