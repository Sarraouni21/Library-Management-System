const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const booksController = require("../controllers/books-controller");

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './path/to/Book.js#/Book'
 *       404:
 *         description: No books found
 */
router.get("/", booksController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book successfully added
 *       500:
 *         description: Unable to add the book
 */
router.post("/", booksController.addBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book data
 *       404:
 *         description: No book found with the given ID
 */
router.get("/:id", booksController.getById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book successfully updated
 *       404:
 *         description: Unable to find or update the book by ID
 */
router.put("/:id", booksController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       404:
 *         description: Unable to find or delete the book by ID
 */
router.delete("/:id", booksController.deleteBook);

module.exports = router;