import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppTopBar from "./AppTopBar";


export default function AppLayout() {
    return (
        <div className="min-h-screen ">
            <div className="flex">
                <AppSidebar />
                <div className="transition-all duration-300 w-full ">
                    <AppTopBar />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
