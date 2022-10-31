import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import { useState } from "react";

interface titleProps {
  text: string;
  color?: string;
}

interface buttonProps {
  text: string;
  color?: string;
  fontColor?: string;
}

interface dialogProps {
  title: titleProps;
  content: string;
  open: boolean;
  confirmButton?: buttonProps;
  cancelButton?: buttonProps;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CustomDialog: React.FC<dialogProps> = (props: dialogProps) => {
  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: `${props.title?.color}` }}
        >
          {props.title.text}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            id="cancel-button"
            onClick={props.onCancel}
            style={{
              backgroundColor: `${props.cancelButton?.color}`,
              color: `${props.cancelButton?.fontColor}`,
            }}
          >
            {props.cancelButton?.text}
          </Button>
          <Button
            id="confirm-button"
            onClick={props.onConfirm}
            style={{
              backgroundColor: `${props.confirmButton?.color}`,
              color: `${props.confirmButton?.fontColor}`,
            }}
          >
            {props.confirmButton?.text}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
