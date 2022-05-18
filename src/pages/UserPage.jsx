import { Link, Container, Grid, Row, Text } from '@nextui-org/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const UserPage = () => {
    let { userID } = useParams();

    return (
        <>
            <Container fluid>
                <Header title='User Profile' />

                <Grid.Container>
                    <Container>
                        <Row>
                            <Text h3 css={{ margin: 'auto' }}>
                                {userID}
                                <Text>
                                    <Link href={`mailto:user@mail.com`}>
                                        MAILDI
                                    </Link>
                                </Text>
                            </Text>
                        </Row>

                        <Row>
                            <Text h5>
                                {userID}'s {process.env.REACT_APP_APPLICATION_NAME}
                            </Text>
                        </Row>
                    </Container>


                </Grid.Container>
            </Container>
        </>
    );
};

export default UserPage;