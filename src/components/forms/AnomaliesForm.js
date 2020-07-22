import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpIcon from '@material-ui/icons/Help';
import { IconButton } from '@material-ui/core';

import HelpDialog from '../dialogs/HelpDialog'

export default function AnomaliesForm({filters, setFilters}){


    const [helpDialog, setHelpDialog] = useState(false);

    const toggleHelpDialog = () => {
        setHelpDialog(!helpDialog);
    }

    return (
        <>
            
            <Grid container xs={12}>
                <List style={{
                     display: 'flex',
                     flexDirection: 'row',
                     padding: 0,
                     marginLeft : '25px',
                     marginBottom : '10px'
                }}>
                    <ListItem>
                        <IconButton style={{color : 'white'}}>
                            <FilterListIcon/>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                         <IconButton style={{color : 'white'}} onClick={() => toggleHelpDialog()}>
                            <HelpIcon />
                        </IconButton>
                    </ListItem>
                </List>
                <HelpDialog status={helpDialog} toggle={toggleHelpDialog} />
            </Grid>

        </>
    )
}