import React from "react"
import '../components/person.css'

const Person = (props) => {
    return (
        <>
            <tr>
                <td>{props.firstName} {props.lastName}</td>
                <td>{props.phone}</td>
                <td>{props.email}</td>
                <td>{props.dob}</td>
            </tr>
        </>
    )
}

export default Person;
