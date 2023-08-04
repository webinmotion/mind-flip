import React from 'react';
import clsx from 'clsx';
import styles from './userprofile.module.css';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import profileFaker from "../../repository/profile-faker";

const queryClient = new QueryClient();

function UserProfile(){
    const { isLoading, error, data } = useQuery('repoData', () =>
        profileFaker().then(res => {
            console.log(res.data)
            return res.data;
        })
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <span className={styles.cardContainerPro}>{data.tier}</span>
                <img className={styles.cardContainerAvatar} src={data.avatar}
                     alt="user"/>
                <h3>{data.firstName} {data.lastName}</h3>
                <h6>{data.city}</h6>
                <p>{data.bio}</p>
                <div className={styles.cardContainerButtons}>
                    <button className={styles.primaryButton}>
                        Message
                    </button>
                    <button className={clsx(styles.primaryButton, styles.primaryButtonGhost)}>
                        Following
                    </button>
                </div>
            </div>
        </div>
    )
}
export default function UserProfileContainer() {

    return (
        <QueryClientProvider client={queryClient}>
            <UserProfile />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}