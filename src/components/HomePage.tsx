import { useState } from "react"
import { loginReturn } from "../interface/loginReturn";
import { confidentifalData } from "../interface/confidentialData";

export const HomePage = () => {

    //state to display confidentail data
    //flag:true display -> data not available 
    const [confidentialData, setConfidentialData] = useState<confidentifalData>({
        flag: true
    });

    //get confidential data
    const getData = async () => {
        const data = await fetch('https://private-route-backend.vercel.app/confi', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({ key: 'value' })
        }).then((res) => res.json())
            .then((jsonData) => {
                return jsonData as loginReturn;
            });

        if (data.success) {
            setConfidentialData(data);
        }


    }

    //logout function
    // const logout = async () => {
    //     await fetch('https://private-route-backend.vercel.app/logout', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json', // Set the content type to JSON
    //         },
    //         body: JSON.stringify({ key: 'value' })
    //     }).then((res) => res.json())
    //         .then(() => {
    //             //authentication() will trigger on refresh 
    //             window.location.reload();
    //         }
    //         );


    // }
    return (<>


        <div className="flex min-h-screen min-w-min justify-center items-center">
            <div className="bg-grey-transparency rounded-2xl m-5 p-5 xl:grid grid-cols-1 items-center gap-4">

                <div className="place-content-center grid gap-4">
                    <div className="text-white font-mono text-2xl">

                        This page is accessible to authenticated users only, and access is further secured by verifying the user's credentials stored in the cookie.
                        Cookie will expire in 2 mintues.
                    </div>
                    {/* Get Confidential data onClick */}
                    <button onClick={getData} className="bg-yellow-300 p-1 rounded-xl w-56 text-lg">
                        View Confidential data
                    </button>
                    {/* Confidential Data Display */}
                    <div>
                        {
                            confidentialData.flag ?
                                (<></>) :

                                (
                                    <div className="text-white font-mono text-xl ">
                                        <p className="font-semibold text-center">JSON Data </p>
                                        <ul>
                                            {Object.entries(confidentialData).map(([key, value]) => (
                                                <li key={key}>
                                                    <strong>{key}:</strong> {value}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="">
                    {/* logout Button */}
                    {/*                     <button onClick={logout} className="bg-yellow-300 p-1  rounded-xl w-20 text-md">
                        Logout
                    </button> */}
                </div>
            </div>
        </div>
    </>)
}
