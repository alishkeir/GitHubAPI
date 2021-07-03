import React from 'react';

const RepoInfo = ({ repo }) => {
    const subscribed = 'px-1 py-0 ms-1 d-inline-block btn btn-sm btn-success';
    const unsubscribed =
        'px-1 py-0 ms-1 d-inline-block btn btn-sm btn-outline-secondary';
    return (
        <li className='list-group-item' key={repo.id.toString()}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column'>
                    <a
                        className='h5 mb-0 text-decoration-none'
                        href={repo.url}
                        target='_blank'
                        rel='noreferrer'
                    >
                        {repo.name}
                    </a>
                    <p className='small'>{repo.description}</p>
                </div>
                <span
                    className={
                        repo.viewerSubscription === 'SUBSCRIBED'
                            ? subscribed
                            : unsubscribed
                    }
                    style={{
                        fontSize: '.7rem',
                    }}
                >
                    {repo.viewerSubscription}
                </span>
            </div>
        </li>
    );
};

export default RepoInfo;
