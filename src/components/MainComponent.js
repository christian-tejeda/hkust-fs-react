import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
// import { Navbar, NavbarBrand } from 'reactstrap';
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import HomeComponent from './HomeComponent';
import AboutComponent from './AboutComponent';
import ContactComponent from './ContactComponent';
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class MainComponent extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dishes: DISHES,
    //         comments: COMMENTS,
    //         promotions: PROMOTIONS,
    //         leaders: LEADERS
    //     };
    // }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        });
    }

    render() {

        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishdetailComponent
                    dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
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
                    <Route path="/aboutus"
                        component={
                            () => <AboutComponent leaders={this.props.leaders} />
                        }
                        />
                    <Route exact path="/menu"
                        component={
                            () => <MenuComponent dishes={this.props.dishes} />
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

export default withRouter(connect(mapStateToProps)(MainComponent));