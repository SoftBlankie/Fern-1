import React, { Component } from 'react';
import {
  Container,
  Button,
  CardImg,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const items = [
  {
    src: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    altText: 'Slide 1',
  },
  {
    src: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
    altText: 'Slide 2',
  },
  {
    src: 'https://semantic-ui.com/images/avatar2/large/kristy.png',
    altText: 'Slide 3',
  }
];

class AvatarModal extends Component {
  state = {
    isOpen: false,
    activeIndex: 0
  };
  
  toggle = () => {
    if (this.props.isUser) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  };

  onClick = () => {
    this.toggle();
  };

  onCancel = () => {
    this.toggle();
  };

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img width='100%' src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });

    return(
      <div>
        <CardImg top width='100%'
          src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='Card image cap'
          onClick={this.toggle}
          style={this.props.isUser ? { cursor: 'pointer' } : null}
        />
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Avatar</ModalHeader>
          <ModalBody>
            <Container>
              <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={activeIndex}
                  onClickHandler={this.goToIndex}
                />
                {slides}
                <CarouselControl
                  direction='prev'
                  directionText='Previous'
                  onClickHandler={this.previous}
                />
                <CarouselControl
                  direction='next'
                  directionText='Next'
                  onClickHandler={this.next}
                />
              </Carousel>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={this.onClick.bind(this)}
            >
              Update
            </Button>
            <Button
              color='secondary'
              onClick={this.onCancel.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AvatarModal;
