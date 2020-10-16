import React  from "react";
import facebookIcon from "../../../assets/icons/she-facebook.svg";
import twitterIcon from "../../../assets/icons/she-twitter.svg";
import fitbitIcon from "../../../assets/icons/she-fitbit.svg";
import instagramIcon from "../../../assets/icons/she-instagram.svg";
import googleIcon from "../../../assets/icons/she-google.svg";
import spotifyIcon from "../../../assets/icons/she-spotify.svg";

type Props = {
    source: string;
    height?: string;
    width?: string;
    className?: string;
}

const imgSrc: Record<string, any> = {
  facebook: facebookIcon,
  twitter: twitterIcon,
  fitbit: fitbitIcon,
  instagram: instagramIcon,
  google: googleIcon,
  spotify: spotifyIcon,
};

export const FeedSourceImg: React.FC<Props> = ({ source, height, width, className }) => {

  return <img src={imgSrc[source]} height={height} width={width} className={className} alt={source}/>;
};
