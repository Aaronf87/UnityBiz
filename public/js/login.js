// create login variables to getelementsbyid
const companyId = document.getElementById('companyId');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const signIn = document.getElementById('sign-up');



// create event listener for sign in button

signIn.addEventListener('click', (e) => {
    e.preventDefault();
    // get values from form
    const companyIdValue = companyId.value;
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    const usernameValue = username.value;
    const passwordValue = password.value;

    // check if values are empty
    if (companyIdValue === '' || firstNameValue === '' || lastNameValue === '' || emailValue === '' || usernameValue === '' || passwordValue === '') {
        alert('Please fill in all fields');
    } else {
        // create new user object
        const newUser = {
            companyId: companyIdValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            username: usernameValue,
            password: passwordValue
        };
        // send post request to server
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((response) => {
            if (response.ok) {
                alert('User Created');
                window.location.replace('/login');
            } else {
                alert('Something went wrong');
            }
        });
    }
});