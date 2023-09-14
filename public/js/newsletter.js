// Function to update DOM with new newsletter
function addNewsletterToDOM(newsletter) {
    const newsletterDiv = document.getElementById('newsletters');
    const card = `
        <div class="flex flex-col rounded-lg bg-white shadow-md mt-4 w-full md:w-3/4 lg:w-1/2 mx-2 sm:shrink-0 sm:grow sm:basis-0">
            <img class="rounded-t-lg object-cover h-64 w-full" src="${newsletter.image}" alt="" />
            <div class="p-6">
                <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800">${newsletter.title}</h5>
                <div id="content-${newsletter.id}" class="hidden text-base text-neutral-600">${newsletter.content}</div>
                <button onclick="toggleContent(${newsletter.id})" class="ripple mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    Show/Hide
                </button>
            </div>
            <div class="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center">
                <small>Last updated 3 mins ago</small>
            </div>
        </div>
    `;
    newsletterDiv.innerHTML += card;
  }
  
  // Function to create a newsletter
  async function createNewsletter(title, content, image) {
    // Replace with your actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: new Date().getTime(),
          title,
          content,
          image,
        });
      }, 2000);
    });
  }
  
  // Wait for the document to load
  document.addEventListener('DOMContentLoaded', () => {
    // Get the Create button
    const createButton = document.getElementById('createButton');
  
    // Attach event listener to Create button
    createButton.addEventListener('click', async () => {
      // Dummy data, you can replace this with actual data from a form
      const title = 'New Newsletter';
      const content = 'This is the content of the new newsletter.';
      const image = 'https://example.com/image.jpg';
  
      // Create a new newsletter
      const newNewsletter = await createNewsletter(title, content, image);
  
      // Add the new newsletter to the DOM
      addNewsletterToDOM(newNewsletter);
  
      // Log the new newsletter
      console.log('Newly created newsletter:', newNewsletter);
    });
  });
  
  
  
  