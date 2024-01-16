import { gql } from "@apollo/client";

export const LEAGUES = gql`
  query Leagues {
    leagues {
      id
      name
      logo {
        publicId
        imgUrl
      }
      country {
        imgPath
        value
      }
      description
      website
      socials {
        facebook
        instagram
        xlink
        youtube
      }
      backgroundGradient {
        fromColor
        toColor
      }
    }
  }
`;
