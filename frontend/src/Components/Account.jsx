import Header from "./Header";
export default function Account () {
    return(
        <>
            <header
                className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-lg py-4 z-10 text-center text-white">
                <Header/>
            </header>
            <div className='pt-28'>
                <h1>Hello</h1>
            </div>
        </>

    )
}