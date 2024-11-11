import api from '../api';

function getQuoteExpireTime() {
  const expiryDate = new Date(Date.now() + 12 * (60 * 60 * 1000));
  return expiryDate.getTime();
}

function isNeedToUpdate(time) {
  if (!time) {
    // console.log('expire time not proviede');
    return true;
  }
  // console.log('exp time', new Date(time), 'current', new Date());
  return time < Date.now();
}

export async function fetchQuote() {
  // fetch api function
  // console.log('api call for quote of the days');
  try {
    const apiResult = await api.quotes.getQuote();
    apiResult.expire = getQuoteExpireTime();
    localStorage.setItem('quote', JSON.stringify(apiResult));
    // console.log('api resut', apiResult);
    return apiResult;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function getQuoteInfo() {
  const localQuote = localStorage.getItem('quote');
  if (!localQuote) {
    // console.log('No quote info..');
    return await fetchQuote();
  }

  const quoteInfo = JSON.parse(localQuote);
  if (isNeedToUpdate(quoteInfo.expire)) {
    // console.log('qu expired');
    return await fetchQuote();
  }

  return quoteInfo;
}

async function updateQuote() {
  // console.log('upde q');
  const quoteText = document.querySelector('.js-qofd');
  const quoteAuthor = document.querySelector('.quote-author');
  const quote = await getQuoteInfo();
  // console.log(quote);
  if (!(quoteText && quoteAuthor)) {
    localStorage.removeItem('quote');
    return;
  }
  if (!quote) {
    return;
  }
  quoteText.textContent = quote.quote;
  quoteAuthor.textContent = quote.author;
}

export { updateQuote };
