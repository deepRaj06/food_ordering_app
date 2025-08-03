import { Redirect, Slot } from 'expo-router';
import React from 'react';

const _Layout = () => {

    const isAuthenticated = true;

    if(!isAuthenticated) return <Redirect href="/sign-in"/>
    // Slot from router render the res of the content as it is 
    // i.e. renders the content of other pages we had
  return <Slot/>
}

export default _Layout