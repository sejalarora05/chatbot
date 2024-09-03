// DeleteConfirmationDialog.tsx

import React from 'react';

import {

    Dialog,

    DialogActions,

    DialogContent,

    DialogContentText,

    DialogTitle,

    Button,

} from '@mui/material';

interface DeleteConfirmationDialogProps {

    open: boolean;

    onClose: () => void;

    onConfirm: () => void;

    itemToDelete: string; // Name or description of the item to delete

}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({

    open,

    onClose,

    onConfirm,

    itemToDelete,

}) => {

    return (
        <Dialog

            open={open}

            onClose={onClose}

            aria-labelledby="alert-dialog-title"

            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">

                {'Confirm Delete'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                    Are you sure you want to delete {itemToDelete}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">

                    Cancel
                </Button>
                <Button onClick={onConfirm} color="secondary" autoFocus>

                    Delete
                </Button>
            </DialogActions>
        </Dialog>

    );

};

export default DeleteConfirmationDialog;

