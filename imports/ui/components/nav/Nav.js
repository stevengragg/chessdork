import React from 'react'
import { useAccount } from "../../hooks/useAccounts"

import { Link } from "react-router-dom"
const Nav = () => {
    const { user, isLoggedIn } = useAccount()

    console.log ({user})
    return (
        <div className="w-100  border-b border-blueGray-200  h-16 lg:h-24   px-2">
            <div className="max-w-7xl flex items-center  mx-auto justify-between ">
                <div>
                    <Link to={"/"} className="text-xl ">

                        <img className={` ${false && "animate-wiggle"}  h-16 lg:h-24 w-24 lg:w-32`} src={"/logo/chessDorkBlack.svg"} />
                        </Link>
                </div>
                <div>
                    {user ?
                        <div className=" items-center flex space-x-4">
                           {user && user.profilePicture &&  <img className="h-10 w-10 rounded-full" src={user.profilePicture}/>}
                            <span onClick={() => Meteor.logout()}>Logout</span>
                        </div>
                        :
                        <div className="flex items-center space-x-4">
                            <span>Hola anonimo</span>
                            <Link to="/auth/login" >Login</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Nav