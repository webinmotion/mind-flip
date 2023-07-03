import React from 'react';
import Layout from '@theme/Layout';
import UserProfile from "../components/UserProfile";

export default function UserProfileView() {

    return (
        <Layout title="User Profile View" description="Demostrating React Query using fake profile">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3em',
                }}>

                <UserProfile />
            </div>
        </Layout>
    );
}