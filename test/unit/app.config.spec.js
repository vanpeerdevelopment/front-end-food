import ngDeannotate from "util/testutil";
import disableDebugInfo from "app.config";

describe("disableDebugInfo", () => {
    it("should disable debug info", () => {
        let compileProvider = {
            debugInfoEnabled() {}
        };
        let compileProviderMock = sinon
            .mock(compileProvider)
            .expects("debugInfoEnabled").once().withExactArgs(false);

        ngDeannotate(disableDebugInfo)(compileProvider);

        compileProviderMock.verify();
    });
});
