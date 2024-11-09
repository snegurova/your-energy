import api from '../api';

function getQuoteExpireTime() {
  const nextTime = new Date();
  nextTime.setHours(12, 0, 0, 0); // quote will fetch every 12 hours
  return nextTime.getTime();
}

function isNeedToUpdate(time) {
  if (!time) {
    return true;
  }
  return time < Date.now();
}

export async function fetchQuote() {
  // fetch api function

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
    return await fetchQuote();
  }

  const quoteInfo = JSON.parse(localQuote);
  if (isNeedToUpdate(quoteInfo.expire)) {
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
