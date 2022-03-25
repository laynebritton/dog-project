export interface Dog {
  image_url: string;
}

export interface DogBreed {
  name: string;
  subBreeds: DogBreed[];
}
