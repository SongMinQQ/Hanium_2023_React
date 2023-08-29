import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ShowDatabase from './ShowDatabase';
import ReadPubkey from './ReadPubkey';
import './App.css';

const MenuBar = () => {
    return (
        <div>
            <nav>
                <div>
                    <Link to="/">
                        Data
                    </Link>
                </div>
                <div>
                    <Link to="/logger">
                        Logger
                    </Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<ShowDatabase/>}/>
                <Route path="/logger" element={<ReadPubkey/>}/>
            </Routes>
        </div>
    );
};

export default MenuBar;