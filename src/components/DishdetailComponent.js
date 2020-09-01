import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { LoadingComponent } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <div className="container">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.state.toggleModal}>Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select
                                            model=".rating"
                                            id="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text
                                            model=".author"
                                            id="author" className="form-control"
                                            validators={{
                                                minLength: minLength(3),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea
                                            model=".comment"
                                            id="comment"
                                            name="comment"
                                            rows="6"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>

            </div>
        )
    }


}

function RenderComments({ comments, postComment, dishId }) {
    if (comments == null) {
        return (
            <div></div>
        );
    } else {
        const display = comments.map((elem) => {
            return (
                <div key={elem.id}>
                    <p>
                        {elem.comment}
                        <br/>
                        -- {elem.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(elem.date)))}
                    </p>
                </div>
            )
        })
        return (
            <div>
                <ul className="list-unstyled">
                    <h4>Comments</h4>
                    {display}
                    <CommentFormComponent
                        dishId={dishId} 
                        postComment={postComment}
                    />
                </ul>
            </div>
        )
    }
};


function RenderDish( { dish } ) {
    return (
        <div>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>         
    )

}

const DishdetailComponent = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <LoadingComponent/>
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>        
        )
    } else if (props.dish == null) {
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
                        <RenderComments
                            comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishdetailComponent;