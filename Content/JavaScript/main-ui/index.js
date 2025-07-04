"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Load = Load;
const React = require("react");
const react_umg_1 = require("react-umg");
const ui_components_1 = require("./ui-components");
let SlotOfVerticalBox = {
    LayoutData: {
        Offsets: {
            Left: 120,
            Top: 120,
            Right: 480,
            Bottom: 80
        }
    }
};
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: props.names,
            buttonTextureIndex: 0,
        };
    }
    render() {
        return (React.createElement(react_umg_1.CanvasPanel, null,
            React.createElement(react_umg_1.VerticalBox, { Slot: SlotOfVerticalBox },
                React.createElement(react_umg_1.HorizontalBox, null,
                    React.createElement(react_umg_1.Button, { OnHovered: () => this.setState({ buttonTextureIndex: 1 }), OnUnhovered: () => this.setState({ buttonTextureIndex: 0 }) }, this.state.buttonTextureIndex == 0 ? 'normal' : 'hovered')),
                this.state.names.map((name, idx) => React.createElement(ui_components_1.StatusBar, { name: name, key: idx })))));
    }
}
function Load() {
    return react_umg_1.ReactUMG.render(React.createElement(Hello, { names: ["Health:", "Energy:"] }));
}
;
//# sourceMappingURL=index.js.map