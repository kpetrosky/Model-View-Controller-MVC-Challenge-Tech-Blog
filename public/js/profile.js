const newFormHandler = async (event) => {
    event.preventDefault();
  
    const useruserName = document.querySelector('#blog-userName').value.trim();
    const newBlog = document.querySelector('#blog-new').value.trim();
    const blogDescription = document.querySelector('#blog-desc').value.trim();
  
    if (userName && newBlog && blogDescription) {
      const response = await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({ userName, newBlog, blogDescription }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create blog');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete blog');
      }
    }
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
  