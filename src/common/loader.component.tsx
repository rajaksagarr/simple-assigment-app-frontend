import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}
export default Loader;
