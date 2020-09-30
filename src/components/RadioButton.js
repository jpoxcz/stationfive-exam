import React, { Component } from 'react';

class RadioButton extends Component {
  state = {
    selectedButton: null,
    group: null,
    disabledMenus: [],
    enabled: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedButton !== this.props.selectedButton) {
      this.setState({ selectedButton: this.props.selectedButton });
    }
    if (prevProps.disabledMenus !== this.props.disabledMenus) {
      this.setState({ disabledMenus: this.props.disabledMenus });
    }
    if (prevProps.enabled !== this.props.enabled) {
      this.setState({ enabled: this.props.enabled });
    }
  }

  componentDidMount() {
    this.setState({
      group: this.props.group,
      selectedButton: this.props.selectedButton,
      disabledMenus: this.props.disabledMenus,
      enabled: this.props.enabled,
    });
  }

  onRadioButtonChange = (menu) => {
    this.props.onRadioButtonChange(this.state.group, menu);
  };

  renderChecked = (menu) => {
    if (!this.state.selectedButton) {
      return false;
    } else if (this.state.selectedButton.id === menu.id) {
      return true;
    } else {
      return false;
    }
  };

  setEnabled(menu) {
    if (
      this.state.enabled &&
      this.state.disabledMenus.indexOf(parseInt(menu.id)) === -1
    ) {
      console.log(this.state.disabledMenus.indexOf(parseInt(menu.id)));
      return false;
    }

    return true;
  }

  renderRadionButtons() {
    return this.props.menus.map((menu) => {
      return (
        <div className="field" key={menu.id}>
          <div className="ui radio checkbox">
            <input
              onChange={() => this.onRadioButtonChange(menu)}
              type="radio"
              name={menu.value}
              checked={this.renderChecked(menu)}
              disabled={this.setEnabled(menu)}
            />
            <label>{menu.value}</label>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui segement">
        <div className="ui form">
          <div className="grouped fields">
            <label htmlFor="firstGroup">{this.props.label}</label>
            {this.renderRadionButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default RadioButton;
