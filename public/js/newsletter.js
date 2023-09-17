const newsletterDiv = document.getElementById("newsletters");

// Array to hold newsletters
let newsletters = [];

// Function to toggle content visibility
function toggleContent(id) {
  const contentDiv = document.getElementById(`content-${id}`);
  contentDiv.classList.toggle("hidden");
}

// Show the modal
function showModal() {
  const modal = document.getElementById("createModal");
  modal.classList.remove("hidden");
}

// Hide the modal
function hideModal() {
  const modal = document.getElementById("createModal");
  modal.classList.add("hidden");
}

// Function to update DOM with new newsletter
function addNewsletterToDOM(newsletter) {

  
  // Provide a default image if 'image' is empty
  const imageUrl = newsletter.image || 'https://via.placeholder.com/640x360.png?text=No+Image';

  const card = `
        <div id="card-${newsletter.id}" class="flex flex-col rounded-lg bg-white shadow-md mt-4 w-full mx-2">
            <img class="rounded-t-lg object-cover h-64 w-full" src="${imageUrl}" alt="" />
            <div class="p-6">
                <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800">${newsletter.title}</h5>
                <div id="content-${newsletter.id}" class="hidden text-base text-neutral-600">${newsletter.content}</div>
                <button onclick="toggleContent(${newsletter.id})" class="ripple mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    Show/Hide
                </button>
                <button id="delete-${newsletter.id}" onclick="deleteNewsletter(${newsletter.id})" class="hidden ripple mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Delete
                </button>
            </div>
            <div class="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center">
                <small>Last updated 3 mins ago</small>
            </div>
        </div>
    `;

  newsletterDiv.innerHTML += card;

  // Update the delete dropdown
  const deleteDropdown = document.getElementById("deleteDropdown");
  const option = document.createElement("option");
  option.value = newsletter.id;
  option.text = newsletter.title;
  deleteDropdown.appendChild(option);
}

// Function to delete a newsletter by its ID
async function deleteNewsletter(id) {
  try {
    // Sending a DELETE request to the server to delete the newsletter from the database
    const response = await fetch(`/api/news/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the newsletter card from the DOM
      const newsletterCard = document.getElementById(`card-${id}`);
      if (newsletterCard) {
        newsletterCard.remove();
      }

      // Remove the option from the delete dropdown
      const deleteDropdown = document.getElementById("deleteDropdown");
      const selectedOption = deleteDropdown.querySelector(`option[value="${id}"]`);
      if (selectedOption) {
        selectedOption.remove();
      }
    } else {
      const errorData = await response.json();
      console.error('Error deleting newsletter:', errorData);
    }
  } catch (err) {
    console.error('Network error:', err);
  }
}
  // Function to toggle content visibility
  async function toggleContent(id) {
    const contentDiv = document.getElementById(`content-${id}`);
    const deleteButton = document.getElementById(`delete-${id}`); // Get the Delete button
    contentDiv.classList.toggle("hidden");
    deleteButton.classList.toggle("hidden"); // Show/Hide the Delete button
  }


  // Function to create a newsletter
  async function createNewsletter(title, content, image) {
  try {
    const company_id = newsletterDiv.dataset.company;
    console.log(company_id);
    const user_id = newsletterDiv.dataset.user;
    console.log(user_id)
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, image, company_id, user_id }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error creating newsletter:', errorData);
      return null;
    }
  } catch (err) {
    console.error('Network error:', err);
    return null;
  }
  }

  // Function to fetch existing newsletters
  // Function to fetch existing newsletters
async function fetchNewsletters() {
  try {
    // Fetching logic here ...
    if (response.ok) {
      const data = await response.json();
      newsletters = data;
      newsletters.forEach(addNewsletterToDOM);

      // Add logic to populate dropdown
      const deleteDropdown = document.getElementById("deleteDropdown");
      deleteDropdown.innerHTML = ""; // Clear existing options
      newsletters.forEach(newsletter => {
        const option = document.createElement("option");
        option.value = newsletter.id;
        option.text = newsletter.title;
        deleteDropdown.appendChild(option);
      });
    } else {
      const errorData = await response.json();
      console.error("Error fetching newsletters:", errorData);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
}


// Wait for the document to load
document.addEventListener("DOMContentLoaded", () => {
  // Fetch existing newsletters
  fetchNewsletters();

  // Get the Create button and other existing elements
  const createButton = document.getElementById("createButton");
  const showDeleteDropdown = document.getElementById("showDeleteDropdown");
  const deleteDropdown = document.getElementById("deleteDropdown");
  const confirmDelete = document.getElementById("confirmDelete");
  const closeCreateModal = document.getElementById("closeCreateModal");
  const submitCreate = document.getElementById("submitCreate");

  // Attach event listener to Create button to open modal
  createButton.addEventListener("click", () => {
    showModal();
  });

  // Attach event listener to show Delete dropdown
  showDeleteDropdown.addEventListener("click", () => {
    deleteDropdown.classList.toggle("hidden");
    confirmDelete.classList.toggle("hidden");
  });

  // Attach event listener to Confirm Delete button
  confirmDelete.addEventListener("click", () => {
    const selectedId = deleteDropdown.value;
    deleteNewsletter(selectedId);

    // Remove the option from the dropdown
    const selectedOption = deleteDropdown.querySelector(
      `option[value="${selectedId}"]`
    );
    if (selectedOption) {
      selectedOption.remove();
    }
  });

  // Close modal
  closeCreateModal.addEventListener("click", () => {
    hideModal();
  });

  // Submit form inside the modal
  submitCreate.addEventListener("click", async () => {
    const title = document.getElementById("titleInput").value;
    const content = document.getElementById("contentInput").value;
    const image = document.getElementById("imageInput").value;

    // Create a new newsletter
    const newNewsletter = await createNewsletter(title, content, image);

    if (newNewsletter) {
      // Add the new newsletter to the array
      newsletters.push(newNewsletter);

      // Add the new newsletter to the DOM
      addNewsletterToDOM(newNewsletter);

      // Log the new newsletter
      console.log("Newly created newsletter:", newNewsletter);

      // Close the modal
      hideModal();
    } else {
      console.error("Failed to create new newsletter.");
    }
  });
});


