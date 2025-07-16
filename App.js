import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addBook = async () => {
    if (!title.trim()) return;
    await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    const res = await fetch("http://localhost:5000/books");
    const data = await res.json();
    setBooks(data);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📚 Book Reading System</h1>
      <input
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addBook} style={{ marginLeft: "1rem" }}>
        Add Book
      </button>

      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
