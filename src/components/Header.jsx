import React from 'react'

function Header() {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="d-flex">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add new
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;