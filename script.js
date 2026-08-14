// ==========================================================================
// Dark Mode Toggle
// ==========================================================================
const darkModeToggle = document.getElementById("darkModeToggle")
const root = document.documentElement

function setDarkMode(enabled) {
  root.classList.toggle("dark-mode", enabled)
  localStorage.setItem("darkMode", String(enabled))
  darkModeToggle.setAttribute("aria-pressed", String(enabled))
  darkModeToggle.innerHTML = enabled
    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
    : '<i class="fas fa-moon" aria-hidden="true"></i>'
}

darkModeToggle.addEventListener("click", () => {
  setDarkMode(!root.classList.contains("dark-mode"))
})

setDarkMode(root.classList.contains("dark-mode"))

// ==========================================================================
// Typing Animation
// ==========================================================================
const typingText = document.querySelector(".typing-text")
const roles = ["Full-Stack Developer", "MERN Stack Developer", "Software Engineer"]
let roleIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentRole = roles[roleIndex]

  if (isDeleting) {
    charIndex--
  } else {
    charIndex++
  }

  typingText.textContent = currentRole.substring(0, charIndex)

  let typingSpeed = isDeleting ? 40 : 90

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1400
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typingSpeed = 400
  }

  setTimeout(typeWriter, typingSpeed)
}

if (typingText) {
  typeWriter()
}

// ==========================================================================
// Scroll Progress + Back to Top
// ==========================================================================
const scrollProgress = document.querySelector(".scroll-progress")
const backToTopBtn = document.getElementById("backToTop")

function throttle(func, wait) {
  let timeout = null
  return (...args) => {
    if (timeout) return
    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }
}

function handleScroll() {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.offsetHeight - window.innerHeight
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

  scrollProgress.style.width = scrollPercent + "%"
  backToTopBtn.classList.toggle("visible", scrollTop > 400)
}

window.addEventListener("scroll", throttle(handleScroll, 16))

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

// ==========================================================================
// Mobile Navigation
// ==========================================================================
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

function closeMobileMenu() {
  navMenu.classList.remove("active")
  hamburger.setAttribute("aria-expanded", "false")
}

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active")
  hamburger.setAttribute("aria-expanded", String(isOpen))
})

navMenu.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu)
})

// ==========================================================================
// Scroll Reveal Animation
// ==========================================================================
const revealTargets = document.querySelectorAll(
  ".skill-category, .project-card, .stat-card, .timeline-item, .contact-card"
)

revealTargets.forEach((el) => el.setAttribute("data-reveal", ""))

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  )

  revealTargets.forEach((el) => revealObserver.observe(el))
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"))
}
