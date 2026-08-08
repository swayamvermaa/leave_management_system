import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DisplaySettings from "../components/settings/DisplaySettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import LanguageSettings from "../components/settings/LanguageSettings";
import AboutSettings from "../components/settings/AboutSettings";
import { useNavigate } from "react-router-dom";

import {
  FaDesktop,
  FaBell,
  FaShieldAlt,
  FaLanguage,
  FaInfoCircle,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/settings.css";

function Settings(){

    const [active,setActive]=useState("display");
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("pendingRegistration");

    navigate("/");
    };

    const menus=[
        {
            id:"display",
            title:"Display",
            icon:<FaDesktop/>
        },
        {
            id:"notification",
            title:"Notifications",
            icon:<FaBell/>
        },
        {
            id:"security",
            title:"Security",
            icon:<FaShieldAlt/>
        },
        {
            id:"language",
            title:"Language",
            icon:<FaLanguage/>
        },
        {
            id:"about",
            title:"About",
            icon:<FaInfoCircle/>
        }
    ];

    return(

        <DashboardLayout>

            <div className="settings-page">

                <div className="settings-sidebar">

                    <h3>Settings</h3>

                    {

                        menus.map(menu=>(

                            <button
                            key={menu.id}
                            className={
                                active===menu.id
                                ?
                                "settings-menu active"
                                :
                                "settings-menu"
                            }
                            onClick={()=>setActive(menu.id)}
                            >

                                {menu.icon}

                                <span>{menu.title}</span>

                            </button>

                        ))
                    }
                        <button
                        className="settings-menu settings-logout"
                        onClick={handleLogout}
                        >
                        <FaSignOutAlt />
                        <span>Logout</span>
                        </button>

                </div>

                <div className="settings-content">

                    {active==="display" && <DisplaySettings/>}

                    {active==="notification" && <NotificationSettings/>}

                    {active==="security" && <SecuritySettings/>}

                    {active==="language" && <LanguageSettings/>}

                    {active==="about" && <AboutSettings/>}
                    

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Settings;