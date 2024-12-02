
import Navigation from "./pages/Navigation"
import { Outlet } from "react-router"
export default function App() {
  return <>
    <div className="flex w-full bg-[#1D2137]">
      <Navigation />
      <Outlet />
    </div>
  </>
}
