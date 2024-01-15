import style from './pagination.module.css'

function Pagination(props) {
    const { totalItems, currentPage, pageSize, onPageChange} = props
    const totalPages = Math.ceil(totalItems/pageSize)

    const handlePageChange = (newPage) => {
        if (newPage >=1 && newPage <= totalPages) {
            onPageChange(newPage)
        }
    }

    const prev = "<"
    const next = ">"

    return (  
        <div className={style.containerPages}>
            { totalPages > 1 ? <>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    {prev}
                </button>
                <small>{currentPage} of {totalPages}</small>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    {next}
                </button> </>: null
            }
        </div>
    );
}

export default Pagination;