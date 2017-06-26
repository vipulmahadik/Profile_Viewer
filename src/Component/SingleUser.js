/**
 * Created by admin on 6/11/17.
 */
import React, {Component} from 'react';
import $ from 'jquery';
import './SingleUser.css'
import {data2} from '../json/vipul';
import key from '../json/keys';
import Repos from './Repos';

class SingleUser extends Component{

    constructor(){
        super();
        this.state = {
            data:"",
            found:false
        }
    }

    update(newProps){

        let url = newProps.user;
        console.log("Got new");
        let op=null;
        $.ajax({
            url: url+`?&access_token=${key}`,
            dataType: 'json',
            success: (response) => {
                console.dir(response);

                this.setState({found:true,
                    op:<div className="contents">
                        <div className="row">
                            <div className="img-div">
                                <img className="prof" src={response.avatar_url} alt=""/>
                            </div>
                            <div className="info-div-name">
                                <p className="title">{response.name}</p>
                            </div>
                        </div>

                        <div className="info-div">
                            <table>
                                <tbody>
                                <tr><td><strong>Github Profile: </strong></td><td><a target="_blank" href={response.html_url}>{response.html_url}</a></td></tr>
                                <tr><td><strong>Location: </strong></td><td>{response.location}</td></tr>
                                <tr><td><strong>Company: </strong></td><td>{response.company}</td></tr>
                                <tr><td><strong>Blog: </strong></td><td><a target="_blank" href={response.blog}>{response.blog}</a></td></tr>
                                <tr><td><strong>Bio: </strong></td><td>{response.bio} </td></tr>
                                <tr><td><strong>Public Repo: </strong></td><td>{response.public_repos}</td></tr>
                                <tr><td><strong>Public Gist: </strong></td><td>{response.public_gists}</td></tr>
                                <tr><td><strong>Followers: </strong></td><td>{response.followers} </td></tr>
                                <tr><td><strong>Following: </strong></td><td>{response.following}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="title">Repositories</p>
                        <Repos url={response.repos_url}/>
                    </div>
                });
            },
            error: (err, xhr, status) => {

            },
            complete: ()=>{
            }
        });
    }

    componentWillReceiveProps(){
        this.update(this.props);
    }

    componentWillReceiveProps(newProps){
        this.update(newProps);
    }
    componentWillMount(){
        this.update(this.props);
    }

    render(){
        return (
            <div>
                {this.state.found ? this.state.op: (<p>Not found</p>)}
            </div>
        );
    }
}

export default SingleUser;
