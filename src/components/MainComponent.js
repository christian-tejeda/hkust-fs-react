import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import HomeComponent from './HomeComponent';
import { DISHES } from '../shared/dishes';

export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        });
    }

    render() {

        const HomePage = () => {
            return (
                <HomeComponent />
            );
        }

        return (
            <div>
                {/* <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar> */}

                <HeaderComponent />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu"
                        component={
                            () => <Menu dishes={this.state.dishes} />
                        }
                    />
                    <Redirect to="/home"/>
                </Switch>

                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishdetailComponent
                    dish={
                        this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}
                /> */}
                <FooterComponent/>
            </div>
        )
    }
}
