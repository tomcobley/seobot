var params = {
    store_url: 'https://goldenageoftennis.com',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjE2MDE1NDM2NDcsInN1Yl90eXBlIjowLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHBzOi8vZ29sZGVuYWdlb2Z0ZW5uaXMuY29tIl0sImNpZCI6MSwiaWF0IjoxNjAxMzcwODQ3LCJzdWIiOiJiY2FwcC5saW5rZXJkIiwic2lkIjoxMDAxMTU0NTA2LCJpc3MiOiJCQyJ9.y9L5lx3XWp3E-zgAKk5aL7cw8RCFiFO5HS7jIKsxdajRKNSeS9yQFKxXpXv8_edtWPZgnqnkvEUJeukTWwCAtA'
}

console.log(getProductAndSiteInfo(params));

function getProductAndSiteInfo(params) {
    const storeUrl = new URL(params.store_url);

    // Use the store's canonical URL which should always resolve
    const graphQLUrl = `${storeUrl.origin}/graphql`;

    // Set up GraphQL query
    // If specific product IDs were supplied, fetch them, else just get the first few products
    const graphQLQuery = `
        query StaticSiteExample {
          customer {
          	firstName
          	lastName
    	    email
    	  }
          site {
            products${params.product_ids ? `(entityIds:[${params.product_ids}])` : ''} {
              edges {
                product: node {
                  ...ProductFields
                }
              }
            }
            settings {
              storeName
              url {
                vanityUrl
              }
            }
          }
        }
        fragment ProductFields on Product {
          id
          entityId
          name
          sku
          path
          description
          defaultImage {
            img320px: url(width: 320)
            img640px: url(width: 640)
            img960px: url(width: 960)
            img1280px: url(width: 1280)
            altText
          }
          prices {
            price {
              value
              currencyCode
            }
            retailPrice {
              value
              currencyCode
            }
          }
        }`

    // Fetch data from the GraphQL Storefront API
    return fetch(graphQLUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json',
               'Authorization': `Bearer ${params.token}`},
        body: JSON.stringify({ query: graphQLQuery}),
    })
    .then(res => res.json())
    .then(res => res.data);
}
