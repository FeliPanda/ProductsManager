const searchForm = document.getElementById('search-form'); // Replace with actual element ID

if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const searchTerm = document.getElementById('search-input').value; // Replace with actual input element ID

        try {
            const response = await fetch(`/search?query=${searchTerm}`); // Search endpoint with query parameter

            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }

            const data = await response.json();
            // Handle the search results (e.g., update the displayed product list)
            console.log('Search results:', data); // You can use this data to update product list in UI
        } catch (error) {
            console.error('Error:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
        }
    });
}
