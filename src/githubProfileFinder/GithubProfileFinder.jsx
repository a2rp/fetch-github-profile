import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
// import githubProfile from "github-profile";

const GithubProfileFinder = () => {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = username.trim().length === 0
            ? toast.warn("username is empty")
            : username;

        try {
            const config = {
                url: `https://api.github.com/users/${value}`,
                method: "GET"
            };
            setIsLoading(true);
            setUser(null);
            const response = await axios(config);
            console.log(response, "response");
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (error) {
            // console.log(error, "error");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.title}>Github Profile Finder</div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        label="Enter username here"
                        placeholder="Username"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading
                            ? <CircularProgress sx={{ padding: "5px" }} />
                            : "Search"}
                    </Button>
                </form>

                {user != null && <>
                    <h1 className={styles.userTitle}>User info</h1>
                    <div className={styles.userDetails}>
                        <img src={user.avatar_url} alt="" className={styles.userAvatarURL} />
                        <div className={styles.basicInfo}>
                            <span><b>Id:</b> {user.id}</span>
                            <span><b>Name:</b> {user.name}</span>
                            <span><b>Location:</b> {user.location}</span>
                            <span><b>Login:</b> {user.login}</span>
                            <span><b>Public repos:</b> {user.public_repos}</span>
                            <span className={styles.userBlog}><b>Blog:</b> {user.blog}</span>
                            <span className={styles.htmlURL}><b>HTML URL:</b> {user.html_url}</span>
                            <span className={styles.gihubURL}><b>GitHub URL:</b> {user.url}</span>
                        </div>
                        <div className={styles.userBio}>
                            <b>Bio:</b> {user.bio}
                        </div>
                        <div className={styles.userDate}>
                            <span><b>Created at:</b> {user.created_at}</span>
                            <span><b>Updated at:</b> {user.updated_at}</span>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default GithubProfileFinder

