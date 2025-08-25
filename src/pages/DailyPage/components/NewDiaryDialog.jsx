import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloudinaryUploadWidget from "../../../util/CloudinaryUploadWidget";
import useDiaryStore from "../../../stores/useDiaryStore";

const NewDiaryDialog = ({ mode, open, onClose }) => {
  const { diaries, isLoading, error, addDiary, selectedDate } = useDiaryStore();

  const InitialFormData = {
    title: "",
    content: "",
    image: "",
    isPublic: true,
    date: selectedDate.toDate(),
  };

  const [formData, setFormData] = useState({ ...InitialFormData });

  const handleSubmit = async(e) => {
    e.preventDefault();
    // 저장 로직 추가 가능
    try {
      if (mode === "new") {
      await addDiary({ ...formData })
    }
    // setFormData(InitialFormData);
    onClose();
    } catch(err) {
      alert("일기 저장 중 오류가 발생했습니다: " + err.message);
    }
  };

  const handleClose = () => {
    //모든걸 초기화시키고;
    setFormData(InitialFormData);
    // 다이얼로그 닫아주기
    onClose();
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const uploadImage = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedDate.format("YYYY-MM-DD")} 일기 작성</DialogTitle>
      <DialogContent>
        <form id="diary-form" onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            id="content"
            label="Write Your Diary"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isPublic} // 초기값 true/false
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPublic: e.target.checked,
                  }))
                }
              />
            }
            label="일기 공개"
          />
        </form>
        <CloudinaryUploadWidget uploadImage={uploadImage} />
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            style={{ marginTop: 10, maxWidth: "100%" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          type="submit"
          form="diary-form"
          variant="contained"
          color="success"
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewDiaryDialog;
