import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { motion } from "framer-motion";

// getMovie($movieId: String!)에서 $movieId는 JS에서 인자를 전달하기위해 선언
// movie(id: $movieId)에서 $movieId는 서버에 데이터를 전달하기위해 선언
// movie(id: $movieId)와 같이 API를 통해 가져오는 데이터를 remote field라고 한다
// @client를 붙이면 local only field가 되며 apollo cache 내에서만 찾는 데이터이다
const GET_MOVIES = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            id
            title
            poster_path
            vote_average
            overview
            isLiked @client
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const SubtitleContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
`;

const LikeButton = styled.button`
    margin-left: 5px;
`;

const Description = styled.p`
    font-size: 24px;
`;

const Image = styled.div<{ bg: string }>`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;

const Home = styled(motion.div)`
    height: 65px;
    width: 65px;
    position: fixed;
    bottom: 40px;
    left: 40px;
    border-radius: 50%;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 200%;
`;

const HomeVariant = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
        transition: {
            duration: 0.2,
        },
    },
};

function Movie() {
    const { id } = useParams();
    // const client = useApolloClient(); 쓰는 대신  client: { cache }를 추가할 수 있다
    const {
        data,
        loading,
        error,
        client: { cache },
    } = useQuery(GET_MOVIES, {
        variables: {
            movieId: id,
        },
    });

    // fragment MovieFragment on Movie에서 MovieFragment는 자유롭게 변경가능
    // id: `Movie:${id}`-> id를 참조하므로 GET_MOVIES의 movie(id: $movieId)에 id가 있어야한다
    // fragment에서 바꿀 데이터를 선언
    // data에서 무엇으로 바꿀지 설정
    const onClick = () => {
        cache.writeFragment({
            id: `Movie:${id}`,
            fragment: gql`
                fragment MovieFragment on Movie {
                    isLiked
                }
            `,
            data: {
                isLiked: !data.movie.isLiked,
            },
        });
    };

    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
                <SubtitleContainer>
                    <Subtitle>
                        ⭐️ {data?.movie?.vote_average.toFixed(1)}
                    </Subtitle>
                    {/* remote data과 사용하는 방법이 같다 */}
                    <LikeButton onClick={onClick}>
                        {data?.movie?.isLiked ? "👎" : "👍"}
                    </LikeButton>
                </SubtitleContainer>
                <Description>{data?.movie?.overview}</Description>
            </Column>
            <Image bg={data?.movie?.poster_path} />
            <Link to={"/"}>
                <Home
                    variants={HomeVariant}
                    initial="normal"
                    whileHover="hover"
                >
                    <IoHomeOutline />
                </Home>
            </Link>
        </Container>
    );
}

export default Movie;
