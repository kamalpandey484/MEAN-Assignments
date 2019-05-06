let Index = require('./index');
let Todo = require('./database/models/todo');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Indexes', () => {
    beforeEach((done) => { //Before each test we empty the database
        Todo.remove({}, (err) => {
            done();
        });
    });

    describe('/GET Todos', () => {
        it('it should GET all the Todos', (done) => {
            chai.request(Index)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST todo', () => {
        it('it should not POST a Todo without pages field', (done) => {
            let todo = {
                name: "Learning JS"
            }
            chai.request(Index)
                .post('/')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        });
        it('it should POST a todo ', (done) => {
            let todo = {
                name: "Learning JS"
            }
            chai.request(Index)
                .post('/')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.book.should.have.property('name');
                    done();
                });
        });
    });

    describe('/:id todo', () => {
        it('it should DELETE a todo given the id', (done) => {
            let todo = new Todo({name: "Learning JS"});
            todo.save((err, todo) => {
                chai.request(Index)
                    .delete('/' + todo.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});
