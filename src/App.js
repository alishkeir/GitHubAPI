import React, { useEffect, useState, useCallback } from 'react';
import GitHub from './components/db';
import gitHubQuery from './components/query';
import RepoInfo from './components/RepoInfo';
import SearchBox from './components/SearchBox';
import NavButtons from './components/NavButtons';

const App = () => {
    let [repos, setRepos] = useState([]);
    let [pageCount, setPageCount] = useState(10);
    let [queryString, setQueryString] = useState('');
    let [totalCount, setTotalCount] = useState(0);
    let [queryUser, setQueryUser] = useState('alishkeir');

    let [startCursor, setStartCursor] = useState(null);
    let [endCursor, setEndCursor] = useState(null);
    let [hasPrevPage, setHasPrevPage] = useState(false);
    let [hasNextPage, setHasNextPage] = useState(true);
    let [paginationKeyword, setPaginationKeyword] = useState('first');
    let [paginationString, setPaginationString] = useState(' ');

    const getData = useCallback(() => {
        const queryText = JSON.stringify(
            gitHubQuery(
                pageCount,
                queryString,
                queryUser,
                paginationKeyword,
                paginationString
            )
        );

        fetch(GitHub.baseURL, {
            method: 'POST',
            headers: GitHub.headers,
            body: queryText,
        })
            .then((res) => res.json())
            .then((data) => {
                const repositories = data.data.search.edges;
                const total = data.data.search.repositoryCount;
                const start = data.data.search.pageInfo?.startCursor;
                const end = data.data.search.pageInfo?.endCursor;
                const next = data.data.search.pageInfo?.hasNextPage;
                const prev = data.data.search.pageInfo?.hasPreviousPage;

                setRepos(repositories);
                setTotalCount(total);
                setStartCursor(start);
                setEndCursor(end);
                setHasNextPage(next);
                setHasPrevPage(prev);
            })
            .catch((err) => console.log(err));
    }, [
        pageCount,
        queryString,
        queryUser,
        paginationKeyword,
        paginationString,
    ]);

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
                setQueryUser={setQueryUser}
                setPaginationString={setPaginationString}
                setPaginationKeyword={setPaginationKeyword}
            />
            <NavButtons
                start={startCursor}
                end={endCursor}
                next={hasNextPage}
                prev={hasPrevPage}
                onPage={(myKeyword, myString) => {
                    setPaginationKeyword(myKeyword);
                    setPaginationString(myString);
                }}
            />
            {repos && (
                <ul className='list-group list-group-flush mt-5'>
                    {repos.map((repo) => (
                        <RepoInfo key={repo.node.id} repo={repo.node} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
