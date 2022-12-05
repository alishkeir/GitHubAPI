import React, { useState } from 'react';

const SearchBox = ({
    totalCount,
    pageCount,
    queryString,
    onTotalChange,
    onQueryChange,
    setQueryUser,
    queryUser,
    setPaginationString,
    setPaginationKeyword,
}) => {
    const [username, setUsername] = useState(queryUser);
    return (
        <div className='d-flex align-items-center bg-light px-3 py-2 small rounded-3 search-bar flex-wrap'>
            <div className='d-flex align-items-center flex-grow-1'>
                <form
                    className='w-100'
                    onSubmit={(e) => {
                        e.preventDefault();
                        setQueryUser(username);
                        setPaginationString('');
                        setPaginationKeyword('first');
                    }}
                >
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='form-control form-control-sm me-2'
                        placeholder='Search for GitHub Usernames'
                    />
                </form>
            </div>

            <div className='d-flex align-items-center flex-grow-1'>
                <input
                    type='text'
                    value={queryString}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className='form-control form-control-sm'
                    placeholder='Search for Repository Name'
                />
            </div>
            <div className='d-flex align-items-center per-page'>
                <label htmlFor='pageCount' className='fw-bold text-secondary'>
                    Per Page:
                </label>
                <input
                    type='number'
                    id='pageCount'
                    value={pageCount}
                    onChange={(e) => onTotalChange(e.target.value)}
                    min='1'
                    className='form-control form-control-sm text-center w-100'
                />
            </div>
            <div>
                <b className='me2 text-secondary'>Total: </b>
                {totalCount}
            </div>
        </div>
    );
};

export default SearchBox;
