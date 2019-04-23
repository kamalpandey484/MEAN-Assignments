import React from 'react';

export default function Student(props){
    const { firstName, lastName } = props.data.name;
    const { branchName, username, email, password } = props.data;
    return (
        <tr>
            <td>{firstName+lastName}</td>
            <td>{branchName}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{password}</td>
        </tr>
    );

}
