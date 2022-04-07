import { Dog, DogBreed } from '../interfaces/dog';

const DOG_BREED_URL_PLACEHOLDER = '[BREED]';
const DOG_COUNT_URL_PLACEHOLDER = '[COUNT]';

const DOG_API_BASE_URL = 'https://dog.ceo/api';

const DOG_API_RANDOM_ENDPOINT = '/breeds/image/random';
const DOG_API_BY_BREED_RANDOM_ENDPOINT =
  '/breed/' +
  DOG_BREED_URL_PLACEHOLDER +
  '/images/random/' +
  DOG_COUNT_URL_PLACEHOLDER;

const DOG_BREED_LIST_ENDPOINT = '/breeds/list/all';

export const getRandomDog = async (): Promise<Dog> => {
  const requestUrl = DOG_API_BASE_URL + DOG_API_RANDOM_ENDPOINT;
  const response = await fetch(requestUrl);
  const jsonResponse = await response.json();

  const fetchedDog = generateDog(jsonResponse.message);
  return fetchedDog;
};

export const getRandomDogs = async (count: number): Promise<Dog[]> => {
  const requestUrl = DOG_API_BASE_URL + DOG_API_RANDOM_ENDPOINT + '/' + count;
  return getDogsFromUrl(requestUrl);
};

export const getRandomDogsByBreed = async (
  breed: string,
  count: number
): Promise<Dog[]> => {
  let requestUrl = DOG_API_BASE_URL + DOG_API_BY_BREED_RANDOM_ENDPOINT;
  requestUrl = requestUrl.replace(DOG_BREED_URL_PLACEHOLDER, breed);
  requestUrl = requestUrl.replace(DOG_COUNT_URL_PLACEHOLDER, count.toString());

  return getDogsFromUrl(requestUrl);
};

export const getDogBreedList = async () => {
  const requestUrl = DOG_API_BASE_URL + DOG_BREED_LIST_ENDPOINT;
  const response = await fetch(requestUrl);
  const jsonResponse = await response.json();
  return generateDogBreeds(jsonResponse.message);
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

const generateDogBreeds = (list: {}): DogBreed[] => {
  const breeds: DogBreed[] = [];
  for (const [key, value] of Object.entries(list)) {
    breeds.push(generateDogBreed(key, value as string[]));
  }
  return breeds;
};

const generateDogBreed = (breed: string, subBreeds: string[]): DogBreed => {
  const dogBreed: DogBreed = {
    name: breed,
    subBreeds: []
  };

  if (subBreeds.length > 0) {
    subBreeds.forEach((breed) => {
      const subBreed: DogBreed = {
        name: breed,
        subBreeds: []
      };
      dogBreed.subBreeds.push(subBreed);
    });
  }

  return dogBreed;
};
