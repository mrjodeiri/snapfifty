// src/components/admin/BlogEditor.js
import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BlogEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    author: '',
    readTime: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'blogs'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isPublished: true
      });
      setFormData({
        title: '',
        content: '',
        summary: '',
        category: '',
        author: '',
        readTime: ''
      });
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="w-full p-2 border rounded h-64"
        />
        <textarea
          placeholder="Summary"
          value={formData.summary}
          onChange={(e) => setFormData({...formData, summary: e.target.value})}
          className="w-full p-2 border rounded h-24"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Read Time (e.g., '5 min')"
          value={formData.readTime}
          onChange={(e) => setFormData({...formData, readTime: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Publish Blog Post
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;