"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puerts_1 = require("puerts");
const react_umg_1 = require("react-umg");
const UI = require("./main-ui");
//用React来写UI
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
react_umg_1.ReactUMG.init(world);
UI.Load();
//# sourceMappingURL=UsingReactUMG.js.map