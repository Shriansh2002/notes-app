import { Avatar, Button, Container, Grid, Dropdown, Link, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Header = ({ primaryFunction = 'Home', admin, adminEmailAddresses }) => {
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
                        {currentUser
                            ? <>
                                {admin ?
                                    <Text h2>ADMIN</Text> :
                                    <Text h2>HOME</Text>
                                }
                            </>
                            : <>
                                <Text h2>LOGIN</Text>
                            </>
                        }
                    </Link>
                </Container>
            </Grid>

            <Grid css={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Grid.Container>


                    {currentUser ?
                        <Dropdown placement="bottom-left">
                            <Dropdown.Trigger>
                                <Avatar
                                    pointer
                                    src={currentUser?.photoURL}
                                    color="gradient"
                                    bordered
                                    size='sm'
                                />
                            </Dropdown.Trigger>



                            <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                    <Text b color="inherit" css={{ d: "flex" }}>
                                        Signed in as
                                    </Text>
                                    <Text b color="inherit" css={{ d: "flex" }}>
                                        {currentUser.email}
                                    </Text>
                                </Dropdown.Item>

                                <Dropdown.Item key='primary_function' withDivider>
                                    <Text onClick={() => { navigate(`/${primaryFunction}`); }}>
                                        {primaryFunction.toUpperCase()}
                                    </Text>
                                </Dropdown.Item>

                                {(adminEmailAddresses?.includes(currentUser?.email) || admin) &&
                                    <Dropdown.Item key='admin_dashboard'>
                                        <Text onClick={() => { navigate(`/admin/dashboard`); }}>
                                            Admin Dashboard
                                        </Text>
                                    </Dropdown.Item>
                                }

                                <Dropdown.Item key="logout" color="error" withDivider>
                                    <Text b color='error' onClick={() => logout()}>
                                        Log Out
                                    </Text>
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        <Button onPress={signUpFunction} size='sm' bordered>
                            Login With Google
                        </Button>
                    }

                </Grid.Container>

            </Grid >
        </Grid.Container >
    );
};

export default Header;;