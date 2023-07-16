import React, { useState, useEffect } from 'react'
import PlayerProfile from '../../../components/NavMenu/PlayerProfile';
import { remoteFetchPlayerById, remoteUpdatePlayerInfo } from '../../../services/account';

function PlayerProfileContainer({ player, accessToken, }) {

    const [profile, setProfile] = useState({
        email_address: player.email_address,
        screen_name: player.screen_name,
        phone_number: '',
        city: '',
        state: '',
        country: '',
    });

    useEffect(() => {
        if (player?.player_id) {
            remoteFetchPlayerById(player?.player_id).then(data => {
                setProfile(data);
            });
        }
    }, [player?.player_id, accessToken]);

    const onUpdateProfile = () => {
        remoteUpdatePlayerInfo(player?.player_id, profile).then(data => console.log('profile updated', data));
    }

    return (
        <PlayerProfile profile={profile} setProfile={setProfile} updateProfile={onUpdateProfile} />
    )
}

export default PlayerProfileContainer