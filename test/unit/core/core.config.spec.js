import ngDeannotate from "util/testutil";
import routerConfigAnnotated from "core/core.router.config";

describe("routerConfig", () => {
    let componentLoaderProvider;
    let routerConfig;

    beforeEach(() => {
        componentLoaderProvider = {
            mapping: null,
            setTemplateMapping(mapping) {
                this.mapping = mapping;
            }
        };
        routerConfig = ngDeannotate(routerConfigAnnotated);
    });

    it("should set template mapping", () => {
        let componentLoaderProviderMock = sinon
            .mock(componentLoaderProvider)
            .expects("setTemplateMapping").once();

        routerConfig(componentLoaderProvider);

        componentLoaderProviderMock.verify();
    });

    it("should map templates to app directory", () => {
        routerConfig(componentLoaderProvider);

        let mapped = componentLoaderProvider.mapping("home");

        mapped.should.equal("app/home/home.html");
    });

    it("should map camel casing to dash casing", () => {
        routerConfig(componentLoaderProvider);

        let mapped = componentLoaderProvider.mapping("frontEndFood");

        mapped.should.equal("app/front-end-food/front-end-food.html");
    });
});
