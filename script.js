const scrollButtons = document.querySelectorAll('[data-scroll-target]')
const sections = document.querySelectorAll('.screen')
const progressButtons = document.querySelectorAll('.progress-indicator button')
const form = document.getElementById('contactForm')
const heroCta = document.querySelector('.hero .cta')

scrollButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (document.body.classList.contains('locked') && btn === heroCta) {
      document.body.classList.remove('locked')
    }
    const target = document.querySelector(btn.dataset.scrollTarget)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

if (heroCta) {
  heroCta.addEventListener('click', () => {
    if (document.body.classList.contains('locked')) {
      document.body.classList.remove('locked')
    }
  })
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      updateIndicators(entry.target.id)
    }
  })
}, { threshold: 0.6 })

sections.forEach(section => observer.observe(section))

function updateIndicators(id) {
  progressButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scrollTarget === `#${id}`)
  })
}

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(form)
    const errors = validate(formData)
    clearErrors()
    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([name, message]) => {
        const field = form.querySelector(`[name="${name}"]`)
        const errorNode = field?.parentElement?.querySelector('.error')
        if (errorNode) errorNode.textContent = message
      })
      return
    }
    form.reset()
    alert('Thank you! We will be in touch soon.')
  })
}

function validate(formData) {
  const required = ['name', 'municipality', 'email']
  const errors = {}
  required.forEach(field => {
    if (!formData.get(field)?.trim()) {
      errors[field] = 'Required field'
    }
  })

  const email = formData.get('email')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address'
  }
  return errors
}

function clearErrors() {
  form.querySelectorAll('.error').forEach(node => {
    node.textContent = ''
  })
}
