import { Link, useLocation } from "react-router-dom";
import { Calendar, CalendarPlus2, ClipboardList, Ellipsis, FolderOpenDot, House, Settings } from "lucide-react";

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        {
            to: "/dashboard",
            icon: <House />,
            label: "Dashboard",
        },
        {
            to: "/projects",
            icon: <FolderOpenDot />,
            label: "Projects",
        },
        {
            to: "/settings",
            icon: <Settings />,
            label: "Settings",
        },
    ];

    const calendarItems = [
        {
            to: "",
            icon: <CalendarPlus2 />,
            label: "Events",
        },
        {
            to: "",
            icon: <ClipboardList />,
            label: "Tasks",
        },
        {
            to: "",
            icon: <Ellipsis />,
            label: "Other",
        }
    ];


    return (
        <div className="fixed top-4 left-4 bottom-4 bg-gray-900 rounded-xl flex flex-col items-center py-4 space-y-6 shadow-md w-16
         hover:w-96 transition-all duration-300 ease-in-out z-20 overflow-hidden text-gray-300">
            <aside className="fixed top-4 left-4 bottom-4 w-20 bg-gray-800 rounded-xl flex flex-col items-center py-4 space-y-6 shadow-md">
                <img src="/avatars/bleach.jpg" alt="Profile" className="w-12 h-12 rounded-full border-2 border-white mb-7" />
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`w-10 h-10 mb-4 rounded-md flex justify-center items-center hover:bg-indigo-700 transition ${location.pathname === item.to ? "bg-indigo-700" : "bg-gray-800"
                            }`}
                        title={item.label}
                    >
                        {item.icon}
                    </Link>
                ))}
            </aside>
            <div className="ml-5 flex flex-col flex-grow p-6 space-y-8 rounded-xl">
                <h1 className="text-2xl font-bold text-white">Chronos.sadge</h1>
                <div className="space-y-4">
                    <nav className="grid grid-cols-2 gap-4">
                        {calendarItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex flex-col items-center p-2 text-sm hover:text-white transition`}
                                title={item.label}
                            >
                                <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="mt-1">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <h2 className="text-lg font-medium text-gray-400">Calendars</h2>

                    <nav className="grid grid-cols-2 gap-4">
                        <Link
                            to="/grid"
                            className="flex flex-col items-center p-2 text-sm hover:text-white transition"
                        >
                            <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center">
                                <Calendar color="red" />
                            </div>
                            <span className="mt-1">My calendar</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
