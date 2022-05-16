import { Avatar, Button, Container, Grid, Text, Tooltip } from '@nextui-org/react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { loginWithGoogle, currentUser, logout } = useAuth();

    const signUpFunction = async () => {
        try {
            await loginWithGoogle();
        }
        catch {
            console.log(`error faced here.`);
        }
    };

    return (
        <Grid.Container justify='space-between' gap={2}>
            <Grid>
                <Container>
                    <h1>Notes </h1>
                </Container>
            </Grid>

            <Grid css={{ marginTop: 'auto', marginBottom: 'auto' }}>
                {currentUser ?
                    <Tooltip placement='bottom'
                        content={
                            <Button
                                size='md'
                                rounded
                                onClick={logout}
                                css={{
                                    maxHeight: "$space$12",
                                    fs: "$tiny",
                                    fontWeight: "$semibold",
                                    borderColor: "$primary",
                                    color: "$white",
                                }}
                                color="warning"
                            >
                                Logout
                            </Button>
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
                                    />
                                </Grid>
                            </Grid.Container>
                        </>
                    </Tooltip>
                    :
                    <Button onClick={signUpFunction} size='sm' bordered>
                        Login With Google
                    </Button>
                }
            </Grid >
        </Grid.Container >
    );
};

export default Header;;