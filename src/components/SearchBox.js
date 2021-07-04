import React, { useState } from 'react';

const SearchBox = ({
    totalCount,
    pageCount,
    queryString,
    onTotalChange,
    onQueryChange,
    onUserChange,
    queryUser,
}) => {
    const [username, setUsername] = useState(queryUser);
    return (
        <div className='d-flex align-items-center bg-light px-3 py-2 small rounded-3'>
            <div className='d-flex align-items-center flex-grow-1'>
                <form
                    className='w-100 me-2'
                    onSubmit={(e) => {
                        e.preventDefault();
                        onUserChange(username);
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
                    className='form-control form-control-sm  me-2'
                    placeholder='Search for Repository Name'
                />
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <label
                    htmlFor='pageCount'
                    className='me-3 fw-bold text-secondary'
                >
                    Per Page:
                </label>
                <input
                    type='number'
                    id='pageCount'
                    value={pageCount}
                    onChange={(e) => onTotalChange(e.target.value)}
                    min='1'
                    className='form-control form-control-sm text-center me-2 w-50'
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
