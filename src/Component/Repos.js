/**
 * Created by admin on 6/22/17.
 */

import React, {Component} from 'react';
import $ from 'jquery';
import key from '../json/keys';
import {IntlProvider, FormattedDate} from 'react-intl';

class Repos extends Component{

    constructor(){
        super();
        this.state = {
            ready:false
        }
    }


    getDate(){

        let mydate = Date.parse('2012-02-18 14:28:32');
        let result = mydate.toString('dddd MMM yyyy h:mm:ss');
        console.log(result);
    }
    update(newprops){
        let url = newprops.url;
        $.get({
            url: url+`?&access_token=${key}`,
            dataType: 'json',
            success: (response)=>{
                let op = response.map((obj,i)=>{
                    return <div className="repos-box" key={i}>
                        <div className="repo">
                            <p><a className="title" href={obj.html_url} target="_blank">{obj.name}</a><br/>
                            <span className="description">{obj.description ? obj.description : "No description Available"}</span><br/>
                            {obj.homepage? (<a className="proj_link" href={obj.homepage} target="_blank">Project Link</a>) : (<span/>) }<br/>
                            </p>
                            <span className="timestamp"><FormattedDate value={ Date.parse(obj.created_at)} day="numeric" month="long" year="numeric"/></span>
                        </div>
                        {i!=response.length-1? (<hr className="repo-divider"/>) : <span></span>}
                    </div>
                });
                this.setState({ready:true,op:op});
            }
        })
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
            <IntlProvider locale="en">
                <div>
                    {this.state.ready? this.state.op : (<span></span>)}
                </div>
            </IntlProvider>
        )
    }
}

 export default Repos;
