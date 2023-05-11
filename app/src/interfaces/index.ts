export interface State {
  // page mode
  dark: boolean;
  phone: boolean;
  activeSlideId: number;
  primaryColor: string;
  secondaryColor: string;
}
export interface DisplacementSliderOptions {
  images: HTMLImageElement[];
  parent: HTMLElement;
}
export interface Slide {
  title: string;
  status: string;
  img: string;
  imgNight: string;
}
