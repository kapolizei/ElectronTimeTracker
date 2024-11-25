/*
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSelector } from "react-redux";

export default function AccountButton() {
    const data = useSelector((state)=> state.data)
    const username = data.user
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex items-center gap-x-1 text-white hover:text-gray-300">
                    Options
                    <ChevronDownIcon aria-hidden="true" className="w-4 h-4 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">{username}</p>
                </div>
                <div className="py-1">
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="#"
                                className={`block px-4 py-2 text-sm ${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                }`}
                            >
                                Account settings
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="#"
                                className={`block px-4 py-2 text-sm ${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                }`}
                            >
                                Support
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <a
                                href="#"
                                className={`block px-4 py-2 text-sm ${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                }`}
                            >
                                License
                            </a>
                        )}
                    </MenuItem>
                </div>
                <div className="py-1">
                    <form action="#" method="POST">
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    type="submit"
                                    className={`block w-full px-4 py-2 text-left text-sm ${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    }`}
                                >
                                    Sign out
                                </button>
                            )}
                        </MenuItem>
                    </form>
                </div>
            </MenuItems>
        </Menu>
    )
}
*/
