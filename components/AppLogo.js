import React from 'react'

import { Image } from 'react-native';

const AppLogo = () => {
    return (
        <Image style={{height: 50, width:50, margin: 20}}               
        resizeMode="contain"
        source={require('../assets/image/logo_pollination.jpg')} />
    )
}

export default AppLogo;
