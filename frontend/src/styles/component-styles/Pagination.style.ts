import styled from "@emotion/styled";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-top: 1px solid #e9ecef;
    background: #f8f9fa;
`;

const PaginationList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
`;

const PaginationItem = styled.li`
    display: flex;
`;

const PageInfo = styled.span`
    margin: 0 1rem;
    color: #6c757d;
    font-size: 0.9rem;
    white-space: nowrap;
`;
export { PaginationContainer, PaginationList, PaginationItem, PageInfo };
