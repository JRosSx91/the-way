export interface State {
  // page mode
  dark: boolean;
  phone: boolean;
  login: boolean;
  activeSlideId: number;
  primaryColor: string;
  secondaryColor: string;
}
export interface DisplacementSliderOptions {
  images: HTMLImageElement[];
  parent: HTMLElement;
}
export interface SlideCities {
  title: string;
  status: string;
  img: string;
  imgNight: string;
}
export interface WelcomeSlide {
  title: string;
  subtitle: string;
  img: string;
}
