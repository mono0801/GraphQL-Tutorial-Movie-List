import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

/* 아래 코드를 넣어서 브라우저 콘솔에서 정상적으로 Apollo 서버가 연결되어 data 출력되는지 확인
client
    .query({
        query: gql`
            query {
                allMovies {
                    title
                }
            }
        `,
    })
    .then((data) => console.log(data)); */

export default client;
