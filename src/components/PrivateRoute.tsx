import { Outlet } from "react-router"
import { useEffect, useState } from "react";
import { jwtAuthServiceReturn } from "../interface/jwtAuthServiceReturn";
import { Login } from './LoginOrSignUp';

export const PrivateRoute = () => {

    const [showContent, setShowContent] = useState(false);



    function MountedComponent() {
        return Login(true);
    }

    useEffect(() => {
        // fetch call
        fetch('https://private-route-backend.vercel.app/auth', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({ key: 'value' })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return {
                        "success": false,
                        "message": 'error',
                    }
                }

            }
            )
            .then((jsonData: jwtAuthServiceReturn) => {
                if (jsonData.success) {

                    setShowContent(true);
                } else {

                    setShowContent(false);
                }
            });

    }, []); // Empty dependency array ensures useEffect runs once



    /*An <Outlet> is used in parent route elements to render their child route elements. */
    return (
        <div>

            {showContent ? (
                <Outlet />
            ) : (
                !showContent && <MountedComponent />
            )}
        </div>
    );

}