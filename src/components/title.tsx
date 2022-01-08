import { Box, Button } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
export default function Title(props:any) {
    return (
        <Box sx={{backgroundColor: 'primary.main', height:'auto'}}>
          <div style={{display: 'flex', flexDirection: 'row', marginLeft: '20px', marginRight: '20px'}}>
          <p style={{color:'#F5BD1F', fontSize: '22px'}}>{props.title}</p>
          <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
            <Button onClick={() => {window.location.href = window.location.href.replace('thread', 'comment')}}>
              <ReplyIcon color="secondary"/>
            </Button>
            </Box>
          </div>
        </Box>)}