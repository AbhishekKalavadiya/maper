import React , { useState, useEffect, useRef, useCallback } from 'react';
import ReactMapGL, {GeolocateControl, Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import { listEntries } from '../api/API'
import EntryForm from './EntryForm'
import TotalEntries from './TotalEntries'

import './Map.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
  };

function Map() {

    const [allEntries, setAllEntries] = useState([])
    const [showPopup, setShowPopup] = useState({})
    const [entryLocation, setEntryLocation] = useState(null)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: "80vh",
        latitude: 20,
        longitude: 60,
        zoom: 2
    });

    const mapRef = useRef()
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    )

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 }

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            })
        },[]
    )

    const getEntries = async() => {
        const newListEntries = await listEntries()
        setAllEntries(newListEntries)
    }

    useEffect(() => {
        getEntries()
    }, [])

    const addEntry = (event) => {

        const [ longitude, latitude ] = event.lngLat;
        setEntryLocation({
            latitude,
            longitude,
        })
        setShowPopup({})       
    }


    return (
        <div className='map'>
            <div className='map__upper'>
                <div className='map__left'>
                    <ReactMapGL
                        ref={mapRef}
                        {...viewport}
                        mapboxApiAccessToken={"pk.eyJ1IjoiYWJoMSIsImEiOiJja2VjbHFoem4wMmljMnJrZjRsbmFvb3VjIn0.Xyik0uOLDrB_JxXxIo2auw"}
                        mapStyle="mapbox://styles/mapbox/outdoors-v11"
                        onViewportChange={handleViewportChange}
                        className='map__gl'
                        onClick={addEntry}
                    
                    >
                        <span className='map__search'>
                            <Geocoder 
                                
                                mapRef={mapRef}
                                onViewportChange={handleGeocoderViewportChange}
                                mapboxApiAccessToken={"pk.eyJ1IjoiYWJoMSIsImEiOiJja2VjbHFoem4wMmljMnJrZjRsbmFvb3VjIn0.Xyik0uOLDrB_JxXxIo2auw"}
                                position='top-left'
                            />
                            
                            <GeolocateControl
                                style={geolocateStyle}
                                positionOptions={{enableHighAccuracy: true}}
                                trackUserLocation={true}
                            />
                        </span>
                        <div className=''>
                            <div className=''>
                            {
                                allEntries.map(({_id, latitude, longitude, title, description, image, rating, visitDate}) => (
                                    <React.Fragment key={_id} >
                                        <Marker
                                            latitude={latitude} 
                                            longitude={longitude} 
                                            offsetLeft={0} 
                                            offsetTop={-30}
                                        >
                                            <div
                                                onClick={()=>setShowPopup({
                                                    [_id]: true,
                                                })}
                                            >
                                                <svg 
                                                    className='map__marker'
                                                    viewBox="0 0 24 24" 
                                                    width="30px" 
                                                    height='30px'
                                                    stroke="red" 
                                                    strokeWidth="1.5" 
                                                    fill="none"
                                                >
                                                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>
                                                </svg>
                                            </div>    
                                        </Marker>
                                        {
                                            showPopup[_id]
                                                ?(<Popup
                                                    className='map__pop'
                                                    latitude={latitude}
                                                    longitude={longitude}
                                                    closeButton={true}
                                                    closeOnClick={false}
                                                    dynamicPosition={true}
                                                    onClose={()=>setShowPopup({})}
                                                    anchor="top" 
                                                >
                                                    <div className='map__popup'>
                                                        {image && <img className='map__popupImage' src={image} alt={title} />}
                                                        <div className='map__info'>
                                                            <h3><strong>{title}</strong></h3>
                                                            
                                                            {description && <p><strong>Description:</strong> {description}</p>}
                                                            <p><strong>Visted on:</strong> {new Date(visitDate).toLocaleDateString()}</p>
                                                            { rating === 0 
                                                                ? <p className='map__infoRating'><strong>Rating:{" "} </strong> 0</p> 
                                                                : <p className='map__infoRating'><strong>Rating: </strong>{" "} 
                                                                    {
                                                                        Array(rating)
                                                                        .fill()
                                                                        .map((_) => (
                                                                            <span role='img' aria-label="star">🌟</span>
                                                                        ))
                                                                    }
                                                                </p>
                                                            }
                                                        </div>
                                                    </div>
                                                </Popup>)     
                                            : null
                                        }
                                    </React.Fragment>
                                ))
                            }
                            </div>
                            <div className="">
                                {
                                    entryLocation ? (
                                        <>
                                            <Marker
                                                latitude={entryLocation.latitude} 
                                                longitude={entryLocation.longitude} 
                                                offsetLeft={0} 
                                                offsetTop={-30}
                                            >
                                                <div>
                                                    <svg 
                                                        className='map__marker'
                                                        viewBox="0 0 24 24" 
                                                        width="35px" 
                                                        height='35px'
                                                        stroke="green" 
                                                        strokeWidth="3" 
                                                        fill="none"
                                                    >
                                                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>
                                                    </svg>
                                                </div>    
                                            </Marker>
                                            
                                        </>
                                    ) : (
                                        null
                                    )

                                }
                            </div>
                        </div>
                    </ReactMapGL>
                </div>  
                <div className='map__right'>   
                    <div className='map_rightHeader'>
                        <h2>Maper Entry</h2>
                        <small>**Click on map at any location to add entry</small>
                        <small><strong>*Click on the Location Mark on map for more details..</strong></small>
                    </div>                
                    <hr className='map__rightHr' />
                    <h3>Add your Visited Place</h3>
                    {
                        entryLocation ? (
                            <div className='map__rightInfo'>
                                
                                <EntryForm 
                                    onClose={()=>{
                                        setEntryLocation(null)
                                        getEntries()
                                    }} 
                                    addEntryLocation={entryLocation}
                                />
                                <button onClick={()=>setEntryLocation(null)} style={{cursor: 'pointer'}}>Cancel</button>
                            </div>
                        ) : null
                    }
                    <hr className='map__rightHr' />
                
                </div>   
            </div>
            <div className='map__down'>
                <h2><u>Your Visted Places</u></h2>
                {allEntries && <TotalEntries 
                    onClose={()=>{
                        getEntries()
                    }}
                    totalEntries={allEntries}/>}
            </div>
        </div>            
    );
}

export default Map