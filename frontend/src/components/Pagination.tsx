import {
    PaginationContainer,
    PaginationList,
    PaginationItem,
    PageInfo,
} from "@/styles/component-styles/Pagination.style";
import styled from "@emotion/styled";

const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border: 2px solid #131314;
    border-bottom: 5px solid #131314;

    &:disabled {
        pointer-events: none;
    }
`;

const Pagination = () => {
    return <></>;
};

export default Pagination;
