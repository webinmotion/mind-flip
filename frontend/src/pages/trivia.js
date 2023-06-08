import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './trivia.module.css';

export default function Trivia() {

    const [activePanel, setPanel] = useState('signUp');

    const toggleSignUp = () => {
        setPanel('signIn');
    };

    const toggleSignIn = () => {
        setPanel('signUp');
    };

    return (
        <Layout title="Trivia" description="Trivia React Page">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3em',
                }}>
                <div className={clsx(styles.container, activePanel === 'signIn'? styles['right-panel-active'] : '')} id="container">
                    <div className={clsx(styles['form-container'], styles['sign-up-container'])}>
                        <form action="#">
                            <h1>Create Account</h1>
                            <div className={styles['social-container']}>
                                <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className={clsx(styles['form-container'], styles['sign-in-container'])}>
                        <form action="#">
                            <h1>Sign in</h1>
                            <div className={styles['social-container']}>
                                <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className={styles['overlay-container']}>
                        <div className={styles.overlay}>
                            <div className={clsx(styles['overlay-panel'], styles['overlay-left'])}>
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button onClick={toggleSignIn} className={styles.ghost} id="signIn">Sign In</button>
                            </div>
                            <div className={clsx(styles['overlay-panel'], styles['overlay-right'])}>
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button onClick={toggleSignUp} className={styles.ghost} id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}