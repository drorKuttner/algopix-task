export interface Weather {
  city: {
    name: string;
  },
  list: {
    main: {
      temp: number;
      humidity: number;
    };
    dt_txt: string;
  }[];
}
