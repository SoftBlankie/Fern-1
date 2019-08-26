import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
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

  componentDidMount() {
    const { posts } = this.props.post;
    if (posts === undefined || posts.length === 0) this.props.getPosts();
  };

  componentDidUpdate() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;
    if (isAuthenticated === false) {
      this.props.history.push('/');
    } else if (isAuthenticated) {
      if (!posts.find(post => post.id === Number(this.props.match.params.id)))
        this.props.history.push(`/${user.name}`);
    }
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onDelete = post_id => {
    this.props.deletePost(post_id);
    this.props.history.push(`/${this.props.auth.user.name}`);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;
    const post = posts.find(post => post.id === Number(this.props.match.params.id));
    const isUser = (user ? user.name : '') === this.props.match.params.name;

    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const date = post ? new Date(post.date).toLocaleDateString('en-US', options) : '';

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
      <div>
        {(isAuthenticated && post) ? (
          <div>
            <PostForm
              toggle={this.toggle}
              postId={this.props.match.params.id}
              initialTitle={post.title}
              initialEntry={html.deserialize(post.entry)}
              initialLanguage={post.language}
            />
            <DeleteModal
              post_id={post.id} 
              onDelete={this.onDelete}
            />
            <Fab
              size='large'
              onClick={this.toggle}
              style={fabStyle}
            >
              <BackIcon />
            </Fab>
          </div>
        ) : null}
      </div>
    );

    const defaultAccess = (
      <div>
        {(isAuthenticated && post) ? (
          <div>
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
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <Card>
                        <CardHeader style={{ border: 0, backgroundColor: 'white' }}>
                          <h1>{post.title}</h1>
                          <Row>
                            <Col md='auto' xs='auto'>
                              <Link to={`/${post.name}/profile`}>{post.name}</Link>
                            </Col>
                            <Col>
                              <span className='text-muted'>{date}</span>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
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
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );

    return (
      <div>
        {(this.state.isOpen && isUser) ? userAccess : defaultAccess}
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
