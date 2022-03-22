const DOG_API_BASE_URL = "https://dog.ceo/api";
const DOG_API_RANDOM_URL = "/breeds/image/random";

export const getRandomDog = async () => {
  const request_url = DOG_API_BASE_URL + DOG_API_RANDOM_URL;
  const response = await fetch(request_url);
  const json_response = await response.json();

  return json_response.message;
};
