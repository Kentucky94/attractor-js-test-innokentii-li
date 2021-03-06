import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterNavLink} from 'react-router-dom'

import SimpleModal from '../UI/Modal/Modal';

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// styles

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 350,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  thead: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tbody: {
    color: 'blue',
    fontWeight: 'bold',
    paddingLeft: '15px',
    width: '100px'
  },
  buttonCell: {
    width: '80px'
  },
  tableName: {
    padding: '15px',
    textTransform: 'capitalize',
    '&:hover': {
      background: 'lightblue'
    }
  }
}));

// sorting mechanism

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

// tablehead component

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => {
          if(headCell.label){
            return (
              <TableCell
                key={headCell.id}
                align={headCell.alignRight ? 'justify' : 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
                className={classes.thead}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          }else if(headCell.isAddButton){
            return (
              <TableCell key={headCell.id} align='right'>
                <IconButton size="medium" component={RouterNavLink} to={headCell.path}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            )
          }else return (
            <TableCell key={headCell.id} align='justify'/>
          )
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// table component

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openTable, setOpenTable] = React.useState(false);

  const {rows, headCells} = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenTable = () => {
    setOpenTable(!openTable);
  };

  let propIdCounter = 0;

  const getPropTableCell = (prop) => {
    if(prop === 0){
      propIdCounter++;
      return <TableCell key={propIdCounter} align='justify' >0</TableCell>;
    }else if(!prop){
      return null;
    }else{
      propIdCounter++;
      return <TableCell key={propIdCounter} align="justify" >{prop}</TableCell>
    }
  };

  const getPropTableCells = row => {
    return Object.keys(row).map(key => {
      if(key.includes('propNum')){
        return getPropTableCell(row[key]);
      }
      return null;
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant='h4' className={classes.tableName} onClick={handleOpenTable}>
          <IconButton size="medium">
            {openTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {props.tableName}
        </Typography>
        <Collapse in={openTable} timeout="auto" unmountOnExit>
          <TableContainer>
            <Table
              className={classes.table}
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell component="th" scope="row" padding="none" className={classes.tbody}>
                          <SimpleModal
                            modalTitle={row.modalTitle}
                            modalImage={row.modalImage}
                            modalContent={row.modalContent}
                          >
                            {row.name}
                          </SimpleModal>
                        </TableCell>
                        {getPropTableCells(row)}
                        <TableCell className={classes.buttonCell} align="right">
                          <IconButton size="medium" component={RouterNavLink} to={row.editPath}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell className={classes.buttonCell} align="right">
                          <IconButton size="medium" onClick={() => row.onDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Collapse>
      </Paper>
    </div>
  );
}
