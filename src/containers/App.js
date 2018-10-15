import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import '../containers/App.css'
import Scroll from  '../components/Scroll'
import {setSearchField} from '../actions.js';
import ErrorBoundary from '../components/ErrorBoundary';


const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component  {
    constructor(){
        super()
            this.state = {
                robots: [],
        }
    }
  
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}))
    }

        
        render() {
            const {robots} = this.state;
            const {searchField , onSearchChange} = this.props;
            const filteredRobots = robots.filter(robot => {
                return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
            })
                return !robots.length ?
                <h1>Loading</h1> :
             (
                <div>
                    <h1 className= 'tc f1'>RoboFriends</h1>
                    <SearchBox searchChange = {onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
                );
            }
    }



export default connect(mapStateToProps, mapDispatchToProps)(App);