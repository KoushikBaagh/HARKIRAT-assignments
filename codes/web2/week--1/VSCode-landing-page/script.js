var nav = document.getElementById('nav');
        document.addEventListener('scroll', (() => {
            if (window.scrollY > 0) {
                nav.style.borderBottom = '1px solid #ffffff1e'
            } else {
                nav.style.border = 'none';
            }
        }))