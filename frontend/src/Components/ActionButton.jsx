import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ArchiveBoxXMarkIcon, ChevronDownIcon, PencilIcon, Square2StackIcon, TrashIcon} from "@heroicons/react/16/solid";
import {useState, useRef } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from "axios";

export default function ActionButton() {
    let [isOpen, setIsOpen] = useState(false);
    let [isAddProject, setIsAddProject] = useState(false)
    const inputRef = useRef(null)

    const [selectedProject, setSelectedProject] = useState(() => {
        return localStorage.getItem('selectedProject') || null;
    });

    function handleProjectCreate () {
        setIsAddProject(true)
    }


    function handleEdit() {
        setIsOpen(true);
    }

    async function handleSubmit() {
        const editValue = inputRef.current.value;
        if (editValue <= 0) {
            alert("Пожалуйста, введите корректное количество часов.");
            return;
        }
        try {
            if(isOpen) {
                const response = await axios.post("https://localhost:8000/edititem.php", {
                    hours_worked: editValue
                });
                console.log(response.data);
                console.log("editValue:",editValue);
                setIsOpen(false);
            } else if (isAddProject) {
                const response = await axios.post("https://localhost:8000/api/new_project", {
                    title: editValue
                });
                console.log(response.data);
                console.log("project_title:", editValue);
                setIsAddProject(false);
                setIsOpen(false)
            } else {
                alert("Пожалуйста, выберите действие.");
            }
        } catch (error) {
            console.error("Ошибка при редактировании:", error);
        }
    }


    async function handleDelete() {
        setIsOpen(false);
        await axios.post("http://localhost:8000/deleteitem.php", {
            hours_worked: null
        });
    }

    return (
        <>
            <Menu>

                <MenuButton className="transition duration-300 inline-flex items-center gap-2 rounded bg-blue-300 py-2 px-4 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-yellow-600 data-[open]:bg-yellow-600 data-[focus]:outline-1 data-[focus]:outline-white">
                    Options
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-600 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >

                    <MenuItem>
                        <button onClick={handleEdit} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <PencilIcon className="size-4 fill-white/30" />
                            Add time
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button onClick={handleDelete} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <TrashIcon className="size-4 fill-white/30" />
                            Delete
                        </button>
                    </MenuItem>

                    <div className="my-1 h-px bg-white/5" />

                    <MenuItem>
                        <button onClick={handleProjectCreate}
                            className=" group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <ArchiveBoxXMarkIcon className=" size-4 fill-white/30"/>
                            Add project
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button onClick={() => {
                            setSelectedProject(null);
                            localStorage.removeItem('selectedProject');
                        }}
                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <svg className="animate-spin h-5 w-5 text-white/30" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l3 3-3 3v-4a8 8 0 01-8-8z"></path>
                            </svg>
                            Another Project
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button disabled
                                className="disabled:opacity-50 disabled:cursor-not-allowed group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <Square2StackIcon className="size-4 fill-white/30"/>
                            Duplicate
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>

            <Dialog
                open={isOpen || isAddProject}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={() => {
                    setIsOpen(false);
                    setIsAddProject(false);
                }}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-gray-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                {isOpen ? 'Edit Total Hours' : 'Add new Project'}
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white/50">
                                <input ref={inputRef} className='rounded bg-gray-800' placeholder={isOpen ? 'Edit' : 'New Project Name'}/>
                            </p>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}