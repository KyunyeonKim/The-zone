// UpdateModalComponent.js

import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from '@material-ui/core';

const UpdateModalComponent = ({isOpen, onClose, onConfirm}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="update-modal-title">
            <DialogTitle id="update-modal-title">확인</DialogTitle>
            <DialogContent>
                <p>변경사항을 저장하시겠습니까?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    취소
                </Button>
                <Button onClick={onConfirm} color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateModalComponent;
