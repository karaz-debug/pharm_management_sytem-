import React, { useEffect } from 'react';
import Router from 'next/router';

const WithAuth = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                Router.push('/Login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default WithAuth;
