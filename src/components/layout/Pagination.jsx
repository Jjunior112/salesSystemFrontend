

const Pagination = ({ page, totalPages, onNext, onPrev }) => {
    return (
        <div className="pagination">
            <button onClick={onPrev} disabled={page === 0}>
                Anterior
            </button>
            <span>
                Página {page + 1} de {totalPages}
            </span>
            <button onClick={onNext} disabled={page >= totalPages - 1}>
                Próxima
            </button>
        </div>
    );
};

export default Pagination;