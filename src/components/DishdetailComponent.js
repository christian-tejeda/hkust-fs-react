import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderComments({ comments }) {
        if (comments == null) {
            return (
                <div></div>
            );
        } else {
            const display = comments.map((elem) => {
                return (
                    <div className="col-12 col-md-5 m-1">
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
            <div  className="col-12 col-md-5 m-1">
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
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            )
        }
    }

export default DishdetailComponent;