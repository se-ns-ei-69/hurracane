document.getElementById('multiStepForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let form = document.getElementById('form-right-section');
  let successMessage = document.getElementById('successMessage');
  // let formData = new FormData(form);

  form.style.opacity = '0';
  form.style.visibility = 'hidden'
  successMessage.classList.add('show');

  // fetch('mailer.php', {
  //   method: 'POST',
  //   body: formData
  // }).then(response => response.text()).then(result => {
  //   if (result.includes('Message has been sent')) {
  //     form.style.opacity = '0';
  //     form.style.visibility = 'hidden'
  //     successMessage.classList.add('show');
  //
  //     setTimeout(function () {
  //       form.style.opacity = '1';
  //       form.style.visibility = 'visible'
  //       successMessage.classList.remove('show');
  //       form.reset();
  //     }, 5000);
  //   } else {
  //     alert('There was an error sending your message.');
  //   }
  // }).catch(error => {
  //   console.error('Error:', error);
  //   alert('There was an error sending your message.');
  // });
});
