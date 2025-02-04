import React from "react";

interface PaginatorProps {
    lastPage: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ lastPage, currentPage, handlePageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <nav>
            <ul className="pagination">
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                {/* Next Button */}
                <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                    <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;
