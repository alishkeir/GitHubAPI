const gitHubQuery = (pageCount, queryString, queryUser) => {
    return {
        query: `
             {
               viewer {
                 name
               }
               search(query: "${queryString} user:${queryUser} sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
                repositoryCount 
                nodes {
                   ... on Repository {
                     name
                     description
                     id
                     url
                     viewerSubscription
                     licenseInfo {
                       spdxId
                     }
                   }
                 }
               }
             } 
          `,
    };
};

export default gitHubQuery;
