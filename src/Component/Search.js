/**
 * Created by admin on 6/11/17.
 */
import React, {Component} from 'react';
import './Search.css';
import SingleUser from './SingleUser';
import $ from 'jquery';
import data from'../json/vipul.js';

class Search extends Component{

    constructor(){
        super();
        this.state = {
            prof : false,
            page : 1,
            sideB: 0
        }
    }

    setNewUser(e){
        console.log(e);
        this.setState({
            currUser:e
        },this.sidebar);
    }

    getData(e){
        let u=``;
        let profName=``;
        if(e.target.innerText=="Next"){
            let pg = this.state.page+1;
            this.setState({page:this.state.page+1});
            u=`https://api.github.com/search/users?q=${this.state.user}&sort=followers&page=${pg}&access_token=7881fe80c7eb9fe6cec0c5348a94ce39e04baa05`;
        }else if(e.target.innerText=="Prev"){
            let pg = this.state.page-1;
            this.setState({page:this.state.page-1});
            u=`https://api.github.com/search/users?q=${this.state.user}&sort=followers&page=${pg}&access_token=7881fe80c7eb9fe6cec0c5348a94ce39e04baa05`;
        }else{
            profName = e.target.profName.value;
            u=`https://api.github.com/search/users?q=${profName}&sort=followers&access_token=7881fe80c7eb9fe6cec0c5348a94ce39e04baa05`;
            this.pageantion();
            this.setState({user:profName, page:1});
        }
        console.log(u);
        e.preventDefault();
        $.get({
            url:u,
            dataType: 'json',
            Authorization: 'token b920bd1783e4e51480fc70d5a17932a1ac7c7b26',
            success : (response) => {
                let disp = response.items.map((li,i) => {
                    return(
                        <li key={i}><a href="javascript:void(0)" onClick={this.setNewUser.bind(this,li.url)}>{li.login}</a></li>
                    );
                });
                console.log(disp);
                this.setState({
                    prof: true,
                    profData: disp,
                    currUser: response.items[0].url
                });
                console.log(data);
                setTimeout(this.sidebar,500);
            },
            error: (err, xhr, status)=> {
                console.log("err");
            }
        });
    }

    pageantion(){
        if (this.state.page==1)
            $("#prev").prop('disabled',true);
        else
            $("#prev").prop('disabled',false);
    }

    componentWillUpdate(){
        this.pageantion();
    }
    componentDidUpdate(){
        this.pageantion();
    }

    sidebar(e){
        $('.result-box').toggleClass("onscreen");
    }

    render(){
        return (
            <div className="main">
                <a href="javascript:void(0)" className="revealer" onClick={this.sidebar.bind(this)}><i className="fa fa-bars" aria-hidden="true"/>
                </a>
                <form onSubmit={this.getData.bind(this)} autoComplete="off">
                    <input type="text" placeholder="Enter the Username you wish to search on Github" name="profName"/>
                    <input type="submit" value="submit"/>
                </form>

                    {
                        this.state.prof ? (
                            <div className="Search-contents">
                                <div id="sidebar" className="result-box">
                                    <ul>{this.state.profData}</ul>
                                    <div className="pagenation">
                                        <button id="prev" className="page-btn" onClick={this.getData.bind(this)}>Prev</button>
                                        <button id="next" className="page-btn" onClick={this.getData.bind(this)}>Next</button>
                                    </div>
                                </div>
                                <div className="result-user">
                                    <SingleUser user={this.state.currUser}/>
                                </div>
                            </div>
                            ): <div><p className="lead">The profile details will be loaded here</p></div>
                    }
            </div>
        );
    }
}

export default Search;