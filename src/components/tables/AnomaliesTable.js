import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import LanguageIcon from '@material-ui/icons/Language';

import {AnomalyContext} from '../../contexts/anomalies';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
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
        <LanguageIcon onClick={event =>  {window.open(cellData,'_blank' );
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
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
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

  const { anomalies, setPosition, setZoom, setBarValues, barValues, districtPrices } = useContext(AnomalyContext);


  function handleRowClick(event){
    const anomaly = anomalies[event.index];

    const bValues = barValues;
    bValues['anomaly'] = anomaly['monthly_rental_price'];
    bValues['district_median'] = anomaly['neighbors_median'];

    setBarValues(bValues);

    setZoom(12);
    setPosition([anomaly.latitude, anomaly.longitude]);
  }


  return (
    <Paper style={{ height: '100%', width: '95%', marginLeft : 20 }}>
      <VirtualizedTable
        rowCount={anomalies.length}
        rowGetter={({ index }) => anomalies[index]}
        onRowClick={(index) =>  handleRowClick(index)}
        scrollToIndex={45}
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
          
            label: 'Floor',
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
