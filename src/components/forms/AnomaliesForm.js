import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpIcon from '@material-ui/icons/Help';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import HelpDialog from '../dialogs/HelpDialog'
import AnomaliesFilterDialog from '../dialogs/AnomaliesFilterDialog'
import AnomalyTestDialog from '../dialogs/AnomalyTestDialog'

export default function AnomaliesForm({filters, setFilters}){


    const [helpDialog, setHelpDialog] = useState(false);
    const [filterDialog, setFilterDialog] = useState(false);
    const [anomalyTestDialog, setAnomalyTestDialog] = useState(false);

    const toggleHelpDialog = () => {
        setHelpDialog(!helpDialog);
    }

    const toggleFilterDialog = () => {
        setFilterDialog(!filterDialog);
    }

    const toggleAnomalyTestDialog = () => {
        setAnomalyTestDialog(!anomalyTestDialog);
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
                    {/* <ListItem>
                        <IconButton style={{color : 'white'}} onClick={() => toggleFilterDialog()}>
                            <FilterListIcon fontSize="small"/>
                        </IconButton>
                    </ListItem> */}
                    <ListItem>
                         <IconButton fontSize="small" style={{color : 'white'}} onClick={() => toggleHelpDialog()}>
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <Button fontSize="small" variant="outlined"  color="secondary"  onClick={() => toggleAnomalyTestDialog()}>
                            Classify
                        </Button>
                    </ListItem>
                </List>

                <AnomaliesFilterDialog status={filterDialog} toggle={toggleFilterDialog} />
                <HelpDialog status={helpDialog} toggle={toggleHelpDialog} />
                <AnomalyTestDialog status={anomalyTestDialog} toggle={toggleAnomalyTestDialog}/>
            </Grid>

        </>
    )
}