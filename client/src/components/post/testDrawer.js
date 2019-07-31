import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class TestDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <Button
          onClick={this.handleToggle}
        >
          Toggle Drawer
        </Button>
        <Drawer variant='persistent' anchor='right' open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default TestDrawer;
