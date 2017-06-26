/**
 * Created by admin on 6/11/17.
 */
import React, {Component} from 'react';
import './Search.css';
import SingleUser from './SingleUser';
import $ from 'jquery';
import key from '../json/keys';
import data from'../json/vipul.js';

class Search extends Component{

    constructor(){
        super();
        this.state = {
            prof : false,
            page : 1,
            sideB: 0,
            msg: "The profile details will be loaded here"
        }
    }

    setNewUser(e){
        console.log(e);
        this.setState({
            currUser:e
        },this.sidebar.bind(this,0));
    }

    getData(e){
        let u=``;
        let profName=``;
        if(e.target.innerText=="Next"){
            let pg = this.state.page+1;
            this.setState({page:this.state.page+1});
            u=`https://api.github.com/search/users?q=${this.state.user}&sort=followers&page=${pg}&access_token=${key}`;
        }else if(e.target.innerText=="Prev"){
            let pg = this.state.page-1;
            this.setState({page:this.state.page-1});
            u=`https://api.github.com/search/users?q=${this.state.user}&sort=followers&page=${pg}&access_token=${key}`;
        }else{
            profName = e.target.profName.value;
            u=`https://api.github.com/search/users?q=${profName}&sort=followers&access_token=${key}`;
            this.pageantion();
            this.setState({user:profName, page:1});
        }
        console.log(u);
        e.preventDefault();
        $.get({
            url:u,
            dataType: 'json',
            success : (response) => {
                console.log(response);
                if (response.total_count>0){
                    let disp = response.items.map((li,i) => {
                        return(
                            <li key={i}><a href="javascript:void(0)" onClick={this.setNewUser.bind(this,li.url)}>{li.login}</a></li>
                        );
                    });
                    console.log(response.items.length);
                    this.pageantionv2.call(this,response.items.length);
                    if (response.items.length==0){
                        this.setState({
                            prof:false,
                            msg:"No more users"});
                    }else{
                        this.setState({
                            prof: true,
                            profData: disp,
                            currUser: response.items[0].url
                        });
                    }
                    setTimeout(this.sidebar.bind(this,0),500);
                }else{
                    this.setState({
                        prof: false,
                        msg: "No user found by that name!"
                    })
                }
            },
            error: (err, xhr, status)=> {
                console.log("err");
            }
        });
    }

    pageantion(){
        if (this.state.page==1)
            $("#prev").addClass("nodisp");
        else
            $("#prev").removeClass("nodisp");
    }

    pageantionv2(len){
        if (len<30)
            $("#next").addClass("nodisp");
        else
            $("#next").removeClass("nodisp");
    }

    componentWillUpdate(){
        this.pageantion();
    }
    componentDidUpdate(){
        this.pageantion();
    }

    sidebar(e){
        if (e==0 && $('.result-box').hasClass("onscreen")){

        }else{
            $('.result-box').toggleClass("onscreen");
            $('html, body').animate({scrollTop : 0},800);
        }
    }

    render(){
        return (
            <div className="main">
                <a href="javascript:void(0)" className="revealer" onClick={this.sidebar.bind(this,1)}><i className="fa fa-bars" aria-hidden="true"/>
                </a>
                <form onSubmit={this.getData.bind(this)} autoComplete="off">
                    <input type="text" placeholder="Enter the Username you wish to search on Github" name="profName"/>
                    <input type="submit" value="submit"/>
                </form>

                    {
                        this.state.prof ? (
                            <div className="Search-contents">
                                <div id="sidebar" className="result-box">
                                    <p className="title">Search Results</p>
                                    <ul>{this.state.profData}</ul>
                                    <div className="pagenation">
                                        <button id="prev" className="page-btn" onClick={this.getData.bind(this)}>Prev</button>
                                        <button id="next" className="page-btn" onClick={this.getData.bind(this)}>Next</button>
                                    </div>
                                </div>
                                <div className="result-user ">
                                    <SingleUser user={this.state.currUser}/>
                                </div>
                            </div>
                            ): <div><p className="lead">{this.state.msg}</p></div>
                    }
            </div>
        );
    }
}

export default Search;