/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CommonDialog = ({ propsObj, children }) => {
  const {
    open,
    setOpen,
    title,
    btnConfirmTitle,
    btnCancelTitle,
    handleSubmit,
  } = propsObj;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="m-3">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions className="mb-3">
          <button
            className="bg-danger border rounded p-2"
            style={{ marginLeft: "12rem", color: "white" }}
            onClick={handleClose}
          >
            {btnCancelTitle}
          </button>
          <button
            className="border rounded p-2"
            style={{ backgroundColor: "#8A2BE2", color: "white" }}
            onClick={handleSubmit}
          >
            {btnConfirmTitle}
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CommonDialog;
