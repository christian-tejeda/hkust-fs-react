import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// import DishdetailComponent from './DishdetailComponent';

    // onDishSelect(dish) {
    //     this.setState({ selectedDish: dish});
    // };

    // renderDish(dish) {
    //     if (dish != null)
    //         return(
    //             <Card>
    //                 <CardImg top src={dish.image} alt={dish.name} />
    //                 <CardBody>
    //                 <CardTitle>{dish.name}</CardTitle>
    //                 <CardText>{dish.description}</CardText>
    //                 </CardBody>
    //             </Card>
    //         );
    //     else
    //         return(
    //             <div></div>
    //         );
    // };

    function RenderMenuItem( { dish, onClick } ) {
        return (
            <Card /*key={dish.id} onClick={() => onClick(dish.id)}*/ >
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>

            </Card>
        );
    };

    const MenuComponent = (props) => {
        const menu = props.dishes.map((dish) => {
            return (
              <div className="col-12 col-md-5 m-1">
                   <RenderMenuItem dish={dish} /*onClick={props.onClick}*//>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default MenuComponent;

