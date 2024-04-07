import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

// QraphQL의 query를 외부로 분리시킬 수 있다
// query getMovies로 하면 해당 query의 이름이 getMovies로 된다
const ALL_MOVIES = gql`
    query getMovies {
        allMovies {
            id
            title
            poster_path
        }
        allTweets {
            id
            text
            author {
                fullName
            }
        }
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Header = styled.header`
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    height: 45vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;

const MoviesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
    width: 70%;
    position: relative;
    top: -50px;
`;

const PosterContainer = styled(motion.div)`
    height: 400px;
    border-radius: 7px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: transparent;
`;

const PosterBg = styled.div<{ background: string }>`
    background-image: url(${(props) => props.background});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;

const PosterContainerVariant = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.1,
        y: -15,
        transition: {
            duration: 0.2,
        },
    },
};

interface IMovies {
    id: string;
    title: string;
    poster_path: string;
}
interface ITweets {
    id: number;
    text: string;
    author: {
        fullName: string;
    };
}

function Movies() {
    // useEffect를 사용하지 않고 간편하게 가져올 수 있다
    const { data, loading, error } = useQuery(ALL_MOVIES);

    return (
        <Container>
            <Header>
                <Title>Apollo Movies</Title>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            <MoviesGrid>
                {data?.allMovies?.map((movie: IMovies) => (
                    <PosterContainer
                        key={movie.id}
                        variants={PosterContainerVariant}
                        initial="normal"
                        whileHover="hover"
                    >
                        <Link to={`/movies/${movie.id}`}>
                            <PosterBg background={movie.poster_path} />
                        </Link>
                    </PosterContainer>
                ))}
            </MoviesGrid>
        </Container>
    );
}

export default Movies;
