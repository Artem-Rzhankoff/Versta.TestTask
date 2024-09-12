import React from 'react';
import {AppBar, Button, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button component={Link} to="/" color="inherit">Главная</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;