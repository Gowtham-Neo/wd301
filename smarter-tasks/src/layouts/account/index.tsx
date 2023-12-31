import { Outlet } from "react-router-dom"
import Appbar from "./Appbar"

const AccountLayout = () => {

  return (
    <>
      <Appbar />
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout