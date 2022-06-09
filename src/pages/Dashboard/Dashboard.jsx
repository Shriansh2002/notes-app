import { Container, Input, Spacer } from "@nextui-org/react";
import Header from '../../components/Header';

import NoteTable from './Notes/NoteTable';
// import UserTable from './Users/UserTable';


export default function Dashboard() {
    return (
        <Container fluid>
            <Header admin />

            <Input
                placeholder="Put your Keyword Here"
                width='100%'
                label="Search Here"
            />
            <Spacer />

            <NoteTable />

            <Spacer />

            {/* <UserTable /> */}

        </Container>

    );
}
