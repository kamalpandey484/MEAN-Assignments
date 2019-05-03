import React from 'react';
import AddTodo from "./AddTodo";
import { shallow, mount } from "enzyme";
import renderer from 'react-test-renderer';

const wrapper = shallow(<AddTodo />);
const wrapperMount = mount(<AddTodo />);
describe("Testing AddTodo Component!", () => {
    test("Is snapshot Same", () => {
        const tree = renderer.create(<AddTodo />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("Is AddTodo component rendered", () => {
        expect(wrapper.find(".App").length).toBe(1);
    });
    test("does All fields (input and button) rendered",()=>{
        expect(wrapperMount.containsMatchingElement(<h1>Add Todo</h1>)).toEqual(true);
        expect(wrapperMount.containsMatchingElement(<input name="todo"/>)).toEqual(true);
        expect(wrapperMount.containsMatchingElement(<button>Add todo</button>)).toEqual(true);
    })
    describe('Todo Input', () => {
        it('should respond to change event and change the state of the AddTodo Component', () => {
            wrapper.find('#todoInput').simulate('change', {target: {name: 'todo', value: 'Test More Components!'}});
            expect(wrapper.state('newTodo')).toEqual('Test More Components!');
        })

    })
});