import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { useAccount } from "../../hooks/useAccounts"
// components
import Nav from "../../components/nav/Nav"
import Example from "../../components/chess/Example"
import PGNViewer from "../../components/chess/PGNViewer"
import LessonTree from '../../components/lessonTree/LessonTree'
import { AccountsReactComponent } from 'meteor/gwened:meteor-accounts-react'
import {Link} from "react-router-dom"
import Landing  from "./Landing"
const Home = () => {

    const { user, isLoggedIn } = useAccount()
    return (
        <div>

        {isLoggedIn ? 
        <div className="">
            <Nav />
            <div className="bg-blueGray-50">

                <div className=" mx-auto max-w-7xl">
                    <div className=" max-w-7xl mx-auto py-12">
                        {user ?
                            <div>
                                <LessonTree />
                            </div>
                            :
                            <Landing/>
                        }
                    </div>
                </div>

            </div>
        </div>:
        <Landing/>
        // <div className="max-w-3xl shadow-md rounded-lg py-2 px-4 ">
        //                         <Link to="/auth/login">Login</Link>
        //                         <AccountsReactComponent />
        //                     </div>
        
        }

</div>

        
    )
}
export default Home