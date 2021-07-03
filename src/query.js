const gitHubQuery = {
    query: `
             {
               viewer {
                 name
               }
               search(query: "user:alishkeir sort:updated-desc", type: REPOSITORY, first: 50) {
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

export default gitHubQuery;
