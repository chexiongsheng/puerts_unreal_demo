import * as React from 'react';
import { VerticalBox, CanvasPanel, ReactUMG, CanvasPanelSlot, Button, HorizontalBox/*, TextureImage*/ } from 'react-umg';
import {StatusBar} from './ui-components'
interface Props {
    names: string[];
}

interface State {
    names: string[];
    buttonTextureIndex: 0 | 1;
}

let SlotOfVerticalBox: CanvasPanelSlot = {
    LayoutData: {
        Offsets: {
            Left: 120,
            Top: 120,
            Right: 480,
            Bottom: 80
        }
    }
}

class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        names: props.names,
        buttonTextureIndex : 0,
      };
    }
    render() {
        return (
            <CanvasPanel>
                <VerticalBox Slot={SlotOfVerticalBox}>
                    <HorizontalBox>
                    <Button OnHovered={() => this.setState({buttonTextureIndex: 1})} OnUnhovered={() => this.setState({buttonTextureIndex: 0})} >
                        {this.state.buttonTextureIndex == 0 ? 'normal' : 'hovered'}
                    </Button>
                    </HorizontalBox>
                    {this.state.names.map((name, idx) => <StatusBar name={name} key={idx}/>)}
                </VerticalBox>
            </CanvasPanel>
        );
    }
}

export function Load(){
    return ReactUMG.render(
        <Hello names={["Health:", "Energy:"]}/>
    );
};
