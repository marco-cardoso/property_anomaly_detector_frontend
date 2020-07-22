import React, {useContext, useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';

import {PageSelectorContext} from '../../contexts/PageSelector'

export default function TitleBar({}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const currentLocation = useLocation();
  const history = useHistory();

  const {pages} = useContext(PageSelectorContext);
  const [currentPageName, setCurrentPageName] = useState("");

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    history.push(pages[index]['path']);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {

    const currentPageKey = pages.filter((key) => {
      console.log(key)
      return key['path'] === currentLocation.pathname
    })[0]

    setCurrentPageName(currentPageKey['title']);

  }, [currentLocation])

  return (
    <>
       <div onClick={handleClickListItem}  style={{
          display : 'inline-flex'
        }} > 
              <AppsIcon  style={{paddingTop : '4px'}} />
               <Typography variant="h5" style={{paddingBottom : '2px', marginLeft : '3px'}}>
                    {currentPageName}
                   
              </Typography>
              <ArrowDropDownIcon  style={{paddingTop : '3px'}}/>
             
        </div>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {pages.map((option, index) => {

          if(option['path'] !== currentLocation.pathname)
          {
              return (
                <MenuItem
                key={option['title']}
                // disabled={index === 0}
                // selected={option['path'] === currentLocation.pathname}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option['title']}
              </MenuItem>
              )
          }
         
        })}
      </Menu>

    </>
  );
}