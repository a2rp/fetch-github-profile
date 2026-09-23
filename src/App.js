import React from "react";
import GithubProfileFinder from "./githubProfileFinder";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <GithubProfileFinder />

            <ToastContainer />
        </div>
    );
};

export default App;

