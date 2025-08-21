import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

const NewDiaryDialog = ({ open, onClose, selectedDate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 저장 로직 추가 가능
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedDate.format('YYYY-MM-DD')} 일기 작성</DialogTitle>
      <DialogContent>
        <form id="diary-form" onSubmit={handleSubmit}>
          <TextField
            label="제목"
            fullWidth
            margin="normal"
          />
          <TextField
            label="내용"
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button type="submit" form="diary-form" variant="contained" color="success">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewDiaryDialog;