import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import {Provider, connect} from 'react-redux';
import {createStore } from 'redux';
import { robots } from '../robots'
import '../containers/App.css'
import Scroll from  '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
import { searchRobots } from '../reducers';




class App extends Component  {
    constructor(){
        super()
            this.state = {
                robots: [],
                searchfield: ''
        }
    }
  
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}))
    }
        onSearchChange = (event) => {
            this.setState({searchfield: event.target.value})
        }
        
        render() {
            const {robots, searchfield} = this.state;
            const filteredRobots = robots.filter(robot => {
                return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
            })
                return !robots.length ?
                <h1>Loading</h1> :
             (
                <div>
                    <h1 className= 'tc f1'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
                );
            }
    }



export default App;