import React from 'react'

const Loader = () => {
    return (
        <div className='col s12' style={{height: '100vh', width:"100vw", position:"absolute", top:0, left:0, zIndex:9999999, backgroundColor: "#00000050", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader