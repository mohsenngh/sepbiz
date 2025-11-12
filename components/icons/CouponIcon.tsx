import React from 'react';

export const CouponIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.625 4.5h-5.25a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18.75v.008m0-13.5v.008" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
    </svg>
);
