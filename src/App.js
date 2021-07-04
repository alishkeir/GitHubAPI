import React, { useEffect, useState, useCallback } from 'react';
import GitHub from './components/db';
import gitHubQuery from './components/query';
import RepoInfo from './components/RepoInfo';
import SearchBox from './components/SearchBox';

const App = () => {
    let [repos, setRepos] = useState([]);
    let [pageCount, setPageCount] = useState(10);
    let [queryString, setQueryString] = useState('');
    let [totalCount, setTotalCount] = useState(0);
    let [queryUser, setQueryUser] = useState('alishkeir');

    const getData = useCallback(() => {
        const queryText = JSON.stringify(
            gitHubQuery(pageCount, queryString, queryUser)
        );

        fetch(GitHub.baseURL, {
            method: 'POST',
            headers: GitHub.headers,
            body: queryText,
        })
            .then((res) => res.json())
            .then((data) => {
                const repositories = data.data.search.nodes;
                const total = data.data.search.repositoryCount;
                setRepos(repositories);
                setTotalCount(total);
            })
            .catch((err) => console.log(err));
    }, [pageCount, queryString, queryUser]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className='container mt-5 '>
            <h1 className='text-primary mt-5 mb-5'>
                <i className='bi bi-diagram-2-fill'></i>
                Repositories
            </h1>
            <SearchBox
                totalCount={totalCount}
                pageCount={pageCount}
                queryString={queryString}
                queryUser={queryUser}
                onTotalChange={(myNumber) => {
                    setPageCount(myNumber);
                }}
                onQueryChange={(myString) => {
                    setQueryString(myString);
                }}
                onUserChange={(user) => {
                    setQueryUser(user);
                }}
            />
            {repos && (
                <ul className='list-group list-group-flush mt-5'>
                    {repos.map((repo) => (
                        <RepoInfo key={repo.id} repo={repo} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
