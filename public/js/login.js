// create login variables to getelementsbyid
const email = document.getElementById('email');
const password = document.getElementById('password');
const signIn = document.getElementById('sign-in');



// create event listener for sign in button

signIn.addEventListener('click', (e) => {
    e.preventDefault();
    // get values from input fields
    const emailVal = email.value;
    const passwordVal = password.value;
    // create object to send to server
    const loginData = {
        email: emailVal,
        password: passwordVal
    };
    // create fetch request to server
    fetch('./api/employee/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (response.ok) {
                console.log('success');
                document.location.replace('/dashboard');
            } else {
                alert('Failed to log in');
            }
        })
        .catch((err) => {
            console.log(err);
        }
        );

});
