import { ReactInternetSpeedMeter } from 'react-internet-meter'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function NewInternetSpeed() {
    const [testInProgress, setTestInProgress] = useState(false)
    const [downloadSpeeds, setDownloadSpeeds] = useState([])
    const [latestSpeed, setLatestSpeed] = useState(0)
    const [placeName, setPlaceName] = useState('')
    const [placeCity, setPlaceCity] = useState('')
    const [placeAddress, setPlaceAddress] = useState('')
    const navigate = useNavigate()

    const MAX_REQUESTS_NUMBER = 5
    const PING_INTERVAL_MILISECONDS = 1000

    useEffect(() => {
        if (downloadSpeeds.length === MAX_REQUESTS_NUMBER) {
            const API_ENDPOINT = '/api/v1/internet_speeds/create';
            const data = {
                download_units: 'mbps',
                download_speed: downloadSpeeds.reduce((acc, val) => acc + val / downloadSpeeds.length, 0),
                place_name: placeName,
                place_city: placeCity,
                place_address: placeAddress
            }

            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.ok) {
                        navigate("/")
                    } else {
                        // This will stop the speed test.
                        location.reload()
                    }
                })
            setTestInProgress(false)
            setDownloadSpeeds([])
        }
        if (latestSpeed) {
            setDownloadSpeeds(prevDownloadSpeeds => {
                return [...prevDownloadSpeeds, latestSpeed]
            })
        }
    }, [latestSpeed])

    const placeFieldsFilled = [placeCity, placeAddress, placeName].every(fieldValue => fieldValue.length > 0)

    const buttonClasses = `${placeFieldsFilled ? '' : 'cursor-not-allowed'} w-3/4 px-4 py-2 font-bold text-white bg-${placeFieldsFilled ? 'red' : 'gray'}-500 rounded-full hover:bg-${placeFieldsFilled ? 'black' : 'gray'}-500 hover:text-white focus:outline-none focus:shadow-outline`
    return (
        <>
            <div className="bg-white p-8 rounded-md w-full">
                <div className=" flex items-center justify-between pb-6">
                    <div>
                        <h2 className="text-red-600 font-semibold text-4xl">Log Internet Speed</h2>
                    </div>
                </div></div>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full bg-white p-5 rounded-lg lg:rounded-l-none">

                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                                        Place name
                                    </label>
                                    <input
                                        className="border border-black w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="place-name"
                                        type="text"
                                        placeholder="Place name"
                                        onChange={e => setPlaceName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="city">
                                        City
                                    </label>
                                    <input
                                        className="border border-black w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="city"
                                        placeholder="City"
                                        onChange={e => setPlaceCity(e.target.value)}

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">
                                        Address
                                    </label>
                                    <input
                                        className="border border-black w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="address"
                                        placeholder="Address"
                                        onChange={e => setPlaceAddress(e.target.value)}

                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        disabled={!placeFieldsFilled}
                                        className={buttonClasses}
                                        type="button"
                                        onClick={() => setTestInProgress(true)}
                                    >
                                        {testInProgress && 'Testing...'}
                                        {!testInProgress &&
                                            'Start internet speed test'}
                                    </button>
                                </div>
                            </form>
                            {testInProgress &&
                                <div>
                                    <ReactInternetSpeedMeter
                                        txtSubHeading="Internet is too slow"
                                        outputType="alert"
                                        customClassName={null}
                                        txtMainHeading="Opps..."
                                        pingInterval={PING_INTERVAL_MILISECONDS}
                                        thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                                        threshold={0}
                                        imageUrl="https://cdn.speedcheck.org/images/reviews/google-speed-test-mobile.jpg"
                                        downloadSize="157000"  //bytes
                                        callbackFunctionOnNetworkTest={(speed) => setLatestSpeed(speed)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NewInternetSpeed;
