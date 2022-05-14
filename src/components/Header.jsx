import { Grid, User } from '@nextui-org/react';

const Header = () => {
    return (
        <Grid.Container justify='space-between'>
            <Grid>
                <h1>Notes </h1>
            </Grid>

            <Grid css={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <User
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    name="Ariana Wattson"
                    pointer='true'
                />
            </Grid>
        </Grid.Container >
    );
};

export default Header;;