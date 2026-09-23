import { useEffect, useState } from "react";
import axios from "axios";
import {
    FiArrowUp,
    FiCode,
    FiCoffee,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiMail,
    FiSearch,
    FiStar,
    FiUsers,
    FiYoutube,
} from "react-icons/fi";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const GithubProfileFinder = () => {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowGoToTop(window.scrollY > 280);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = username.trim();

        if (!value) {
            toast.warn("Enter a GitHub username to search.");
            return;
        }

        setIsLoading(true);
        setUser(null);

        try {
            const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(value)}`);
            setUser(response.data);
        } catch (error) {
            const message = error.response?.status === 404
                ? "That GitHub profile could not be found."
                : "The profile could not be loaded. Try again shortly.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <a href="#home" className={styles.brand} aria-label="GitHub Profile Finder home">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
                    <span>
                        <small>A2RP TOOL</small>
                        GitHub Profile Finder
                    </span>
                </a>
                <a className={styles.headerLink} href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FiGithub />
                    GitHub
                </a>
            </header>

            <main id="home" className={styles.content}>
                <section className={styles.hero}>
                    <span className={styles.eyebrow}><FiSearch /> PROFILE LOOKUP</span>
                    <h1>Find a GitHub profile in seconds.</h1>
                    <p>Search a public username and view the profile details in a clean, focused summary.</p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <TextField
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            label="GitHub username"
                            placeholder="e.g. a2rp"
                            fullWidth
                            size="small"
                            inputProps={{ "aria-label": "GitHub username" }}
                        />
                        <Button type="submit" variant="contained" disabled={isLoading} className={styles.submitButton}>
                            {isLoading ? <CircularProgress size={22} color="inherit" /> : <><FiSearch /> Search</>}
                        </Button>
                    </form>
                </section>

                {user && (
                    <section className={styles.profileCard} aria-live="polite">
                        <div className={styles.profileHeader}>
                            <img src={user.avatar_url} alt={`${user.login} avatar`} className={styles.avatar} />
                            <div>
                                <span className={styles.profileLabel}>PUBLIC PROFILE</span>
                                <h2>{user.name || user.login}</h2>
                                <p>@{user.login}</p>
                            </div>
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className={styles.profileLink}>
                                <FiGithub /> View profile
                            </a>
                        </div>

                        <p className={styles.bio}>{user.bio || "This profile has not added a public bio."}</p>

                        <div className={styles.stats}>
                            <div><FiCode /><strong>{user.public_repos}</strong><span>Repositories</span></div>
                            <div><FiUsers /><strong>{user.followers}</strong><span>Followers</span></div>
                            <div><FiUsers /><strong>{user.following}</strong><span>Following</span></div>
                        </div>

                        <div className={styles.details}>
                            <span><b>Location</b>{user.location || "Not provided"}</span>
                            <span><b>Blog</b>{user.blog ? <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">{user.blog}</a> : "Not provided"}</span>
                            <span><b>Joined</b>{new Date(user.created_at).toLocaleDateString()}</span>
                            <span><b>Updated</b>{new Date(user.updated_at).toLocaleDateString()}</span>
                        </div>
                    </section>
                )}
            </main>

            <footer className={styles.footer}>
                <p>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p>
                <nav aria-label="Social and support links">
                    <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio" title="Portfolio"><FiGlobe /></a>
                    <a href="https://github.com/a2rp" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FiGithub /></a>
                    <a href="https://codepen.io/ash1198" target="_blank" rel="noopener noreferrer" aria-label="CodePen" title="CodePen"><FiCode /></a>
                    <a href="https://www.linkedin.com/in/aashishranjan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FiUsers /></a>
                    <a href="https://www.facebook.com/theash.ashish/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"><FiUsers /></a>
                    <a href="https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube"><FiYoutube /></a>
                    <a href="mailto:ash.ranjan09@gmail.com" aria-label="Email" title="Email"><FiMail /></a>
                    <a href="https://a2rp-donation-page.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Support" title="Support"><FiHeart /></a>
                    <a href="https://buymeacoffee.com/a2rp" target="_blank" rel="noopener noreferrer" aria-label="Buy Me a Coffee" title="Buy Me a Coffee"><FiCoffee /></a>
                    <a href="https://www.patreon.com/a2rp" target="_blank" rel="noopener noreferrer" aria-label="Patreon" title="Patreon"><FiStar /></a>
                </nav>
            </footer>

            {showGoToTop && <button type="button" className={styles.goToTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" title="Scroll to top"><FiArrowUp /></button>}
        </div>
    );
};

export default GithubProfileFinder;
