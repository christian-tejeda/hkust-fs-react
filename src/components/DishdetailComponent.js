import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

export default class DishdetailComponent extends Component {

    renderComments(comments) {
        if (comments == null) {
            return (
                <div></div>
            );
        } else {
            const display = comments.map((elem) => {
                return (
                    /* Couldn't get the right spacing as in the screenshots
                    but I hope that doesn't matter much */
                    <li key={elem.id}>
                        {elem.comment}
                        <br/>
                        -- {elem.author}, {elem.date}
                    </li>
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



    render() {
        if (this.props.dish == null) {
            return (
                <div></div>
            );
        } else {
            return (
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1 d-inline-block">
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            )
        }
    }
}
