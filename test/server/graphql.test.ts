import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import 'cross-fetch/polyfill';
import 'babel-polyfill';

it('Server return list', async (done) => {
    const client = new ApolloClient({
        uri: 'http://localhost:3020/graphql',
        cache: new InMemoryCache(),
    });

    const { error, data } = await client.query({
        query: gql`
            query list {
                users {
                    id
                    email
                    photo {
                        photo_no
                        image_path
                    }
                }
            }
        `,
    });

    expect(error).toBeFalsy();
    done();
}, 10000);
