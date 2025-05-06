document.addEventListener("DOMContentLoaded", () => {
  (function ($) {
    $(document).ready(function () {
      $("html").attr("data-theme", "dark");
      // typeof window !== "undefined" && localStorage.setItem("fluxi-theme", "dark");
      $("#toggle-key").click(function () {
        let apiKeyField = $("#api-key");
        apiKeyField.attr(
          "type",
          apiKeyField.attr("type") === "password" ? "text" : "password"
        );
      });

      $("#add-balance").click(function () {
        const paymentUrl =
          "/dashboard/useractions";
        window.location.href = paymentUrl;
      });
      // Check user token in localStorage
      // let userToken = typeof window !== "undefined" && localStorage.getItem("userToken");
      let userToken =  ""
      if (userToken) {
        console.log("userToken recieved", userToken);
        $.ajax({
          url: `${CONFIG.backendUrl}/user/auth`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          success: function (data) {
            if (!data.success) {
              window.location.href = "/";
            } else if (data.success) {
            }
          },
          error: function () {
            console.error("Error verifying token");
            window.location.href = "/";
          },
        });
      } else {
        console.log("redirecuserToken recieved", userToken);
        window.location.href = "/";
      }
    });
  })(jQuery);
});
