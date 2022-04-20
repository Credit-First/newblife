import * as React from 'react';

function LoadingComponent() {
    return (
        <div className='flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm'>
            <div id="loading-container" className='w-[100px] h-[100px] absolute inset-auto'>
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                                floodColor="#fc6767" />
                        </filter>
                    </defs>
                    <circle id="spinner" cx="50" cy="50" r="45" style={{
                        transformOrigin: 'center',
                        animationName: 'loading',
                        animationDuration: '1.2s',
                        animationTimingFunction: 'cubic-bezier',
                        animationIterationCount: 'infinite',
                        fill: 'transparent',
                        stroke: '#dd2476',
                        strokeWidth: 7,
                        strokeLinecap: 'round',
                        filter: 'url(#shadow)',
                    }} />
                </svg>
            </div>
        </div>
    )
}

export default LoadingComponent