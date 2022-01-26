import { Box } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router";
import Empty from "../components/empty";
import { useHistory } from "../components/HistoryProvider";
import Menu from "../components/menu";
import {
  useCat,
  useId,
  useMenu,
  useProfile,
  useSearch,
} from "../components/MenuProvider";
export default function Category() {
  const params = useParams();
  const [id, setId] = useId();
  const [menu, setMenu] = useMenu();
  const [category, setCategory] = useCat();
  const [search, setSearch] = useSearch();
  const [profile, setProfile] = useProfile();
  const [history, setHistory] = useHistory();
  if (history !== window.location.pathname) {
    setHistory(window.location.pathname);
  }
  if (!menu) {
    setMenu(true);
  }
  if (category !== Number(params.category)) {
    setCategory(Number(params.category));
    setId(0);
  }
  if (search) {
    setSearch(false);
  }
  if (profile) {
    setProfile(0);
  }
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        display: "flex",
        flexDirection: "row",
        maxHeight: "100vh",
      }}
    >
      {!isMobile && <Empty />}
    </Box>
  );
}
