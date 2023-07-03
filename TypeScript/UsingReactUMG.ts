import * as UE from 'ue'
import {argv} from 'puerts';
import {ReactUMG} from 'react-umg';
import * as UI from './main-ui';

//用React来写UI
let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();
ReactUMG.init(world);
UI.Load();