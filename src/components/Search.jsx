import { Container, Input } from '@nextui-org/react';

const Search = ({ handleSearchNote }) => {
    return (
        <Container style={{ marginBottom: '25px' }}>
            <Input
                bordered
                label={`Search All ${process.env.REACT_APP_APPLICATION_NAME} Here`}
                size="lg"
                clearable
                placeholder="Type to search ..."
                onChange={(event) => handleSearchNote(event.target.value)}
            />
        </Container>
    );
};

export default Search;