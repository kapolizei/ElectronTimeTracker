import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import axios from "axios";

export default function SelectProject({onProjectSelect}) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(null)
    const [projects, setProjects] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_PATH}/project`,
                    {headers: {'Authorization': process.env.REACT_APP_ACCESS_TOKEN}}
                )
                const data = response.data.projects
                setProjects(data)
                console.log('Projects:',data)
                setSelected(data[0] || null)
            } catch (error) {
                console.error("Ошибка при загрузке данных", error)
            }
        }
        fetchProjects()
    }, [])

    const filteredProjects =
        query === ''
            ? projects
            : projects.filter((project) => project.title.toLowerCase().includes(query.toLowerCase()))

    return (
        <div className="mx-auto w-52 pt-20">
            <Combobox
                value={selected}
                onChange={(value) => {
                    setSelected(value)
                    onProjectSelect(value.id)
                    console.log("Selected project id" ,value.id)
                }}
                onClose={() => setIsFocused(false)}
            >
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border-none bg-gray-600 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        displayValue={(project) => project?.title}
                        onChange={(event) => {
                            setQuery(event.target.value)
                            setIsFocused(true)
                        }}
                        onFocus={() => setIsFocused(true)}
                    />
                    <ComboboxButton
                        className="group absolute inset-y-0 right-0 px-2.5"
                        onClick={() => setIsFocused(!isFocused)}
                    >
                        <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--input-width)] rounded-xl border border-white/5 bg-gray-600 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {filteredProjects.map((project) => (
                        <ComboboxOption
                            key={project.id}
                            value={project}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                            <div className="text-sm/6 text-white">{project.project}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}
