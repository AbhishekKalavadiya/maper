import React, {useState} from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { deleteEntry} from '../api/API'
import UpdateModal from './UpdateModal'
import UpdateEntry from './UpdateEntry'

import './TotalEntries.css'

var array = 0

const TotalEntries = ({ totalEntries, onClose }) => {

    const [flag, setFlag] = useState(false)
    const [showButton, setShowButton] = useState(false)


    const toDeleteEntry = async(id) => {

        try {
            console.log(id)
            const deletedEntry = await deleteEntry(id);
            onClose()
            console.log(deletedEntry)
        } catch (error) {
            console.log("can not delete ", error)
        }
    }


    const toUpdateEntry = (id) => {
       
        array = totalEntries.find(entry => 
            entry._id === id
        );

        setShowButton(true)
        setFlag(true)       
    }
    
    return (
        <div className='totalEntries'>
            {
                totalEntries.map(entry => (
                    <>
                    <Card className='totalEntries__card'>
                        <CardContent className='totalEntries__cardContent'>
                            <Typography >
                                <strong>{entry.title}</strong>
                            </Typography>
                            {
                                entry.description && 
                                    <Typography className='totalEntires__description'>
                                        <strong> {'>'} {entry.description}</strong>
                                    </Typography>
                            }
                            <Typography className='totalEntries__rating'> 
                    
                            { entry.rating === 0 
                                ? <p ><strong>Rating:{" "} </strong> 0</p> 
                                : <span className='totalEntries__rating'><strong>Rating: </strong>{" "} 
                                    {
                                        Array(entry.rating)
                                        .fill()
                                        .map((_) => (
                                            <span role="img" aria-label="star" >🌟</span>
                                        ))
                                    }
                                </span>
                             }          
                            </Typography>
                            <Typography>
                                <strong>Visited on:</strong> {new Date(entry.visitDate).toLocaleDateString()}
                            </Typography>
                            {
                                showButton === true ? (   

                                    (array._id === entry._id) && <UpdateModal flag={flag}>
                                        <UpdateEntry entry={entry} id={entry._id} setFlag={setFlag} setShowButton={setShowButton} onClose={onClose}/>
                                    </UpdateModal>    

                                ) : (
                                    <div className='totalEntries__buttons'>
                                        <Typography >
                                            <button className='totalEntries__remove' onClick={() => toDeleteEntry(entry._id)}>Remove</button>
                                        </Typography>
                                        <Typography >
                                            <button className='totalEntries__edit' onClick={() => toUpdateEntry(entry._id)}>Edit</button>
                                        </Typography>
                                        { 
                                            entry.image && <Typography>
                                                    <small>*Click on marker for <strong>image</strong></small> 
                                                </Typography>
                                        }
                                    </div>
                                )
                            }
                        </CardContent>
                    </Card>
                    </>
                ))
            }
        </div>
    )
}

export default TotalEntries
