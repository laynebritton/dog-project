import { parse } from "path/posix";
import { Dog } from "../interfaces/dog";

const DOG_API_BASE_URL = "https://dog.ceo/api";
const DOG_API_RANDOM_URL = "/breeds/image/random";

export const getRandomDog = async (): Promise<Dog> => {
  const request_url = DOG_API_BASE_URL + DOG_API_RANDOM_URL;
  const response = await fetch(request_url);
  const json_response = await response.json();

  const fetched_dog = generate_dog(json_response.message);
  return fetched_dog;
};

export const getRandomDogs = async (count: number): Promise<Dog[]> => {
  const request_url = DOG_API_BASE_URL + DOG_API_RANDOM_URL + "/" + count;
  const response = await fetch(request_url);
  const json_response = await response.json();

  const fetched_dogs: Dog[] = [];
  json_response.message.forEach((image_url: string) => {
    fetched_dogs.push(generate_dog(image_url));
  });

  return fetched_dogs;
};

const generate_dog = (image_url: string): Dog => {
  const parsed_dog: Dog = {
    image_url: image_url,
  };
  return parsed_dog;
};
