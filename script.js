// Load events for home page

$(document).ready(function () {
  // Load event data (JSON)
  $.ajax({
    url: "data/events.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      let eventGrid = $("#event-grid");
      data.events.forEach((event) => {
        eventGrid.append(`
                    <div class="image-item">
                        <img src="${event.image}" alt="${event.name}">
                        <div class="image-caption">
                            <h3>${event.name}</h3>
                            <p>Date: ${event.date}</p>
                            <p>${event.description}</p>
                        </div>
                    </div>
                `);
      });
    },
  });

  // Load team data for team page

  // Load team data (JSON)
  $.ajax({
    url: "data/team.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      let teamGrid = $("#team-grid");
      data.team.forEach((member) => {
        teamGrid.append(`
                    <div class="team-member">
                        <img src="${member.image}" alt="${member.name}" class="team-photo">
                        <h3>${member.name}</h3>
                        <p>${member.role}</p>
                        <p>${member.description}</p>
                    </div>
                `);
      });
    },
  });

  // Load mission data (JSON)
  $.ajax({
    url: "data/mission.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      let missionHtml = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
        `;
      $("#mission").html(missionHtml);
    },
    error: function (xhr, status, error) {
      console.error("Error loading mission data:", error);
    },
  });

  $(document).ready(function () {
    // Load event manager data (XML)
    $.ajax({
      url: "data/managers.xml",
      method: "GET",
      dataType: "xml",
      success: function (data) {
        let managerGrid = $("#manager-grid");
        $(data)
          .find("manager")
          .each(function () {
            let name = $(this).find("name").text();
            let role = $(this).find("role").text();
            let description = $(this).find("description").text();
            let image = $(this).find("image").text();
            let email = $(this).find("email").text(); // Get email from XML

            managerGrid.append(`
                        <div class="manager-card">
                            <img src="${image}" alt="${name}" class="manager-image">
                            <h3>${name}</h3>
                            <p>${role}</p>
                            <p>${description}</p>
                            <a href="mailto:${email}">Contact ${name.split(" ")[0]}</a>
                        </div>
                    `);
          });
      },
      error: function () {
        console.log("Error loading XML data.");
      },
    });
  });

  // Handle contact form submission (AJAX)
  $("#contactForm").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "submit_contact.php", // Replace with your backend endpoint
      method: "POST",
      data: $(this).serialize(),
      success: function (response) {
        $("#response").html("<p>Thank you for contacting us!</p>");
      },
      error: function () {
        $("#response").html("<p>Something went wrong. Please try again.</p>");
      },
    });
  });
});

$(document).ready(function () {
  // Load features and testimonials
  $.ajax({
    url: "data/content.json", // Path to your JSON file
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Load features
      let featuresHtml = "";
      data.features.forEach((feature) => {
        featuresHtml += `
                    <div class="feature">
                        <img src="${feature.image}" alt="${feature.title}">
                        <hr>
                        <h3>${feature.title}</h3>
                        <p>${feature.description}</p>
                    </div>
                `;
      });
      $("#features").html(featuresHtml);

      // Load testimonials
      let testimonialsHtml = "";
      data.testimonials.forEach((testimonial) => {
        testimonialsHtml += `
                    <div class="testimonial">
                        <div class="client-info">
                            <img src="${testimonial.image}" alt="${testimonial.name}" class="client-image">
                            <div class="client-details">
                                <p class="client-name">${testimonial.name}</p>
                                <p class="client-role">${testimonial.role}</p>
                                <div class="star-rating">${testimonial.rating}</div>
                            </div>
                        </div>
                        <p class="testimonial-text">"${testimonial.text}"</p>
                    </div>
                `;
      });
      $("#testimonials").html(testimonialsHtml);
    },
    error: function () {
      console.log("Error loading JSON data.");
    },
  });
});

/* Contact page */

$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting

    // Get values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const mobile = $("#mobile-no").val().trim();
    const event = $("#event").val();
    const message = $("#message").val().trim();
    const date = $("#date").val().trim();
    const isChecked = $("#check").is(":checked");
    const radioChecked = $('input[name="1"]:checked').length > 0;

    // Validate name
    if (!name || name.length < 3) {
      alert("❌ Please enter a valid name (at least 3 characters).");
      $("#name").focus();
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      alert("❌ Please enter a valid email address.");
      $("#email").focus();
      return;
    }

    // Validate mobile number
    const phonePattern = /^[0-9]{10}$/;
    if (!mobile || !phonePattern.test(mobile)) {
      alert("❌ Please enter a valid 10-digit mobile number.");
      $("#mobile-no").focus();
      return;
    }

    // Validate event selection
    if (!event) {
      alert("❌ Please select an event type.");
      $("#event").focus();
      return;
    }

    // Validate radio selection
    if (!radioChecked) {
      alert("❌ Please select Good or Bad.");
      return;
    }

    // Validate date
    if (!date) {
      alert("❌ Please select a date.");
      $("#date").focus();
      return;
    }

    // Validate message
    if (!message || message.length < 10) {
      alert("❌ Message must be at least 10 characters long.");
      $("#message").focus();
      return;
    }

    // Validate checkbox
    if (!isChecked) {
      alert("❌ Please accept the policy to continue.");
      $("#check").focus();
      return;
    }

    // All validations passed
    alert("✅ Form submitted successfully!");
    this.submit(); // Optionally submit the form now
  });
});
