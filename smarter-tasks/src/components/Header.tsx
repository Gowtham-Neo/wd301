const Header = () => {
    return (
      <nav className="py-4 bg-gray-800">
        <div className="px-4 mx-auto">
          <div className="flex justify-between">
            <div className="flex items-center w-1/3">
            <a href="/home" className="ml-6 text-gray-300 hover:text-white">
                Home
              </a>
              <a href="/tasks" className="ml-6 text-gray-300 hover:text-white">
                Tasks
              </a>
            </div>
            <div className="flex items-center justify-center w-1/3">
              <h2 className="text-lg font-bold text-white">Smarter Tasks</h2>
            </div>
            <div className="flex items-center justify-end w-1/3">
              <a href="/signin" className="ml-6 text-gray-300 hover:text-white">
               Signout
              </a>
           </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Header;