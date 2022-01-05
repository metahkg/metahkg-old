import React from "react";
import { Box } from '@mui/material';
import Comment from "./comment";
import axios from "axios";
export default class Conversation extends React.Component<any> {
    constructor(props:any) {
        super(props);
        this.getdata = this.getdata.bind(this);
        this.build = this.build.bind(this);
    }
    o : JSX.Element[] = [];
    conversation:any = {};
    users:any = {};
    state = {
        ready : false
    }
    async getdata() {
        await axios.get(`/api/thread/${this.props.id}/conversation`).then(res => {
            this.conversation = res.data;
        })
        await axios.get(`/api/thread/${this.props.id}/users`).then(res => {
            this.users = res.data;
        })
        this.setState({ready : true});
    }
    build() {
        Object.entries(this.conversation.conversation).map((entry:any) => {
            this.o.push(
                <Comment name={this.users[entry[1].user].name} 
                        id={entry[0]} 
                        op={this.users[entry[1].user].name === this.conversation.op ? true : false} 
                        sex={this.users[entry[1].user].sex === "male" ? true : false}>
                            {entry[1].comment}</Comment>
            )
        })
    }
    render() {
        if (!this.state.ready) {this.getdata(); return <div/>};
        this.build();
        return (
          <Box sx={{backgroundColor: "primary.dark", width: '80vw'}}>
            {this.o}
          </Box>
        )
    }
}