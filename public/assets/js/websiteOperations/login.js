document.addEventListener("DOMContentLoaded", () => {
  (($) => {
    if (typeof $ !== "undefined") {
      // Signup
      $("#signupForm").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        // Get form data
        let formData = {
          username: $("input[name='username']").val(),
          email: $("input[name='email']").val(),
          password: $("input[name='password']").val(),
          agree: $("#flexCheckDefault").is(":checked") ? 1 : 0, // Convert to boolean
        };

        // Send AJAX request
        $.ajax({
          url: `${CONFIG.backendUrl}/user/signup`, // Replace with actual API URL
          method: "POST",
          data: JSON.stringify(formData), // Convert data to JSON
          contentType: "application/json", // Set content type
          dataType: "json",
          success: function (response) {
            console.log("API Response:", response);
            if (response.success) {
              window.location.href = "/verify";
            } else if (response.status === "userExists") {
              alert("Email is already Exists. If this is your account try to login!")
              // $.toast({
              //   heading: "Error",
              //   text: "Email is already Exists. If this is your account try to login!",
              //   showHideTransition: "slide", // Options: fade, slide, plain
              //   icon: "error", // Options: info, warning, error, success
              //   position: "top-center",
              //   hideAfter: 2000,
              //   loader: false,
              // });
            }
          },
          error: function (error) {
            console.error("Error:", error);
            alert("Internal server error")
            // $.toast({
            //   heading: "Error",
            //   text: "Internal Server Error!",
            //   showHideTransition: "slide", // Options: fade, slide, plain
            //   icon: "error", // Options: info, warning, error, success
            //   position: "top-center",
            //   hideAfter: 2000,
            //   loader: false,
            // });
          },
        });
      });

      // Login
      $("#loginForm").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        let formData = {
          email: $("input[name='email']").val(),
          password: $("input[name='password']").val(),
        };
        // Send AJAX request
        $.ajax({
          url: `${CONFIG.backendUrl}/user/login`, // Replace with actual API URL
          method: "POST",
          data: JSON.stringify(formData), // Convert data to JSON
          contentType: "application/json", // Set content type
          dataType: "json",
          success: function (response) {
            console.log("API Response:", response);
            if (response.message === "LoggedIn Successfully.") {
              console.log("response",response)
              // typeof window !== "undefined" && localStorage.setItem("userToken", response.token);
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1000);
            } else if (response.status === "unauthorized") {
              $.toast({
                heading: "Error",
                text: "Invalid email or password!",
                showHideTransition: "slide", // Options: fade, slide, plain
                icon: "error", // Options: info, warning, error, success
                position: "top-center",
                hideAfter: 2000,
                loader: false,
              });
            }
          },
          error: function (error) {
            console.error("Error:", error);
            $.toast({
              heading: "Error",
              text: "Internal server error!",
              showHideTransition: "slide", // Options: fade, slide, plain
              icon: "error", // Options: info, warning, error, success
              position: "top-center",
              hideAfter: 2000,
              loader: false,
            });
          },
        });
      });

      // Reset password Link Email confirmation send
      $("#resetPassword").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        // Get form data
        let email = $("input[name='email']").val();
        // Send AJAX request
        $.ajax({
          url: `${CONFIG.backendUrl}/user/forgotpassword/${email}`, // Replace with actual API URL
          method: "POST",
          contentType: "application/json", // Set content type
          dataType: "json",
          success: function (response) {
            console.log("API Response:", response);
            if (response.success === true) {
              $.toast({
                heading: "Success",
                text: "Please Check your email!",
                showHideTransition: "slide", // Options: fade, slide, plain
                icon: "success", // Options: info, warning, error, success
                position: "top-center",
                hideAfter: 2000,
                loader: false,
              });
            } else if (response.success === false) {
              $.toast({
                heading: "Error",
                text: response.message,
                showHideTransition: "slide", // Options: fade, slide, plain
                icon: "error", // Options: info, warning, error, success
                position: "top-center",
                hideAfter: 2000,
                loader: false,
              });
            }
          },
          error: function (error) {
            console.error("Error:", error);
            alert("Something went wrong! Please try again.");
          },
        });
      });

      // Create new password
      $("#createNewPassword").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        // Get form data
        let password = $("input[name='password']").val();
        const urlParams = new URLSearchParams(window.location.search);
        const userid = urlParams.get("userid");
        console.log("User ID:", userid, password); // Debugging        // Send AJAX request
        $.ajax({
          url: `${CONFIG.backendUrl}/user/reset-password/${userid}/${password}`, // Replace with actual API URL
          method: "PUT",
          contentType: "application/json", // Set content type
          dataType: "json",
          success: function (response) {
            console.log("API Response:", response);
            if (response.success === true) {
              $.toast({
                heading: "Success",
                text: "Password successfully Changed!",
                showHideTransition: "slide", // Options: fade, slide, plain
                icon: "success", // Options: info, warning, error, success
                position: "top-center",
                hideAfter: 2000,
                loader: false,
              });
              setTimeout(() => {
                window.location.href = "/log-in";
              }, 2000);
            } else {
              $.toast({
                heading: "Error",
                text: "Internel Server Error!",
                showHideTransition: "slide", // Options: fade, slide, plain
                icon: "error", // Options: info, warning, error, success
                position: "top-center",
                hideAfter: 2000,
                loader: false,
              });
            }
          },
          error: function (error) {
            console.error("Error:", error);
            alert("Something went wrong! Please try again.");
          },
        });
      });
    }
  })(jQuery);
});
