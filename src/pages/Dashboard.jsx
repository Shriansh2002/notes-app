import { Container, Input, Spacer } from "@nextui-org/react";
import Header from '../components/Header';
import UserTable from '../components/Dash-Components/UserTable';


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

            <UserTable />

            <Spacer />

            {/* <UserTable /> */}

        </Container>

    );
}
