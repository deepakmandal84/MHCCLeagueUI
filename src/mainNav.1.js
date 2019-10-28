import React, { Component } from 'react';
import Playerlist from './playerlist.js'
import Card from './cardAuction.js'
import Box from '@material-ui/core/Box';
class mainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<div>
            <h4>Welcome to MHCC Auction</h4>
            <Playerlist/>            
            <div style={{ width: '100%' }}>
            <Box
                display="flex"
                flexWrap="nowrap"
            >
                <Box p={1} bgcolor="grey.300">
                <Card TeamName="Altamont Avengers"/>
                </Box>
                <Box p={1} bgcolor="grey.300">
                <Card TeamName="Questa Lions"/>
                </Box>
                <Box p={1} bgcolor="grey.300">
                <Card TeamName="Cordes Cheetah"/>
                </Box>
                <Box p={1} bgcolor="grey.300">
                <Card TeamName="Bethany Bobcats"/>
                </Box>
                <Box p={1} bgcolor="grey.300">
                <Card TeamName="Hansen Tigers"/>
                </Box>
                <Box p={1} bgcolor="grey.300">
                <Card TeamName="Wicklund Wariors"/>
                </Box>
                
            </Box>
            </div>
        </div> );
    }
}
 
export default mainNav;
