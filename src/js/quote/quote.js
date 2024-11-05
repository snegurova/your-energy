// import api function

function getQuoteExpireTime() {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

function isNeedToUpdate(time) {
  return time < Date.now();
}

function fetchQuote() {
  // fetch api function
  const apiResult = {
    text: 'Text',
    author: 'author',
  };
  apiResult.expire = getQuoteExpireTime();
  if (!apiResult) {
    // if not success
    return false;
  }
  localStorage.setItem('quote', JSON.stringify(apiResult));
  return apiResult;
}

function getQuoteInfo() {
  const localQuote = localStorage.getItem('quote');
  if (!localQuote) {
    return fetchQuote();
  }

  const quoteInfo = JSON.parse(localQuote);
  if (isNeedToUpdate(quoteInfo.expire)) {
    return fetchQuote();
  }

  return quoteInfo;
}

function updateQuote() {
  const quoteText = document.querySelector('.js-qofd');
  const quoteAuthor = document.querySelector('.quote-author');
  const quote = getQuoteInfo();
  if (!(quoteText && quoteAuthor)) {
    return;
  }
  if (!quote) {
    return;
  }
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
}

export { updateQuote };
