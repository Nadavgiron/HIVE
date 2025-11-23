diff --git a/script.js b/script.js
index 3b7c2e67741807aaa5a0f3dcd0c2e35bf504c57e..8d04f5c48fed04d4dfb8ade5410ed409791927eb 100644
--- a/script.js
+++ b/script.js
@@ -15,51 +15,53 @@ scrollButtons.forEach(btn => {
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
-    btn.classList.toggle('active', btn.dataset.scrollTarget === `#${id}`)
+    const isActive = btn.dataset.scrollTarget === `#${id}`
+    btn.classList.toggle('active', isActive)
+    btn.setAttribute('aria-current', isActive ? 'true' : 'false')
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
