import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table, RowRendererParams } from 'react-virtualized';
import LanguageIcon from '@material-ui/icons/Language';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {AnomalyContext} from '../../contexts/anomalies';

const theme = createMuiTheme({
  overrides: {

    MuiTableCell: {
      'root': {
        "borderBottom" : "1px solid black",
      },
      'body': {
        "color" : "white",
        'borderColor' : 'black',
        'scrollBarColor' : '#0d0e0f'
      },
      'head' : {
        'backgroundColor' : '#232629',
        'color' : '#037bfc'
      }
    }
  }
});


const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  borderColor : '#0d0e0f',
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
    scrollBarColor : '#0d0e0f'
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    // color : 'white',
    // backgroundColor : '#0d0e0f',
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };


  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };


  iconRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        <LanguageIcon   
           onMouseOut={({target})=>target.style.color='white'}  
            onMouseOver={({target})=>target.style.color='#037bfc'}  
            onClick={event =>  {window.open(cellData,'_blank' );
        }}/>
        
      </TableCell>
    );
  };



  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };



  render() {
    const { classes, columns, rowHeight, handleStyle, headerHeight, ...tableProps } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
  
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {

              var renderer = this.cellRenderer;
              if(dataKey === 'details_url'){
                renderer = this.iconRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}

                  flexGrow={1}
                  width={100}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
      </MuiThemeProvider>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,

    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);


export default function AnomaliesTable() {

  const { anomalies, changeMap, changeBarValues, tableIndex, setTableIndex } = useContext(AnomalyContext);

  function handleRowClick(event){
    changeBarValues(event.index);
    changeMap(event.index);
    setTableIndex(event.index);
  }


  function rowStyleFormat(row) {
    if (row.index < 0) return;
    if (tableIndex === row.index) {
      return {
        backgroundColor: 'gray',
        borderTop : '1px solid black',
        color: 'gold !important'
      };
    }
    return {
      backgroundColor: '#232629',
      color: 'gold !important'
    };
  }


  return (
    <Paper style={{ height: '100%', width: '95%', marginLeft : 20, backgroundColor: '#232629'  }}>
      <VirtualizedTable
        rowCount={anomalies.length}
        rowGetter={({ index }) => anomalies[index]}
        onRowClick={(index) =>  handleRowClick(index)}
        scrollToIndex={tableIndex}
        rowStyle={rowStyleFormat}
        columns={[
          {

            label: 'Score',
            dataKey: 'outlier_score',
          },
          {
       
            label: 'District',
            dataKey: 'outcode',
            numeric: true,
          },
          {
           
            label: 'Price',
            dataKey: 'monthly_rental_price',
            numeric: true,
          },
          {
         
            label: 'Type',
            dataKey: 'property_type',
          },
          {
      
            label: 'Furnished',
            dataKey: 'furnished_state',
          },
          {
          
            label: 'Bathrooms',
            dataKey: 'num_bathrooms',
            numeric: true,
          },
          {
          
            label: 'Recepts',
            dataKey: 'num_recepts',
            numeric: true,
          },
          {
          
            label: 'Floors',
            dataKey: 'num_floors',
            numeric: true,
          },
          {
       
            label: 'Bedrooms',
            dataKey: 'num_bedrooms',
            numeric: true,
          },
          {
       
            label: 'Visit',
            dataKey: 'details_url',
            numeric: true
          }
          
        ]}
      />
    </Paper>
  );
}
