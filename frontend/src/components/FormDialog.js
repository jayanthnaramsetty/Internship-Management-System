import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import axios from "axios";

class FormDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {

          };
    }

    render() {
        const {open,handleClose,handleDone,isCancel} = this.props;
        return (
            <div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation Dialog"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {' Are you sure you want to update the status of this project?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDone}>Yes</Button>
          <Button onClick={handleClose} autoFocus>No</Button>
        </DialogActions>
      </Dialog>
            </div>
          );
    }
  
}

export default FormDialog;
