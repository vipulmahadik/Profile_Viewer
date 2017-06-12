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
            prof : false
        }
    }

    setNewUser(e){
        console.log(e);
        this.setState({
            currUser:e
        });
    }

    getData(e){
        let profName = e.target.profName.value;
        console.log(`https://api.github.com/search/users?q=${profName}&sort=followers`);
        e.preventDefault();
        // return false;
        $.get({
            url:`https://api.github.com/search/users?q=${profName}&sort:followers`,
            dataType: 'json',
            success : (response) => {
                let disp = response.items.map(li => {
                    return(
                        <li><a href="javascript:void(0)" onClick={this.setNewUser.bind(this,li.url)}>{li.login}</a></li>
                    );
                });
                console.log(disp);
                this.setState({
                    prof: true,
                    profData: disp,
                    currUser: response.items[0].url
                });
                console.log(data);
            },
            error: (err, xhr, status)=> {
                console.log("err");
            }
        });
    }

    render(){
        return (
            <div className="main">
                <form onSubmit={this.getData.bind(this)}>
                    <input type="text" name="profName"/>
                    <input type="submit" value="submit"/>
                </form>

                    {
                        this.state.prof ? (
                            <div className="Search-contents">
                                <div className="result-box">
                                    <ul>{this.state.profData}</ul>
                                </div>
                                <div className="result-user">
                                    <SingleUser user={this.state.currUser}/>
                                </div>
                            </div>
                            ): <div>Data to be loaded</div>
                    }
            </div>
        );
    }
}

export default Search;