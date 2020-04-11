const COUNT_OFFERS = 8;

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
const getRandomElementInArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const map = document.querySelector('.map');
map.classList.remove('.map--faded');

const maxWidthMap = map.getBoundingClientRect().width;

const typeOffer = ['palace', 'flat', 'house', 'bungalo'];
const checkinOffer = ['12:00', '13:00', '14:00'];
const checkoutOffer = ['12:00', '13:00', '14:00'];
const featuresOffer = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosOffer = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const renderOffer = () => {
  const location = {
    x: getRandomInRange(0, maxWidthMap),
    y: getRandomInRange(130, 630)
  }

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInRange(1, 8)}.png`
    },
    offer: {
      title: 'Заголовок предложения',
      address: `${location.x}, ${location.y}`,
      price: 500,
      type: getRandomElementInArray(typeOffer),
      rooms: 2,
      guests: 3,
      checkin: getRandomElementInArray(checkinOffer),
      checkout: getRandomElementInArray(checkoutOffer),
      features: featuresOffer.slice(0, getRandomInRange(0, featuresOffer.length - 1)),
      description: 'Описание предложения',
      photos: photosOffer.slice(0, getRandomInRange(0, photosOffer.length - 1))
    },
    location
  }
};

const offers = [];

const generateOffers = (count) => {
  for (let i = 0; i < count; i++) {
    offers.push(renderOffer());
  }

  return offers;
};

generateOffers(COUNT_OFFERS);

const pinTemplate = document.querySelector('#pin').content;
const pinMap = pinTemplate.querySelector('.map__pin');

const renderPin = (offer) => {
  const pinElement = pinMap.cloneNode(true);
  const pinImg = pinElement.querySelector('img');

  pinElement.style.top = `${offer.location.y}px`;
  pinElement.style.left = `${offer.location.x}px`;

  pinImg.src = offer.author.avatar;
  pinImg.alt = offer.offer.title;

  return pinElement;
};

const renderPins = (offers) => {
  const pins = document.createDocumentFragment();

  for (let i = 0; i < offers.length; i++) {
    pins.append(renderPin(offers[i]));
  }

  return pins;
};

const pinsMap = document.querySelector('.map__pins');

pinsMap.append(renderPins(offers));

const cardTemplate = document.querySelector('#card').content;
const cardMap = cardTemplate.querySelector('.map__card');

const translateTypeOffer = (type) => {
  let name = '';

  switch (type) {
    case 'palace':
      name = 'Дворец';
      break;
    case 'flat':
      name = 'Квартира';
      break;
    case 'house':
      name = 'Дом';
      break;
    case 'bungalo':
      name = 'Бунгало';
      break;
  }

  return name;
};

const createFeatureItem = (type) => {
  const featureItem = document.createElement('li');

  featureItem.classList.add('popup__feature', `popup__feature--${type}`);

  return featureItem;
}

const renderCard = (element) => {
  const cardElement = cardMap.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = translateTypeOffer(element.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const popupFeatures = cardElement.querySelector('.popup__features');

  popupFeatures.innerHTML = '';

  for (let i = 0; i < element.offer.features.length; i++) {
    cardElement.querySelector('.popup__features').append(createFeatureItem(element.offer.features[i]));
  }

  cardElement.querySelector('.popup__description').textContent = element.offer.description;

  const popupPhotos = cardElement.querySelector('.popup__photos');
  const cardImg = cardElement.querySelector('.popup__photo');

  popupPhotos.innerHTML = '';

  for (let i = 0; i < element.offer.photos.length; i++) {
    cardImg.src = element.offer.photos[i];

    popupPhotos.append(cardImg);
  }

  cardElement.querySelector('.popup__avatar').src = element.author.avatar;

  return cardElement;
};

const filtersContainerMap = document.querySelector('.map__filters-container');

filtersContainerMap.before(renderCard(offers[0]));
