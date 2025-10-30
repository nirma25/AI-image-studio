import React from 'react';

interface IconProps {
    className?: string;
}

export const SparklesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321l5.478.698a.563.563 0 01.31.95l-4.053 3.54a.562.562 0 00-.163.506l1.24 5.385a.563.563 0 01-.844.57l-4.796-2.927a.563.563 0 00-.54 0l-4.796 2.927a.563.563 0 01-.844-.57l1.24-5.385a.562.562 0 00-.163-.506L.26 10.578a.562.562 0 01.31-.95l5.478-.698a.563.563 0 00.475-.321L11.48 3.5z" />
    </svg>
);

export const ScissorsIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.356.054.706.14 1.044M9.384 9.137l6.077 3.509M7.848 15.75l1.536-.887m-1.536.887a3 3 0 10-5.196 3 3 3 0 005.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.356.054-.706.14-1.044m-1.223 2.882l6.077-3.509m-3.894-3.509a3 3 0 115.196-3 3 3 0 01-5.196 3z" />
   </svg>
);


export const UploadIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);