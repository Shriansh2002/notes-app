import { Container, Grid, Link, Row, Text, User } from '@nextui-org/react';
import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);

    return (
        <Container fluid>
            <Header title='Profile' />

            <Grid.Container>
                <Grid>
                    <Container>
                        <Row>
                            <User
                                src={currentUser.photoURL}
                                size='3xl'
                                color='error'
                                bordered
                            />
                            <Text h3 css={{ margin: 'auto' }}>
                                {currentUser.displayName}
                                <Text>
                                    <Link href={`mailto:${currentUser.email}`}>
                                        {currentUser.email}
                                    </Link>
                                </Text>
                            </Text>
                        </Row>

                        <Row>
                            <Container>
                                <Text></Text>
                            </Container>
                        </Row>


                    </Container>
                </Grid>
            </Grid.Container>

        </Container >
    );
};

export default ProfilePage;;