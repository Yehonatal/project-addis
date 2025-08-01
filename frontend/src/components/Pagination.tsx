import {
    PaginationContainer,
    PaginationList,
    PaginationItem,
    PaginationButton,
    PageInfo,
} from "@/styles/component-styles/Pagination.style";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };
    const visiblePages = totalPages > 1 ? getVisiblePages() : [1];

    return (
        <PaginationContainer data-aos="fade-up" data-aos-delay="100">
            <PaginationList data-aos="zoom-in" data-aos-delay="200">
                <PaginationItem>
                    <PaginationButton
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        title="Previous page"
                        data-aos="fade-right"
                        data-aos-delay="300"
                    >
                        ←
                    </PaginationButton>
                </PaginationItem>

                {visiblePages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "..." ? (
                            <PaginationButton
                                disabled
                                data-aos="fade-in"
                                data-aos-delay={400 + index * 50}
                            >
                                ...
                            </PaginationButton>
                        ) : (
                            <PaginationButton
                                active={page === currentPage}
                                onClick={() =>
                                    typeof page === "number" &&
                                    onPageChange(page)
                                }
                                data-aos="fade-in"
                                data-aos-delay={400 + index * 50}
                            >
                                {page}
                            </PaginationButton>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationButton
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        title="Next page"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        →
                    </PaginationButton>
                </PaginationItem>
            </PaginationList>

            <PageInfo data-aos="fade-up" data-aos-delay="500">
                Page {currentPage} of {totalPages}
            </PageInfo>
        </PaginationContainer>
    );
};

export default Pagination;
