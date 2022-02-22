import React from 'react';
import loading from '../../../../../static/img/Ripple-1s-194px.svg'

function StatementLoading(Component) {
    return function StatementLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <div className="loadingWrapper">
                <img
                    className="loading"
                    src={loading}
                    alt="Loading..."
                />
            </div>
        );
    };
}

export default StatementLoading;