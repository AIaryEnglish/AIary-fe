import React, { useEffect, useMemo, useState } from "react";
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
import { useCreateDiary } from "../../../hooks/useCreateDiary";
import useSnackbarStore from "../../../stores/useSnackbarStore";
import { useUpdateDiary } from "../../../hooks/useUpdateDiary";

const NewDiaryDialog = ({ mode, open, onClose }) => {
  const { selectedDate, diariesByDate, setAiPending } = useDiaryStore();
  const { mutate: createDiary, isPending } = useCreateDiary();
  const { mutate: updateDiary, isPending: isLoading } = useUpdateDiary();
    const { showError } = useSnackbarStore();
  const ACCENT = "#00BE83";

  const InitialFormData = {
    title: "",
    content: "",
    image: "",
    isPublic: true,
    date: selectedDate.toDate(),
  };

  const dateKey = useMemo(
    () => selectedDate.format("YYYY-MM-DD"),
    [selectedDate]
  );

  const diary = diariesByDate[dateKey] || null;

  const [formData, setFormData] = useState({ ...InitialFormData });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, date: selectedDate.toDate() }));
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 저장 로직 추가 가능
    if (mode == "new") {
      
    if (!formData.title.trim())
      return showError("일기 제목을 작성해주세요.", 3000, {
        vertical: "top",
        horizontal: "center",
      });
    if (!formData.content.trim())
      return showError("일기 내용을 작성해주세요.", 3000, {
        vertical: "top",
        horizontal: "center",
      });   
      createDiary(formData, {
        onSuccess: () => {
          setFormData(InitialFormData);
           setAiPending(true);
          onClose();
        },             
      });
    } else {
      const { title, content, image, isPublic } = formData;
      updateDiary(
        {
          id: diary._id,
          diary: {
            title,
            content,
            image: image || undefined,
            isPublic, 
          },
        },
        {
          onSuccess: () => {
            setFormData(InitialFormData);
            onClose();
          },
        }
      );
    }

  };

  const handleClose = () => {
    if(mode === "new") setFormData(InitialFormData);
    onClose();
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const uploadImage = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  useEffect(() => {
    if (mode === "edit") {
      console.log(diary);
      setFormData({
        title: diary?.title,
        content: diary?.content,
        image: diary?.image,
        isPublic: diary?.isPublic,
      });
    }
  }, [mode, selectedDate]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      Backdrop={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.36)",
          backdropFilter: "blur(2px)",
        },
      }}
      Paper={{
        elevation: 8,
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#e8f5e9",
          color: "#2e7d32",
          fontWeight: 800,
          borderBottom: "1px solid",
          borderColor: "success.light",
        }}
      >
        {selectedDate.format("YYYY-MM-DD")} 일기 작성
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <form id="diary-form" onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleChange}
            input={{ maxLength: 60 }}
          />
          <TextField
            id="content"
            label="Write Your Diary"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={formData.content}
            onChange={handleChange}
          />
          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Checkbox
                checked={formData.isPublic}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, isPublic: e.target.checked }))
                }
                sx={{
                  color: ACCENT,
                  "&.Mui-checked": { color: ACCENT },
                }}
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
            style={{ marginTop: 10, maxWidth: "100%", borderRadius: 8 }}
          />
        )}
      </DialogContent>

      <DialogActions
        sx={{ px: 3, pb: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button onClick={handleClose}>취소</Button>
        <Button
          type="submit"
          form="diary-form"
          variant="contained"
          disabled={isPending}
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 700,
            bgcolor: ACCENT,
            "&:hover": { bgcolor: ACCENT },
          }}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewDiaryDialog;
