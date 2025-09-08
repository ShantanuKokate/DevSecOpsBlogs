// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }),
    )
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission (replace with actual form handling)
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.")
        contactForm.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        navbar.style.backdropFilter = "blur(10px)"
      } else {
        navbar.style.background = "var(--background-color)"
        navbar.style.backdropFilter = "none"
      }
    })
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".skill-card, .blog-card, .project-card, .stat-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Add loading animation to external links
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener("click", function () {
      const icon = this.querySelector("i")
      if (icon && !icon.classList.contains("fa-spin")) {
        const originalClass = icon.className
        icon.className = "fas fa-spinner fa-spin"
        setTimeout(() => {
          icon.className = originalClass
        }, 1000)
      }
    })
  })

  // Copy code blocks functionality
  document.querySelectorAll("pre code").forEach((block) => {
    const button = document.createElement("button")
    button.className = "copy-button"
    button.innerHTML = '<i class="fas fa-copy"></i>'
    button.title = "Copy code"

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        button.innerHTML = '<i class="fas fa-check"></i>'
        button.style.color = "#10b981"
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>'
          button.style.color = ""
        }, 2000)
      })
    })

    const pre = block.parentElement
    pre.style.position = "relative"
    pre.appendChild(button)
  })

  // Add copy button styles
  const style = document.createElement("style")
  style.textContent = `
        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #e2e8f0;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .copy-button:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `
  document.head.appendChild(style)
})

// Utility function to format dates
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Function to add new blog entries (for easy daily updates)
function addBlogEntry(date, title, description, tags, slug) {
  const blogGrid = document.querySelector(".blog-grid")
  if (!blogGrid) return

  const article = document.createElement("article")
  article.className = "blog-card"

  article.innerHTML = `
        <div class="blog-date">${date}</div>
        <h2><a href="blog/${slug}.html">${title}</a></h2>
        <p>${description}</p>
        <div class="blog-tags">
            ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <a href="blog/${slug}.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
    `

  // Insert at the beginning (most recent first)
  blogGrid.insertBefore(article, blogGrid.firstChild)
}

// Example usage for adding new blog entries:
// addBlogEntry('2025-09-04', 'New Task Title', 'Description of the task', ['Tag1', 'Tag2'], 'day4');
