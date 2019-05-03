import React from 'react';
import About from "./About";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';

const wrapper = shallow(<About />);
let container, containerProp;

describe("FirstComponent - No props", () => {
    test("Is snapshot Same", () => {
        const tree = renderer.create(<About />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    describe("render <div>", () => {
        beforeEach(() => {
            container = wrapper.find("div");
            containerProp = container.props();
        });

        it("should have a <div>", () => {
            expect(container).toHaveLength(1);
        });

        it("should have a <div> with properly className prop", () => {
            expect(containerProp.className).toEqual("AboutPage");
        });
    });

    describe("render <h1>", () => {
        beforeEach(() => {
            container = wrapper.find("h1");
        });

        it("should have a <h1>", () => {
            expect(container).toHaveLength(1);
        });

        it("should have a <h1> with the properly text", () => {
            expect(container.text()).toEqual("About Component!");
        });
    });
});