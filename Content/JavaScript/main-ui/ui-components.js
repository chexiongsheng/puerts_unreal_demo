"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBar = void 0;
const React = require("react");
const react_umg_1 = require("react-umg");
let SlotOfProgressBar = {
    Size: {
        SizeRule: 1
    }
};
class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        if ((props.initialPercent || 0) < 0) {
            throw new Error('initialPercent < 0');
        }
        this.state = {
            percent: props.initialPercent || 0.5
        };
    }
    get color() {
        return { R: 1 - this.state.percent, G: 0, B: this.state.percent };
    }
    onIncrement = () => this.setState({ percent: this.state.percent + 0.01 });
    onDecrement = () => this.setState({ percent: this.state.percent - 0.01 });
    render() {
        return (React.createElement(react_umg_1.HorizontalBox, null,
            React.createElement(react_umg_1.TextBlock, { Text: `${this.props.name}(${this.state.percent.toFixed(2)})` }),
            React.createElement(react_umg_1.ProgressBar, { Percent: this.state.percent, Slot: SlotOfProgressBar, FillColorAndOpacity: this.color }),
            React.createElement(react_umg_1.Button, { OnClicked: this.onIncrement }, "+"),
            React.createElement(react_umg_1.Button, { OnClicked: this.onDecrement }, "-")));
    }
}
exports.StatusBar = StatusBar;
//# sourceMappingURL=ui-components.js.map