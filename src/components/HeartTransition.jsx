import React, { useEffect, useState, useRef } from 'react'; // 👈 Import useRef
import '../HeartTransition.css';
import { useLocation } from 'react-router';

const HeartTransition = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const isInitialMount = useRef(true); 

    useEffect(() => {
        let isCancelled = false;

        const finishLoadingAfter = (delay) => {
            const minTime = new Promise(res => setTimeout(res, delay));
            const idleTime = new Promise(res => {
                if (typeof window.requestIdleCallback === 'function') {
                    window.requestIdleCallback(res, { timeout: 2000 });
                } else {
                    setTimeout(res, 0);
                }
            });

            Promise.all([minTime, idleTime]).then(() => {
                if (!isCancelled) setLoading(false);
            });
        };

        if (isInitialMount.current) {
            isInitialMount.current = false; 
            finishLoadingAfter(100);

            return () => {
                isCancelled = true;
            };
        }

        setLoading(true);
        finishLoadingAfter(7000);

        return () => {
            isCancelled = true;
        };
    }, [location.pathname]);


    return (
        <>
            {loading && (
                <div className="route-loader">
                    <main className='bg-[#8b0000] HeartTransisitonOpen'>
                        <svg className="heart-loader" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 90 90" version="1.1">
                            <g className="heart-loader__group">
                                <path className="heart-loader__square" strokeWidth="1" fill="none" d="M0,30 0,90 60,90 60,30z" />
                                <path className="heart-loader__circle m--left" strokeWidth="1" fill="none" d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0" />
                                <path className="heart-loader__circle m--right" strokeWidth="1" fill="none" d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0" />
                                <path className="heart-loader__heartPath" strokeWidth="2" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0" />
                            </g>
                        </svg>
                    </main>

                </div>
            )}

            <div style={{ opacity: loading ? 0.3 : 1, transition: "opacity 0.3s ease" }}>
                {children}
            </div>
        </>
    )
}

export default HeartTransition
