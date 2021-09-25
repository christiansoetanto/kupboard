import React, { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/auth-context';
import useHttp from '../../hooks/use-http';

const Profile = () => {

    const { isLoading, error, sendRequest: getProfile } = useHttp();
    const ctx = useContext(AuthContext);
    

    useEffect(() => {


        getProfile({ url: "user/"+  ctx.user.userId +"/" }, (returnData) => {
			console.log(returnData)
		});


    }, [])



    return (
        <div>
            Ini menu profile
        </div>
    )
}

export default Profile
