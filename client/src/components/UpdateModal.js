import React from 'react'

function UpdateModal({flag, children}) {

    return (
        <div >
            {
                (flag ) ? (
                    <div> 
                        {children}
                    </div>
                ) : (
                    null
                ) 
            }
        </div>
    )
    
}

export default UpdateModal