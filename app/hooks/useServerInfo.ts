import React, { useState } from 'react';
import { Listing } from '../api/listings/types';

const initialIp = '192.168.178.33'
const initialPort = '9100';
const initialURL = `http://${initialIp}:${initialPort}/`
const initialiseImagePath = `${initialURL}assets/` 

export default function useServerInfo() {
    const [ipAddress, setIPAddess] = useState(initialIp);
    const [port, setPort] = useState(initialPort);
    const [serverURL, setServerURL] = useState(initialURL);

    function getImagePath(listing: Listing){
        return `${initialiseImagePath}${listing.userId}/listing/${listing.listingId}`
    }

    return {ipAddress, port, serverURL, getImagePath}
    
}
