import { Box } from '@mui/material';
function Tag(props:any) {
    return (
        <div style={{display: 'flex', fontSize: '20px'}}>
           <p style={{color: props.op ? 'yellow' : 'grey'}}>#{props.id}</p>
           <p style={{color: props.sex ? 'blue' : 'red', marginLeft: '10px'}}>{props.children}</p>
        </div>
    )
}
export default function Comment(props:any) {
    return (
        <Box style={{backgroundColor: 'black', textAlign: 'left'}}>
            <div style={{marginLeft: '20px'}}>
              <Tag op={props.op} sex={props.sex} id={props.id}>{props.name}</Tag>
              <p style={{color: 'white', marginTop: '0px'}}>{props.children}</p>
              <div style={{height: '20px'}}/>
            </div>
        </Box>
    )
}