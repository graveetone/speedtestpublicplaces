import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import React from 'react';
import ReactDOM from "react-dom/client";


// components
import PlacesList from './places_list'
import NewInternetSpeed from './new_internet_speed'

export default function App() {
    return (
        <>
            <h1 className='font-semibold text-8xl text-center'>
                <span className="text-red-600">Public</span>
                <span className="text-black">Internet</span>
            </h1>

            <Router>
                <Routes>
                    <Route path='/' element={<PlacesList />} />
                    <Route path='/new-internet-speed' element={<NewInternetSpeed />} />
                </Routes>
            </Router>
        </>
    )
}

const app = ReactDOM.createRoot(document.getElementById('app'))
app.render(<App />)