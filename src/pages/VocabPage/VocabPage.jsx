import React, { useState, useEffect } from "react";
import { styled } from "@mui/material";
import { Container, Box, Grid } from "@mui/material";
import VocabBodyProgress from "./component/VocabBodyProgress";
import VocabBodySearch from "./component/VocabBodySearch";
import VocabBodyWord from "./component/VocabBodyWord";
import useReadVocab from "../../hooks/useReadVocab";
import useUpdateVocab from "../../hooks/useUpdateVocab";
import useDeleteVocab from "../../hooks/useDeleteVocab";

const VocabPage = () => {
  //단어목록, 상태변화 훅들 불러오기
  const { vocabList } = useReadVocab();
  const toggleStatusMutation = useUpdateVocab();
  const deleteMutation = useDeleteVocab();

  // 필터, 검색 상태 전용
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  // 필터링, 검색 적용
  useEffect(() => {
    let filtered = vocabList;

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (v) => v.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((v) =>
        v.word.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredList(filtered);
  }, [selectedStatus, searchQuery, vocabList]);

  const emptyMessages = {
    All: "단어를 공부하러 갑시다!",
    mastered: "아직 마스터한 단어가 없습니다!",
    learning: "학습 중인 단어가 없습니다!",
  };

  return (
    <VocabPageContainer>
      <VocabContent maxWidth="xl">
        <VocabLayout>
          {/* 왼쪽 패널: 검색 + 진행률 */}
          <LeftPanel>
            <VocabBodySearch
              setSelectedStatus={setSelectedStatus}
              setSearchQuery={setSearchQuery}
            />
            <VocabBodyProgress
              vocabList={vocabList}
              setSelectedStatus={setSelectedStatus}
            />
          </LeftPanel>

          {/* 오른쪽 패널: 단어 카드들 (스크롤 가능) */}
          <RightPanel>
            <VocabWordList>
              {filteredList.length > 0 ? (
                filteredList.map((vocab) => (
                  <VocabBodyWord
                    key={vocab._id}
                    vocab={vocab}
                    onToggleStatus={() =>
                      toggleStatusMutation.mutate(vocab._id)
                    }
                    onDelete={() => deleteMutation.mutate(vocab._id)}
                  />
                ))
              ) : (
                <VocabBodyWord
                  isPlaceholder
                  vocab={{
                    message:
                      emptyMessages[selectedStatus] || "단어가 없습니다!",
                  }}
                />
              )}
            </VocabWordList>
          </RightPanel>
        </VocabLayout>
      </VocabContent>
    </VocabPageContainer>
  );
};

export default VocabPage;

// Styled Components
const VocabPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "calc(100dvh - 70px)",
  height: "100%",
  padding: "0 6rem",
  backgroundColor: "var(--mui-palette-background-paper)",
  overflowY: "hidden",

  [theme.breakpoints.down("md")]: {
    padding: "0 1rem",
    maxHeight: "none",
    height: "auto",
    overflowY: "auto",
    alignItems: "flex-start",
  },
}));

const VocabContent = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 0),

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1, 0),
    maxWidth: "none",
    width: "100%",
  },
}));

const VocabLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  gap: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "auto",
    gap: theme.spacing(2),
    alignItems: "stretch",
    overflowY: "auto",
    backgroundColor: "var(--mui-palette-background-paper)",
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: "500px",
  height: "100%",
  backgroundColor: "white",
  boxShadow: "0 8px 32px rgba(96, 175, 160, 0.15)",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),

  [theme.breakpoints.down("md")]: {
    flex: "none",
    width: "100%",
    minHeight: "auto",
    height: "auto",
    backgroundColor: "var(--mui-palette-background-paper)",
    boxShadow: "none",
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  maxHeight: "500px",
  height: "100%",
  backgroundColor: "white",
  boxShadow: "0 8px 32px rgba(96, 175, 160, 0.15)",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),

  overflow: "hidden",
  overflowY: "scroll", // 스크롤은 존재
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE 10+
  "&::-webkit-scrollbar": {
    // Chrome, Safari
    display: "none",
  },

  [theme.breakpoints.down("md")]: {
    flex: "none",
    width: "100%",
    maxHeight: "none",
    height: "auto",
    overflow: "visible",
    backgroundColor: "var(--mui-palette-background-paper)",
    boxShadow: "none",
  },
}));

const VocabWordList = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "auto",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflow: "visible",
  paddingRight: theme.spacing(1),
  padding: 0,

  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "var(--app-border)",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "var(--app-chart-1)",
  },

  [theme.breakpoints.down("md")]: {
    height: "auto",
    overflowY: "visible",
    gap: theme.spacing(1.5),
    paddingRight: 0,
  },
}));
