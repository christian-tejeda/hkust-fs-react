import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
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
                <HomeComponent
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishdetailComponent
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                />
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
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path="/contactus" component={ContactComponent}/>
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
