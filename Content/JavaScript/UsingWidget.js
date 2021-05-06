"use strict";
//UTsGameInstance::OnStart里头，把QuickStart改为UsingWidget
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
let widgetClass = UE.Class.Load("/Game/StarterContent/TestWidgetBlueprint.TestWidgetBlueprint_C");
let widget = UE.UMGManager.CreateWidget(world, widgetClass);
widget.AddToViewport(0);
widget.Button1.OnClicked.Add(() => {
    console.log("button clicked!");
    console.log("inputed text:" + widget.TextBox.GetText());
});
//# sourceMappingURL=UsingWidget.js.map