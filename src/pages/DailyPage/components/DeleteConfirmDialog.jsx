import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          //   top: "-200px",
          //   position: "relative",
          borderRadius: 3,
          boxShadow: 4,
          border: "2px solid",
          borderColor: "success.light",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Delete Entry</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this diary entry?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="success"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
