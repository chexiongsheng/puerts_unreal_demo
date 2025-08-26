import * as UE from 'ue'
import { argv, $Ref, $unref, $ref } from 'puerts'

class RunCaseTest {

    pre_test() {
        require('mocha');

        class BOMString {
            replace(regex: string, replacer: string): BOMString {
                return this;
            }
        }
        
        (globalThis as any).location = new BOMString();

        mocha.setup({
            ui: 'bdd',
            reporter: 'json'
        });


    }

    after_test(testResults: any) {

        const stats = testResults.stats;
        const tests = testResults.tests;

        let summaryLines: string[] = [];
        summaryLines.push(`🧪 Test Summary`);
        summaryLines.push(`✔ Passed: ${stats.passes}/${stats.tests}`);
        summaryLines.push(`❌ Failed: ${stats.failures}/${stats.tests}`);
        summaryLines.push(`⏱ Duration: ${stats.duration}ms`);
        summaryLines.push(`----------------------------------`);

        tests.forEach((test: any, index: number) => {
            const statusIcon = test.err && test.err.message ? "❌" : "✅";
            const title = test.fullTitle || test.title;
            const duration = test.duration || 0;
            summaryLines.push(`${statusIcon} ${title} (${duration}ms)`);

            if (test.err && test.err.message) {
                summaryLines.push(`   ↳ Error: ${test.err.message}`);
                if (test.err.stack) {
                    summaryLines.push(`   ↳ Stack: ${test.err.stack.split('\n')[0]}`);
                }
            }
        });

        return summaryLines.join('\n');
    }

    runMochaTests(testFilePath: string, onComplete: (summary: string) => void) {
        this.pre_test();
        
        console.log("=======start run test case=======");
        mocha.addFile(testFilePath);

        const runner = mocha.run(); // ✅ 获取 Runner 实例

        runner.on('end', () => {
            const testResults = (runner as any).testResults; // ✅ 正确获取 testResults
            if (!testResults || !testResults.stats) {
                console.error("❌ Test results not available or malformed.");
                onComplete("Test execution failed: No results.");
                return;
            }

            const summary = this.after_test(testResults);
            onComplete(summary);
        });
    }
}

class DisplayTest {
    private world: UE.World;
    private widgetClass: UE.Class;
    private widget: UE.Game.StarterContent.CaseTestWidget.CaseTestWidget_C;
    private runTest: RunCaseTest;

    private hasTested: boolean = false;
    init() {
        this.world = (argv.getByName("GameInstance") as UE.GameInstance)?.GetWorld();
        if (!this.world) {
            console.error("❌ World is not available.");
            return;
        }

        this.widgetClass = UE.Class.Load("/Game/StarterContent/CaseTestWidget.CaseTestWidget_C");

        this.widget = UE.UMGManager.CreateWidget(this.world, this.widgetClass) as UE.Game.StarterContent.CaseTestWidget.CaseTestWidget_C;

        this.widget.AddToViewport(0);
        this.widget.Overlay.SetVisibility(UE.ESlateVisibility.Hidden);
        this.runTest = new RunCaseTest();
    }

    StartDisplayTest() {
        this.init()
        this.widget.Button.OnClicked.Add(() => {
            this.widget.Overlay.SetVisibility(UE.ESlateVisibility.Visible);
            if (this.hasTested) {
                console.log("CaseTest has already been run. Ignoring subsequent clicks.");
                return;
            }
            let dis_res = "Running...";
            console.log("CaseTest started!");
            this.widget.TextBox.SetText(dis_res);
            this.runTest.runMochaTests('./CaseTest.js', (res: string) => {
                console.log("CaseTest finished!");
                dis_res += "\n" + res;
                // 异步回调中更新 UI
                this.widget.TextBox.SetText(dis_res);
                this.widget.TextBox.SetIsReadOnly(true); // 设置为只读，防止用户修改测试结果
            });
            this.hasTested = true;
        });

        this.widget.Button_close.OnClicked.Add(() => {
            console.log("CaseTest widget closed!");
        });
    }
}

new DisplayTest().StartDisplayTest();



