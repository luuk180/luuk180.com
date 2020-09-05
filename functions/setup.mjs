const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initalizeApp();

import pkg from '@apollo/client';
const { ApolloClient,	InMemoryCache } from pkg;

const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	cache: new InMemoryCache()
});
