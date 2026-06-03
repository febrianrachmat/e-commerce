export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
};

/** Local overrides (photo, edited fields) — Fake Store has no upload API */
export type UserProfileOverrides = {
  avatarDataUrl?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};

export type UserProfile = User & {
  displayName: string;
  avatarUrl: string;
};
