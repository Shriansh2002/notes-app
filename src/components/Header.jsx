import { Avatar, Button, Grid, Tooltip } from '@nextui-org/react';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

const Header = ({ user }) => {

    const signUpFunction = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err); });
    };

    return (
        <Grid.Container justify='space-between'>
            <Grid>
                <h1>Notes </h1>
            </Grid>

            <Grid css={{ marginTop: 'auto', marginBottom: 'auto' }}>
                {user ?
                    <>
                        <Tooltip placement='bottom'
                            content={
                                <Button
                                    auto
                                    rounded
                                    onClick={signOut(auth)}
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
                                src={user.photoURL}
                                color="gradient"
                                bordered
                            />
                        </Tooltip>
                    </>
                    :
                    <Button onClick={signUpFunction}>
                        Login
                    </Button>
                }
            </Grid>
        </Grid.Container >
    );
};

export default Header;;