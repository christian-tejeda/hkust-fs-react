import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderComments({ comments }) {
        if (comments == null) {
            return (
                <div></div>
            );
        } else {
            const display = comments.map((elem) => {
                return (
                    <div>
                        <h4>Comments</h4>
                        <li key={elem.id}>
                            {elem.comment}
                            <br/>
                            -- {elem.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(elem.date)))}
                        </li>
                    </div>
                )
            })
            return (
                <div>
                    <ul className="list-unstyled">
                        {display}
                    </ul>
                </div>
            )
        }
    };
    

    function RenderDish( { dish } ) {
        return (
            <div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>         
        )

    }

    const DishdetailComponent = (props) => {
        if (props.dish == null) {
            return (
                <div></div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                </div>
            );
        }
    }

export default DishdetailComponent;