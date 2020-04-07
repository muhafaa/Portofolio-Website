$(document).ready(function () {
  const projects = [
    {
      name: "Yugi Card Base",
      link: "https://yugicard-906c4.firebaseapp.com/"
    },
    {
      name: "Online Store",
      link: "https://e-commerce-e93e5.firebaseapp.com/"
    },
    {
      name: "Quiz Game",
      link: "https://kuis-hacktiv.firebaseapp.com/"
    },
    {
      name: "Kanban App",
      link: "https://kanban-sequelize-a3cad.firebaseapp.com/"
    },
    {
      name: "Todo App",
      link: "https://todoapp-c3620.firebaseapp.com/"
    }
  ]

  projects.forEach((project) => {
    $("#projects").append(`
        <div class="p-2 col-sm-6">
          <a href="${project.link}" target="blank" class="link m-0">
            <div class="card-neumorph d-flex justify-content-center">
              <b>${project.name}</b>
            </div>
          </a>
        </div>
        `)
  })

  const contacts = [
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/muhammad-fajri-5a0baa157/",
      image: "https://img.icons8.com/color/48/000000/linkedin-circled.png"
    },
    {
      title: "GitHub",
      link: "https://github.com/muhafaa",
      image: 'https://img.icons8.com/color/48/000000/github.png"'
    },
    {
      title: "WhatsApp",
      image: "https://img.icons8.com/color/50/000000/whatsapp.png",
      link: "https://we.me/6285838440855"
    }
  ]

  contacts.forEach((contact) => {
    $("#contacts").append(`
          <a class="contact-link" href="${contact.link}" target="blank" title="${contact.title}">
            <img src="${contact.image}"/>
          </a>
        `)
  })

  ScrollReveal().reveal(".projects", {
    duration: 1000
  })

  ScrollReveal().reveal(".footer", {
    duration: 1000,
    scale: 0.8
  })
})
