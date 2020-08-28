import React from 'react';

import Contacts from '../components/Contacts';
import AddContacts from '../components/AddContacts';

const Home = () => {
    return (
        <div>
            <h1>Hello React</h1>
            <Contacts />
            <AddContacts />
        </div>
    )
}

export default Home;