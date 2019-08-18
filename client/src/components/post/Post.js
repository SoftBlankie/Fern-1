import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, deletePost } from '../../actions/postActions';

import Html from 'slate-html-serializer';
import { rules } from '../editor/rules';

import PostForm from './PostForm';
import DeleteModal from './DeleteModal';
import Edit from './edit/Edit';
import Comment from './comment/Comment';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
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

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;
    const post = posts.find(post => post.id === Number(this.props.match.params.id));
    const isUser = (user ? user.name : '') === this.props.match.params.name;

    if (!isAuthenticated)
      return <Redirect to='/' />

		const fabStyle = {
			margin: 0,
			top: 'auto',
			right: 50,
			bottom: 50,
			left: 'auto',
			position: 'fixed',
			zIndex: 99,
		}
		
    const userAccess = (
      <Fragment>
        <PostForm
          toggle={this.toggle}
          postId={this.props.match.params.id}
          initialTitle={post.title}
          initialEntry={html.deserialize(post.entry)}
          initialLanguage={post.language}
        />
        <DeleteModal
          post_id={post.id} 
          history={this.props.history}
          deletePost={this.props.deletePost}
        />
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
				{isUser ? (
          <Fab
            size='large'
            onClick={this.toggle}
            style={fabStyle}
          >
            <EditIcon />
          </Fab>
        ) : null}
        <Row style={{ margin: 0 }}>
          <Col md={{ size: 7, offset: 1 }}>
            <Container style={{ zIndex: 1 }}>
              <h1>{post.title}</h1>
                <Row>
                  <Col md='auto' xs='auto'>
                    {post.name}
                  </Col>
                  <Col>
                    <small className='text-muted'>{post.date}</small>
                  </Col>
                </Row>
              <hr />
              <Edit
                post_entry={html.deserialize(post.entry)}
                post_id={post.id}
                user_id={user.id}
                name={user.name}
                isUser={isUser}
                post_edits={post.edits}
              />
              <Comment
                post_id={post.id}
                user_id={user.id}
                user_name={user.name}
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
