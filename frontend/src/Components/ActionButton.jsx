import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ArchiveBoxXMarkIcon, ChevronDownIcon, PencilIcon, Square2StackIcon, TrashIcon} from "@heroicons/react/16/solid";
import {useState, useRef } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from "axios";

export default function ActionButton(props) {
    let [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null)

    function handleEdit() {
        setIsOpen(true);
    }

    async function handleSubmit() {
        const editValue = inputRef.current.value;
        if (isNaN(editValue) || editValue <= 0) {
            alert("Пожалуйста, введите корректное количество часов.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/edititem.php", {
                hours_worked: editValue
            });
            console.log(response.data);
            console.log("editValue:",editValue);
            setIsOpen(false);
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
                        <button className=" group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <ArchiveBoxXMarkIcon className=" size-4 fill-white/30" />
                            Add project
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button disabled className="disabled:opacity-50 disabled:cursor-not-allowed group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <Square2StackIcon className="size-4 fill-white/30" />
                            Duplicate
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-gray-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Edit Total Hours
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white/50">
                                <input ref={inputRef} className='rounded bg-gray-800' placeholder="Edit"/>
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
