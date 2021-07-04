const GitHub = {
    baseURL: 'https://api.github.com/graphql',
    username: 'alishkeir',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY} `,
    },
};

export default GitHub;
