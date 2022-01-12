import { Alert, Box } from "@mui/material";
import axios from "axios";
async function logout() {
    await axios.get('/api/logout');
    localStorage.clear();
    window.history.back();}
export default function Logout () {
    logout();
    return (
        <Box style={{backgroundColor: 'primary.dark'}}>
            <div style={{marginTop: '20px'}}>
              <Alert severity="info">Logging you out...</Alert>
            </div>
        </Box>)}