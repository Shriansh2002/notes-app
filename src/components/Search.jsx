import { Container, Input } from '@nextui-org/react';

const Search = ({ handleSearchNote }) => {
    return (
        <Container style={{ marginBottom: '25px' }}>
            <Input
                bordered
                label='Search All Notes Here'
                size="lg"
                clearable
                placeholder="Type to search ..."
                onChange={(event) => handleSearchNote(event.target.value)}
            />
        </Container>
    );
};

export default Search;