const loader = document.querySelector('.spinner');

export function showLoader() {
    loader.classList.remove('hide');
}

export function hideLoader() {
    loader.classList.add('hide');
    
}