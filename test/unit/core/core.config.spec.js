import ngDeannotate from "util/testutil";
import templateMappingConfigAnnotated from "core/core.config";

describe("templateMappingConfig", () => {
    let componentLoaderProvider;
    let templateMappingConfig;

    beforeEach(() => {
        componentLoaderProvider = {
            mapping: null,
            setTemplateMapping(mapping) {
                this.mapping = mapping;
            }
        };
        templateMappingConfig = ngDeannotate(templateMappingConfigAnnotated);
    });

    it("should set template mapping", () => {
        let componentLoaderProviderMock = sinon
            .mock(componentLoaderProvider)
            .expects("setTemplateMapping").once();

        templateMappingConfig(componentLoaderProvider);

        componentLoaderProviderMock.verify();
    });

    it("should map templates to app directory", () => {
        templateMappingConfig(componentLoaderProvider);

        let mapped = componentLoaderProvider.mapping("home");

        mapped.should.equal("./app/home/home.html");
    });

    it("should map camel casing to dash casing", () => {
        templateMappingConfig(componentLoaderProvider);

        let mapped = componentLoaderProvider.mapping("frontEndFood");

        mapped.should.equal("./app/front-end-food/front-end-food.html");
    });
});
