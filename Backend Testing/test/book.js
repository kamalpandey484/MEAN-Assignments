// //During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Books', () => {
	beforeEach((done) => { //Before each test we empty the database
		Book.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET book', () => {
	  it('it should GET all the books', (done) => {
			chai.request(server)
		    .get('/book')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST book', () => {
	  it('it should not POST a book without pages field', (done) => {
	  	let book = {
	  		title: "The Lord of the Rings",
	  		author: "J.R.R. Tolkien",
	  		year: 1954
	  	};
			chai.request(server)
		    .post('/book')
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('pages');
			  	res.body.errors.pages.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a book ', (done) => {
	  	let book = {
	  		title: "The Lord of the Rings",
	  		author: "J.R.R. Tolkien",
	  		year: 1954,
	  		pages: 1170
	  	};
			chai.request(server)
		    .post('/book')
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Book successfully added!');
			  	res.body.book.should.have.property('title');
			  	res.body.book.should.have.property('author');
			  	res.body.book.should.have.property('pages');
			  	res.body.book.should.have.property('year');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id book', () => {
	  it('it should GET a book by the given id', (done) => {
	  	let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
	  	book.save((err, book) => {
	  		chai.request(server)
		    .get('/book/' + book.id)
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('author');
			  	res.body.should.have.property('pages');
			  	res.body.should.have.property('year');
			  	res.body.should.have.property('_id').eql(book.id);
		      done();
		    });
	  	});
			
	  });
  });

	//Update test case

	describe('Update Books', () => {
		it('it should Update a book by the given id', (done) => {
			let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
			book.save((err, book)=>{
				chai.request(server)
					.put('/book/' +book.id)
					.send({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1000 })
					.end((err, res) => {
						res.should.status(200);
						res.body.should.have.property('message').eql('Book updated!');
						res.body.book.should.have.property('pages').eql(1000);
						done();
					})
			});
		})
	});

	//Delete test case

	describe('Delete Book', () => {
		it('it should delete a book by the given id', (done) => {
			let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
			book.save((err, book)=>{
				chai.request(server)
					.delete('/book/' +book.id)
					.send(book)
					.end((err, res) => {
						res.should.status(200);
						res.body.should.have.property('message');
						res.body.should.have.property('message').eql('Book successfully deleted!');
						done();
					});
			});
		})
	});

});