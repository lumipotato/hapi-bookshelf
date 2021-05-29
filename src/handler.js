const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(7);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = false;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (reading === true) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((reading) => reading).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (reading === false) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((reading) => !reading).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (finished === true) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((finished) => finished).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (finished === false) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((finished) => !finished).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (name) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((data) => data.name.toLowerCase().includes(name.toLowerCase())).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((data) => ({
        id: data.id,
        name: data.name,
        publisher: data.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

export default { addBookHandler, getAllBooksHandler };