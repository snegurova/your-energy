const loader = document.querySelector('.loader');

export function showLoader() {
    loader.classList.remove('hide');
}

export function hideLoader() {
    loader.classList.add('hide');
    
}