const videoSelect = document.getElementById('videoSource');

videoSelect.addEventListener('change', () => {
    videoSelect.classList.add('chosen');
},
{
    once: true
});
