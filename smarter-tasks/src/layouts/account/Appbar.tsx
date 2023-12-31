import { useState, useContext, Fragment } from 'react'
import { Disclosure, Menu, Transition, Switch } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"
import { ThemeContext } from "../../context/theme";

const userNavigation = [
  { name: 'Profile', href: '#' },
  { name: 'Sign out', href: '/logout' },
]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useContext(ThemeContext)
  const [enabled, setEnabled] = useState(theme === 'dark')

  const toggleTheme = () => {
    let newTheme = ''
    if (theme === 'light') {
      newTheme = 'dark'
    } else {
      newTheme = 'light'
    }
    setEnabled(!enabled)
    setTheme(newTheme)
  }


  const navigation = [
    { name: 'Projects', href: '/account/projects', current: false },
    { name: 'Members', href: '/account/members', current: false },
  ]

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {({ }) => (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8"
                    src={Logo}
                    alt="Smarter Tasks"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = pathname.includes(item.href)

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? 'bg-slate-50 text-blue-700'
                              : 'text-slate-500 hover:text-blue-600',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center ml-4 md:ml-6">
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}
                    className={`${enabled ? 'bg-slate-500' : 'bg-slate-700'}
              relative inline-flex h-[20px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? 'translate-x-8' : 'translate-x-0'}
                pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="p-1 text-gray-400 bg-white rounded-full hover:text-blue-600">
                        <UserCircleIcon className="w-6 h-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>

                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  )
}

export default Appbar;