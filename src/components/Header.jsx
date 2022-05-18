import { Avatar, Button, Container, Grid, Row, Text, Tooltip, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ title, primaryFunction = 'home' }) => {
    const { loginWithGoogle, currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const signUpFunction = async () => {
        try {
            await loginWithGoogle();
        }
        catch {
            console.log(`error faced here.`);
        }
    };


    return (
        <Grid.Container justify='space-between'>
            <Grid>
                <Container>
                    <Link href="/" css={{ color: 'black' }}>
                        <h2>{title} </h2>
                    </Link>
                </Container>
            </Grid>

            <Grid css={{ marginTop: 'auto', marginBottom: 'auto' }}>
                {currentUser ?
                    <Tooltip placement='bottom'
                        content={
                            <Grid.Container>
                                <Row>
                                    <Button
                                        size='md'
                                        onPress={() => { navigate(`/${primaryFunction}`); }}
                                        rounded
                                        css={{
                                            maxHeight: "$space$12",
                                            fs: "$tiny",
                                            fontWeight: "$semibold",
                                            borderColor: "$primary",
                                            color: "$white",
                                        }}
                                    >
                                        {primaryFunction?.toUpperCase()}
                                    </Button>
                                </Row>
                                <Row>
                                    <Button
                                        size='md'
                                        rounded
                                        onPress={logout}
                                        css={{
                                            marginTop: '$5',
                                            maxHeight: "$space$12",
                                            fs: "$tiny",
                                            fontWeight: "$semibold",
                                            borderColor: "$primary",
                                            color: "$white",
                                        }}
                                        color="warning"
                                    >
                                        LOGOUT
                                    </Button>
                                </Row>
                            </Grid.Container>
                        }
                    >
                        <>
                            <Grid.Container>
                                <Grid css={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center' }}>
                                    <Container>
                                        <Text css={{
                                            textGradient: "45deg, $purple600 -20%, $pink600 100%",
                                            cursor: 'pointer'
                                        }}>
                                            {currentUser.displayName}
                                        </Text>
                                    </Container>
                                </Grid>
                                <Grid>

                                    <Avatar
                                        pointer
                                        src={currentUser?.photoURL}
                                        color="gradient"
                                        bordered
                                        size='sm'
                                    />
                                </Grid>
                            </Grid.Container>
                        </>
                    </Tooltip >
                    :
                    <Button onPress={signUpFunction} size='sm' bordered>
                        Login With Google
                    </Button>
                }
            </Grid >
        </Grid.Container >
    );
};

export default Header;;