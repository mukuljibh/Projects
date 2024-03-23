import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

function Header(props) {
    const name = props.username || 1;
    return (
        <header>
            <h1>
                <HighlightIcon />
                IdeaVault
            </h1>
            <div className="header-stack">
                <Stack className="header-stack" direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{name[0]} </Avatar>
                </Stack>
            </div>
        </header>
    );
}

export default Header;
