import React, { Component } from 'react';
import RadioButton from './RadioButton';

const data = {
  menus: [
    // first group of radio-buttons
    [
      { id: '101', value: 'Vegetarian' },
      { id: '102', value: 'Nut allergy' },
      { id: '103', value: 'Halal' },
    ],
    // second group of radio-buttons
    [
      { id: '201', value: 'Cashew chicken' },
      { id: '202', value: 'Sweet and sour pork' },
      { id: '203', value: 'Stir fried Tofu' },
      { id: '204', value: 'Vegetable fried rice' },
      { id: '205', value: 'Pad Thai' },
      { id: '206', value: 'Massaman beef' },
    ],
    // third group of radio-buttons
    [
      { id: '301', value: 'Peanut sauce' },
      { id: '302', value: 'Oyster sauce' },
      { id: '303', value: 'Vegetable spring rolls' },
      { id: '304', value: 'Steamed rice' },
    ],
  ],
  rules: {
    // 'Vegetarian' is NOT compatible with 'Cashew chicken', 'Sweet and sour pork', 'Massaman beef', 'Oyster sauce'
    101: [201, 202, 206, 302],
    // 'Nut allergy' is NOT compatible with 'Cashew chicken', 'Peanut sauce',
    102: [201, 301],
    // 'Halal' is NOT compatible with 'Sweet and sour pork',
    103: [202],
    // 'Vegetable fried rice' is NOT compatible with 'Steamed rice' (you don't need more rice... carb overload),
    204: [304],
    // 'Pad thai' is NOT compatible with 'Steamed rice' (Pad thai comes with noodles),
    205: [304],
  },
};

class App extends Component {
  state = {
    firstMenus: [],
    secondMenus: [],
    thirdMenus: [],
    enabledFirst: true,
    enabledSecond: false,
    enabledThird: false,
    selectedFirst: null,
    selectedSecond: null,
    selectedThird: null,
    rules: null,
    secondDisabledMenus: [],
    thirdDisabledMenus: [],
    buttonSubmit: true,
  };

  componentDidMount() {
    this.setState({
      firstMenus: data.menus[0],
      secondMenus: data.menus[1],
      thirdMenus: data.menus[2],
      rules: data.rules,
    });
  }

  setDisabledMenus(menu) {
    return this.state.rules[menu.id] || [];
  }

  onRadioButtonChange = (group, menu) => {
    if (group === 1) {
      this.setState({
        enabledThird: false,
        enabledSecond: true,
        selectedFirst: menu,
        selectedSecond: null,
        selectedThird: null,
        secondDisabledMenus: this.setDisabledMenus(menu),
        buttonSubmit: true,
      });
    }
    if (group === 2) {
      this.setState({
        enabledThird: true,
        selectedSecond: menu,
        selectedThird: null,
        buttonSubmit: true,
        thirdDisabledMenus: this.setDisabledMenus(menu),
      });
    }
    if (group === 3) {
      this.setState({
        selectedThird: menu,
        buttonSubmit: false,
      });
    }
  };

  render() {
    return (
      <>
        <div className="ui divider"></div>
        <div className="ui three column divided padded grid">
          <div className="column">
            <div className="ui form">
              <RadioButton
                label="Select item from First Group:"
                menus={this.state.firstMenus}
                enabled={this.state.enabledFirst}
                onRadioButtonChange={this.onRadioButtonChange}
                group={1}
                selectedButton={this.state.selectedFirst}
                disabledMenus={[]}
              />
              <RadioButton
                label="Select item from Second Group:"
                menus={this.state.secondMenus}
                enabled={this.state.enabledSecond}
                onRadioButtonChange={this.onRadioButtonChange}
                group={2}
                selectedButton={this.state.selectedSecond}
                disabledMenus={this.state.secondDisabledMenus}
              />
              <RadioButton
                label="Select item from Third Group:"
                menus={this.state.thirdMenus}
                enabled={this.state.enabledThird}
                onRadioButtonChange={this.onRadioButtonChange}
                group={3}
                selectedButton={this.state.selectedThird}
                disabledMenus={this.state.thirdDisabledMenus}
              />
            </div>
            <button
              disabled={this.state.buttonSubmit}
              className="ui button"
              type="submit">
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
