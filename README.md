# Movie Search App

A React application that lets users search movies using the OMDb API.  
The app fetches movie data in real-time as you type, and handles errors gracefully.

## Features

- Search movies by title with live results  
- Displays relevant error messages from the API (e.g., "Too many results", "Movie not found")  
- Clears results when search input is empty  
- Simple and clean UI built with React hooks (`useState`, `useEffect`)  

## Getting Started

### Prerequisites

- Node.js and npm installed  
- An OMDb API key (this project uses a demo key, consider getting your own at [OMDb API](http://www.omdbapi.com/apikey.aspx))  

### Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/django-react-art/movie-search-app
   cd https://github.com/django-react-art/movie-search-app

2. Install dependencies
    npm install

3. Start the development server
    npm start

4. Usage
    Type a movie name in the search box
    Results appear live as you type
    If the search is too broad or no movies are found, you’ll see an error message

5. Future Improvements
    Add debounce to limit API calls while typing
    Improve UI styling
    Add movie details page

License
This project is open source and free to use.

Built with ❤️ using React and OMDb API
