import { Container, Grid, Text } from '@nextui-org/react';
import React from 'react';
import Header from '../components/Header';

const ProfilePage = () => {
    return (
        <Container fluid>
            <Header title='Profile' />

            <Grid.Container>
                <Grid>
                    <Container>
                        <Text>This is profile page need to be edited ...</Text>
                        Work on Progress...

                    </Container>
                </Grid>
            </Grid.Container>

        </Container >
    );
};

export default ProfilePage;