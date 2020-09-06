const fetch = require('node-fetch');
module.exports = async () => {
	gitQuery =
	`query{
			user(login: "luuk180") {
				repositories(orderBy: {field: PUSHED_AT, direction: DESC}, first: 99) {
					nodes {
						name
						description
						url
						pushedAt
						createdAt
					}
				}
			}
		}
	`;

	res = fetch('https://api.github.com/graphql', {
				method: 'POST',
				body: JSON.stringify({gitQuery}),
				headers: {
					Authorization: `Bearer f47b904afb5eafafb30191f72e50e21298fab2fc`,
				}
	});

	return res.JSON();
}

// GitHub Personal Access Token:
// f47b904afb5eafafb30191f72e50e21298fab2fc
