import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {ExclamationCircleIcon} from "@heroicons/react/16/solid";

export default function StatAboutCard() {
    const [username, setUsername] = useState(null)
    const ref = useRef()
    const handleClick = () => {
        axios.post(`https://localhost:8000/api/set_user/${username}`, {
        })
            .then(function (response) {
                console.log('response: ', response)
            })
            .catch(function (error) {
                console.log('error: ', error)
            });
    }
    return (
        <div className="flex flex-col">
            <div className="mr-4 shrink-0">
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 200 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                >
                    <path d="M0 0l200 200M0 200L200 0" strokeWidth={1} vectorEffect="non-scaling-stroke"/>
                </svg>
            </div>
            <div>
                <h4 className="text-lg font-bold">Your Name</h4>
                <p className="mt-1">
                    Email-Pas maybe
                </p>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        defaultValue="adamwathan"
                        id="email"
                        name="username"
                        type="name"
                        placeholder="Your Name"
                        aria-invalid="true"
                        className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm/6"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500"/>
                    </div>
                </div>
                <p id="email-error" className="mt-2 text-sm text-red-600">
                    Not a valid email address.
                </p>
            </div>
        </div>
    )
}
