import React from "react"
import { useState, useEffect } from 'react';
import '../components/contact.css';
import Person from "./Person";
import axios from 'axios';
const Contact = () => {
    const [contact_fname, setfName] = useState('')
    const [contact_lname, setlName] = useState('')
    const [contact_phone, setPhone] = useState('')
    const [contact_email, setEmail] = useState('')
    const [contact_dob, setDob] = useState('')
    const [contact_list, setContactList] = useState([])

    const result = { contact_fname, contact_lname, contact_phone, contact_email, contact_dob };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://parkzapass.pythonanywhere.com/all-view/');
            console.log(request)
            setContactList(request.data)
            return request;
        }
        fetchData();
    }, [result])


    const Contact_save = (e) => {
        e.preventDefault();
        console.log('asdas', contact_list);
        console.log(contact_dob, typeof (contact_dob))
        const myArr = contact_dob.split("-");
        if (2021 - myArr[0] > 18) {
            console.log('18+', 2021 - myArr[0], myArr[0])
            if (contact_fname | contact_lname | contact_phone | contact_email | contact_dob) {
                console.log(result)
                axios.post('https://parkzapass.pythonanywhere.com/', result)
                    .then((response) => {
                        console.log('new save' + response);
                        alert('Saved in Database')
                    }).catch((error) => {
                        console.log("some thing went wrong or number already exits" + error)
                        alert('check your number'+error)
                    })
                setfName('')
                setlName('')
                setPhone('')
                setEmail('')
                setDob('')
            }
            else {
                alert("please provide all information correctly")
            }
        }
        else {
            alert("You are not 18+")
        }
    }
    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add new contact</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form method='post'>
                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="floatingInputfname" value={contact_fname} onChange={(e) => setfName(e.target.value)} name='contact_fname' placeholder="Raj"></input>
                                            <label for="floatingInputGrid">First Name</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="floatingInputlname" value={contact_lname} onChange={(e) => setlName(e.target.value)} name='contact_lname' placeholder="Singh"></input>
                                            <label for="floatingInputGrid">Last Name</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" pattern="[6-9]{10}" class="form-control" id="floatingInputPhone" value={contact_phone} onChange={(e) => setPhone(e.target.value)} name='contact_phone' placeholder="9824------"></input>
                                            <label for="floatingInputGrid">Enter Phone No.</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="email" class="form-control" id="floatingInputEmail" value={contact_email} onChange={(e) => setEmail(e.target.value)} name='contact_account_field1' placeholder="abc@gmail.com"></input>
                                            <label for="floatingInputGrid">Enter Email</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="floatingInputPhone" value={contact_dob} onChange={(e) => setDob(e.target.value)} name='contact_account_field2' placeholder="dd/mm/yyyy"></input>
                                            <label for="floatingInputGrid">Enter Phone No.</label>
                                        </div>
                                    </div>
                                </div>
                                {/* <button type='submit' onClick={view_all} name='contact_name'> view all</button> */}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type='submit' onClick={Contact_save} name='contact_name' class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Contact'>
                <div className='display-all'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">DOB</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {contact_list.map(contact => (
                                <Person firstName={contact.contact_fname} lastName={contact.contact_lname} phone={contact.contact_phone} email={contact.contact_email} dob={contact.contact_dob}></Person>
                            ))}

                        </tbody>
                    </table>

                    
                </div>
            </div>
        </>
    )
}

export default Contact;
