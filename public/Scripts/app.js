
// IIFE -- Immediately Invoked Function Expression
(function(){
    
    function Start()
    {
        let title = document.title;

        // h1 text ("Welcome,") in home page
        let welcomeText = document.getElementById('welcomeText');

        // get url of current page
        let url = new URL(window.location);

        // get form values from url
        let firstName = url.searchParams.get("fname");
        let lastName = url.searchParams.get("lname");
        let email = url.searchParams.get("email");
        let message = url.searchParams.get("message");
        
        // validate the form in contact page
        if(title === "Contact")
        {
            formValidate();
        }

        if (welcomeText) 
        {
            // is the first name value is successfully passed, print all values
            if (firstName) 
            {
                printValue(firstName, lastName, email, message);
                welcomeText.innerHTML = `Welcome, ${firstName}`;
            }
        }

        let deleteButtons = document.querySelectorAll('.btn-warning');

        for (const button of deleteButtons) 
        {
            console.log(button);
            button.addEventListener('click', (event) => {
                if(!confirm("Are You Sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/business-contacts');
                }
            });
        }
     }
    
    function formValidate()
    {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function(form) 
        {
            // validate the form
            form.addEventListener('submit', function(event) 
            {
                // prevent users from redirecting to the home page
                if (form.checkValidity() === false) 
                {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else 
                {
                    event.preventDefault();

                    let firstName = document.getElementById('firstName').value;
                    let lastName = document.getElementById('lastName').value;
                    let email = document.getElementById('email').value;
                    let message = document.getElementById('message').value;

                    // by using the form values, redirect the page including the parameters
                    window.location.href=`/home?fname=${firstName}&lname=${lastName}&email=${email}&message=${message}`;
                }
                form.classList.add('was-validated');
            }, false);
        });
    }

    // print values on the console
    function printValue(firstName, lastName, email, message)
    {
        console.log(`First Name : ${firstName}`);
        console.log(`Last Name  : ${lastName}`);
        console.log(`Email      : ${email}`);
        console.log(`message    : ${message}`);
    }

    function confirmDelete()
    {
        let deleteButtons = document.querySelectorAll('.btn-danger');

        for (const button of deleteButtons) 
        {
            button.addEventListener('click', (event) => {
                console.log('clicked!');
                if(!confirm('Are you Sure?'))
                {
                    event.preventDefault();
                    window.location.assign('/business-contacts');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();