import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";


function PlacesList() {
    const [isLoading, setLoading] = useState(true);
    const [loadedPlaces, setLoadedPlaces] = useState([
        {
            name: "place.name",
            city: "place.city",
            most_recent_download_speed: "place.most_recent_download_speed",
            most_recent_download_speed_units: "place.most_recent_download_speed_units",
            number_of_measurements: "place.number_of_measurements"
        },
        {
            name: "place.named",
            city: "place.city",
            most_recent_download_speed: "place.most_recent_download_speed",
            most_recent_download_speed_units: "place.most_recent_download_speed_units",
            number_of_measurements: "place.number_of_measurements"
        }
    ]);

    useEffect(() => {
        fetch('api/v1/places')
            .then(response => response.json())
            .then(data => {
                setLoadedPlaces(data.places)
                setLoading(false)
            })
    }, [])

    const tableStyle = { border: "1px solid black" }

    const loadingSection = <div style={ {display: 'flex', justifyContent: 'center'} }>Loading...</div>
    const placesSection = (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Recent upload speed</th>
                    <th>Recent upload speed units</th>
                    <th>Number of measurments</th>
                </tr>
            </thead>
            <tbody>
                {loadedPlaces.map((place, index) => {
                    return (
                        <tr key={index}>
                            <td>{place.name}</td>
                            <td>{place.city}</td>
                            <td>{place.most_recent_download_speed}</td>
                            <td>{place.most_recent_download_speed_units}</td>
                            <td>{place.number_of_measurements}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    // const placesSection = (
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>Column 1</th>
    //                 <th>Column 2</th>
    //                 <th>Column 3</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //              loadedPlaces.map((place, index) => {
    //             <tr key={index}>
    //                 <td>{place.name}</td>
    //                 <td>{place.city}</td>
    //                 <td>{place.most_recent_download_speed}</td>
    //                 <td>{place.most_recent_download_speed_units}</td>
    //                 <td>{place.number_of_measurements}</td>
    //             </tr>
    //         </tbody>
    //     </table>

    // )

    if (isLoading) {
        return loadingSection
    }
    return placesSection
}

const placesList = ReactDOM.createRoot(document.getElementById('places-list-container'));
placesList.render(<PlacesList />);