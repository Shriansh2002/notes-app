import { Table, Row, Col, Tooltip, User, Text } from '@nextui-org/react';

import { EyeIcon } from "./EyeIcon";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebaseConfig';

const columns = [
    { name: "NAME", uid: "name" },
    { name: "Creation Time", uid: "creation-time" },
    { name: "Last Sign-In Time", uid: "last-signIn-time" },
    { name: "ACTIONS", uid: "actions" },
];

const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
        case "name":
            return (
                <User squared src={user.photoURL} name={user.displayName} css={{ p: 0 }}>
                    {user.email}
                </User>
            );
        case "creation-time":
            return <StyledBadge type={user.status}>{user.creationTime}</StyledBadge>;
        case "last-signIn-time":
            return <StyledBadge type={user.status}>{user.lastSignInTime}</StyledBadge>;
        case "actions":
            return (
                <Row justify="center" align="center">
                    <Col css={{ d: "flex" }}>
                        <Tooltip content="Details">
                            <IconButton onClick={() => console.log("View user", user.id)}>
                                <EyeIcon size={20} fill="#979797" />
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                        <Tooltip content="Edit user">
                            <IconButton onClick={() => console.log("Edit user", user.id)}>
                                <EditIcon size={20} fill="#979797" />
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                        <Tooltip
                            content="Delete user"
                            color="error"
                            onClick={() => console.log("Delete user", user.id)}
                        >
                            <IconButton>
                                <DeleteIcon size={20} fill="#FF0080" />
                            </IconButton>
                        </Tooltip>
                    </Col>
                </Row>
            );
        default:
            return cellValue;
    }
};

const UserTable = () => {
    const [users, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const runIT = async () => {
        const q = collection(db, 'UsersAVAIL');
        onSnapshot(q, (snapshot) => {
            setUserData(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
    };
    useEffect(() => {
        runIT();
    }, []);

    console.log(users[0]);

    return (
        <>
            {!loading &&
                <>
                    <Text h3>Users</Text>
                    <Table
                        bordered
                        aria-label="Example table with custom cells"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}
                        selectionMode="none"
                    >
                        <Table.Header columns={columns}>
                            {(column) => (
                                <Table.Column
                                    key={column.uid}
                                    align={column.uid === "actions" ? "center" : "start"}
                                >
                                    {column.name}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body items={users}>
                            {users.map((singUser, index) => {
                                return (
                                    <Table.Row key={index}>
                                        {(columnKey) => (
                                            <Table.Cell>
                                                {renderCell(singUser, columnKey)}
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </>
            }
        </>
    );
};

export default UserTable;