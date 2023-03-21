import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";

function renderPlacesPage(body, onSearchTextChanged) {
    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-red-600 font-semibold text-4xl">Places</h2>
                </div>
                <div className="flex items-center justify-between ">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd" />
                        </svg>
                        <input onChange={onSearchTextChanged} className="bg-grey-50 ml-1 block " type="text" name="" id="" placeholder="search..." />
                    </div>
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Add place</button>
                    </div>
                </div>
            </div>
            {body}
        </div>
    )

}

function PlacesList() {
    const [isLoading, setLoading] = useState(true);
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const endpoint = searchTerm === '' ? '/api/v1/places' : `/api/v1/places?search_term=${searchTerm}`
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setLoadedPlaces(data.places)
            })
    }, [searchTerm])

    function onSearchTextChanged(event) {
        setLoading(true)
        setSearchTerm(event.target.value)
    }

    const centeredStyle = { display: 'flex', alignItems: 'center', flexDirection: 'column' }
    const tableHeaderclassName = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-red-600 uppercase tracking-wider"

    const loadingSection = <div style={centeredStyle}>Loading...</div>
    const dataSection = (
        < div >
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className={tableHeaderclassName}>Name</th>
                                <th className={tableHeaderclassName}>City</th>
                                <th className={tableHeaderclassName}>Recent Upload Speed</th>
                                <th className={tableHeaderclassName}>Recent Upload Speed Units</th>
                                <th className={tableHeaderclassName}>Number of measurements</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadedPlaces.map((place, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {place.name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {place.city}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {place.most_recent_download_speed}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {place.most_recent_download_speed_units}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">
                                                    {place.number_of_measurements}
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )

    return isLoading ? renderPlacesPage(loadingSection, onSearchTextChanged) : renderPlacesPage(dataSection, onSearchTextChanged)
}

const placesList = ReactDOM.createRoot(document.getElementById('page-places'));
placesList.render(<PlacesList />);