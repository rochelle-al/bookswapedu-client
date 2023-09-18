import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bookImage from '../images/bookImage.png';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    // Filter books based on search query
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            {/* Add the search bar at the top */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <h1>BookSwapEDU</h1>
            <table className="custom-font">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book, index) => (
                        <tr key={book.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                            <td><img src={bookImage} alt="Default" /></td>
                            <td>{book.title}</td>
                            <td style={{ textAlign: 'left' }}>{book.desc}</td> {/* Align description to the left */}
                            <td>{book.price}</td>
                            <td>
                                <button className='update'>
                                    <Link to={`/update/${book.id}`}>Update</Link>
                                </button>
                                <button className='download'>
                                    <a href={`http://localhost:8800/books/download/${book.id}`} target="_blank" rel="noopener noreferrer">Download</a>
                                </button>
                                <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='addnewbook'><Link to="/add">Add New Book</Link></button>
        </div>
    );
}

export default Books;

