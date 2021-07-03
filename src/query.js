const gitHubQuery = {
    query: `
           {
             viewer {
               name
             }
             search(query: "user:alishkeir sort:updated-desc", type: REPOSITORY, first: 20) {
               nodes {
                 ... on Repository {
                   name
                   description
                   id
                   url
                   viewerSubscription
                 }
               }
             }
           }
          `,
};

export default gitHubQuery;
