//bootstrap
//module
import { ApolloServer } from '@apollo/server'
import { ApolloClient, InMemoryCache, gql, ApolloLink } from '@apollo/client'
import { onError } from 'apollo-link-error'
import 'cross-fetch/polyfill'
import 'babel-polyfill'
import oracledb from 'oracledb'

// beforeAll(async ()=>{
	
// })


describe('Oracle db connection', ()=>{
	
	it('connect', async ()=>{
		const errorLink = onError(({ graphQLErrors }) => {
			if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
		  }) as any

		const client = new ApolloClient({
			uri: 'http://localhost:3020/graphql',
			cache: new InMemoryCache(),	
			link: ApolloLink.from([ errorLink ])
		});		
		await client
		.query({
			query: gql`
				query lecture {
					cotent_no
				}
			`
			,
			variables: {
				
			}
		})
		.then(result => console.log(result))
		.catch(({ message })=>console.log(message));
			
	}, 20000)

})