export const GET_GIGS = `
query {
  gigs {
    _id
    image
    fbEvent
    date
    venue
    address
    hour
  }
}
`;

export const GET_LYRICS = `
query {
  lyrics {
    _id
    name
    text
  }
}
`;

export const GET_MEMBERS = `
query {
  members {
    _id
    name
    instrument
    image
  }
}
`;

export const GET_MERCHES = `
query {
  merches {
    _id
    image
    name
    type
    price
  }
}
`;

export const GET_MERCH = `
query ($merchId: String!) {
  merch(merchId: $merchId) {
    _id
    image
    name
    type
    price
    stock {
      sizes {
        XS
        S
        M
        L
        XL
        XXL
      }
      total
    }
  }
}
`;

export const GET_COUNTRIES = `
query {
  countries {
    _id
    code
    name
  }
}
`;

export const GET_CITIES = `
query ($country: String!) {
  cities (country: $country) {
    _id
    country
    name
    lat
    lng
  }
}
`;

export const CREATE_ORDER = `
mutation ($order: OrderInput!) {
  createOrder (order: $order)
}
`;

export const UPDATE_ORDER = `
mutation ($order: OrderInput!) {
  updateOrder (order: $order) {
    _id
  }
}
`;

export const DELETE_ORDER = `
mutation ($token: String!) {
  deleteOrder (token: $token) {
    _id
  }
}
`;
