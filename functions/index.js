import("./setup.mjs");

client.query({
	query: gql`
	user(login: "luuk180") {
		repositories(orderBy: {field: PUSHED_AT, direction: DESC}, first:99) {
			nodes {
				name
				url
				description
				pushedAt
			}
		}
	}
`}).then(result => console.log(result));
