import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, deletePost } from '../../actions/postActions';

import Html from 'slate-html-serializer';
import { rules } from './rules';

import PostForm from './PostForm';
import Edit from './Edit';
import Comment from './Comment';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BackIcon from '@material-ui/icons/ArrowBack';

const html = new Html({ rules })

class Post extends Component {
  state = {
    isOpen: false,
		deleteModal: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

	toggleDeleteModal = () => {
		this.setState({
			deleteModal: !this.state.deleteModal
		});
	}

  onDeleteClick = id => {
    this.props.deletePost(id);
    this.props.getPosts();
		this.props.history.push('/');
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;
    const post = posts.find(post => post.id === Number(this.props.match.params.id));
    const isUser = (user ? user.name : '') === this.props.match.params.name;

    if (!isAuthenticated)
      return <Redirect to='/'/>

		const fabStyle = {
			margin: 0,
			top: 'auto',
			right: 50,
			bottom: 50,
			left: 'auto',
			position: 'fixed',
			zIndex: 99,
		}
		
		const deleteStyle = {
			margin: 0,
			top: 'auto',
			right: 50,
			bottom: 120,
			left: 'auto',
			position: 'fixed',
			zIndex: 99,
		}

		const editButton = (
			<Fab
				size='large'
				onClick={this.toggle}
				style={fabStyle}
			>
				<EditIcon />
			</Fab>
		);

    const userAccess = (
      <Fragment>
        <PostForm
          toggle={this.toggle}
          postId={this.props.match.params.id}
          initialTitle={post.title}
          initialEntry={html.deserialize(post.entry)}
          initialLanguage={post.language}
        />
				<Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
					<ModalHeader toggle={this.toggleDeleteModal}>Delete</ModalHeader>
					<ModalBody>Are you sure you want to delete?</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={this.onDeleteClick.bind(this, post.id)}
						>
							Delete</Button>
            <Button
							color="secondary"
							onClick={this.toggleDeleteModal}
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<Fab
					size='large'
					onClick={this.toggleDeleteModal}
					style={deleteStyle}
				>
					<DeleteIcon />
				</Fab>
				<Fab
					size='large'
					onClick={this.toggle}
					style={fabStyle}
				>
					<BackIcon />
				</Fab>
      </Fragment>
    );

    const defaultAccess = (
      <Fragment>
				{isUser ? editButton : !editButton}
        <Row style={{ margin: 0 }}>
          <Col md={{ size: 7, offset: 1 }}>
            <Container style={{ zIndex: 1 }}>
              <h1>{post.title}</h1>
                {post.name}
                {post.date}
              <hr />
              <Edit
                post_entry={html.deserialize(post.entry)}
                post_id={post.id}
                post_edits={post.edits}
                isUser={isUser}
              />
              <Comment
                post_id={post.id}
                user_id={user.id}
                post_comments={post.comments}
              />
            </Container>
          </Col>
        </Row>
      </Fragment>
    );

    return (
      <div>
        {this.state.isOpen ? (isUser ? userAccess : defaultAccess) : defaultAccess}
      </div>
    );
  }
}

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(Post);
