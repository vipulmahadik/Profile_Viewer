/**
 * Created by admin on 6/11/17.
 */
import React, {Component} from 'react';
import $ from 'jquery';
import './SingleUser.css'
import {data2} from '../json/vipul';

class SingleUser extends Component{

    constructor(){
        super();
        this.state = {
            data:"",
            found:false
        }
    }

    update(){

        let url = this.props.user;
        console.log("Got new");
        $.ajax({
            url: url,
            dataType: 'json',
            Authorization: 'token b920bd1783e4e51480fc70d5a17932a1ac7c7b26',
            success: (response) => {

                let op =
                    <div className="contents">
                        <div className="row">
                            <div className="img-div">
                                <img className="prof" src={response.avatar_url} alt=""/>
                            </div>
                            <div className="info-div-name">
                                <h2>{response.name}</h2>
                            </div>
                        </div>

                        <div className="info-div">
                            <table>
                                <tr><td><strong>Location:</strong> </td><td>{response.location}</td></tr>
                                <tr><td><strong>Company:</strong> </td><td>{response.company}</td></tr>
                                <tr><td><strong>Blog:</strong></td> <td><a href={response.blog}>{response.blog}</a></td></tr>
                                <tr><td><strong>Bio:</strong> </td><td>{response.bio} </td></tr>
                                <tr><td><strong>Public Repo:</strong> </td><td>{response.public_repos}</td></tr>
                                <tr><td><strong>Public Gist:</strong> </td><td>{response.public_gists}</td></tr>
                                <tr><td><strong>Followers: </strong> </td><td>{response.followers} </td></tr>
                                <tr><td><strong>Following: </strong> </td><td>{response.following}</td></tr>
                            </table>
                        </div>

                    </div>;
                this.setState({found:true,op:op});
            },
            error: (err, xhr, status) => {

            }
        });
    }

    componentWillReceiveProps(){
        this.update();
    }

    componentWillMount(){
        this.update();
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
