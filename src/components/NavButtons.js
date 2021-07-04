const NavButtons = ({ start, end, next, prev, onPage }) => {
    return (
        <div className='d-flex justify-content-center my-2 mt-4'>
            <button
                className={'btn mx-1 btn-sm btn-primary bi bi-arrow-left'}
                onClick={() =>
                    prev ? onPage('last', 'before: "' + start + '"') : null
                }
                disabled={prev ? false : true}
            ></button>
            <button
                className='btn mx-1 btn-sm btn-primary bi bi-arrow-right'
                onClick={() =>
                    next ? onPage('first', 'after: "' + end + '"') : null
                }
                disabled={next ? false : true}
            ></button>
        </div>
    );
};

export default NavButtons;
