import React, { useEffect, useState } from 'react';

function NewInternetSpeed() {
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
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                        Place name
                                    </label>
                                    <input
                                        className="border border-black w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="place-name"
                                        type="text"
                                        placeholder="Place name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="city">
                                        City
                                    </label>
                                    <input
                                        className="border border-black w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="city"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-3/4 px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-black hover:text-white focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Log
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewInternetSpeed;