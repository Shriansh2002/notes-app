import { Avatar, Button, Container, Grid, Tooltip } from '@nextui-org/react';
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
                    <>
                        <Tooltip placement='bottom'
                            content={
                                <Button
                                    auto
                                    rounded
                                    onClick={logout}
                                    css={{
                                        maxHeight: "$space$12",
                                        fs: "$tiny",
                                        fontWeight: "$semibold",
                                        borderColor: "$primary",
                                        color: "$white",
                                    }}
                                    color="error"
                                >
                                    Logout
                                </Button>
                            }
                        >
                            <Avatar
                                pointer
                                src={currentUser?.photoURL}
                                color="gradient"
                                bordered
                            />
                        </Tooltip>
                    </>
                    :
                    <Button onClick={signUpFunction} size='sm'>
                        Login
                    </Button>
                }
            </Grid>
        </Grid.Container >
    );
};

export default Header;;