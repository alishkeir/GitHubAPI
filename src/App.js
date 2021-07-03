import React, { useEffect, useState, useCallback } from 'react';
import GitHub from './db';
import gitHubQuery from './query';
import RepoInfo from './RepoInfo';

const App = () => {
    let [username, setUsername] = useState('');
    let [repos, setRepos] = useState([]);

    const getData = useCallback(() => {
        fetch(GitHub.baseURL, {
            method: 'POST',
            headers: GitHub.headers,
            body: JSON.stringify(gitHubQuery),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const viewer = data.data.viewer;
                const repositories = data.data.search.nodes;
                setUsername(viewer.name);
                setRepos(repositories);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log(repos);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className='container mt-5 '>
            <h1 className='text-primary'>
                <i className='bi bi-diagram-2-fill'></i>
                Repositories
            </h1>
            <p>Hey There {username} !!</p>

            {repos && (
                <ul className='list-group list-group-flush'>
                    {repos.map((repo) => (
                        <RepoInfo key={repo.id} repo={repo} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
