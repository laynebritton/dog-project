import { Dog } from '../interfaces/dog';

const DOG_BREED_URL_PLACEHOLDER = '[BREED]';
const DOG_COUNT_URL_PLACEHOLDER = '[COUNT]';

const DOG_API_BASE_URL = 'https://dog.ceo/api';


const DOG_API_RANDOM_URL = '/breeds/image/random';
const DOG_API_BY_BREED_RANDOM_URL =
  '/breed/' +
  DOG_BREED_URL_PLACEHOLDER +
  '/images/random/' +
  DOG_COUNT_URL_PLACEHOLDER;

export const getRandomDog = async (): Promise<Dog> => {
  const requestUrl = DOG_API_BASE_URL + DOG_API_RANDOM_URL;
  const response = await fetch(requestUrl);
  const jsonResponse = await response.json();

  const fetchedDog = generateDog(jsonResponse.message);
  return fetchedDog;
};

export const getRandomDogs = async (count: number): Promise<Dog[]> => {
  const requestUrl = DOG_API_BASE_URL + DOG_API_RANDOM_URL + '/' + count;
  return getDogsFromUrl(requestUrl);
};

export const getRandomDogsByBreed = async (
  breed: string,
  count: number
): Promise<Dog[]> => {
  let requestUrl = DOG_API_BASE_URL + DOG_API_BY_BREED_RANDOM_URL;
  requestUrl = requestUrl.replace(DOG_BREED_URL_PLACEHOLDER, breed);
  requestUrl = requestUrl.replace(DOG_COUNT_URL_PLACEHOLDER, count.toString());

  return getDogsFromUrl(requestUrl);
};

const getDogsFromUrl = async (requestUrl: string): Promise<Dog[]> => {
  const response = await fetch(requestUrl);
  const jsonResponse = await response.json();

  const fetchedDogs: Dog[] = [];
  jsonResponse.message.forEach((imageUrl: string) => {
    fetchedDogs.push(generateDog(imageUrl));
  });
  return fetchedDogs;
};

const generateDog = (imageUrl: string): Dog => {
  const parsedDog: Dog = {
    image_url: imageUrl
  };
  return parsedDog;
};
