import React from 'react';
import facebookIcon from '../../../assets/icons/she-facebook.svg';
import twitterIcon from '../../../assets/icons/she-twitter.svg';
import fitbitIcon from '../../../assets/icons/she-fitbit.svg';
import instagramIcon from '../../../assets/icons/she-instagram.svg';
import googleIcon from '../../../assets/icons/she-google.svg';
import spotifyIcon from '../../../assets/icons/she-spotify.svg';
import sheIcon from '../../../assets/icons/she-she.svg';
import wordCloudIcon from '../../../assets/icons/she-wordcloud.svg';
import sentimentIcon from '../../../assets/icons/she-sentiment.svg';
import placeholderIcon from '../../../assets/icons/app-logo-placeholder.svg';

type Props = {
  source: string;
  height?: string;
  width?: string;
  types?: string[];
  className?: string;
};

const imgSrc: Record<string, any> = {
  facebook: facebookIcon,
  twitter: twitterIcon,
  fitbit: fitbitIcon,
  instagram: instagramIcon,
  google: googleIcon,
  spotify: spotifyIcon,
  she: sheIcon,
  sentiment: sentimentIcon,
  wordCloud: wordCloudIcon,
  drops: sheIcon,
  placeholder: placeholderIcon,
};

export const FeedSourceImg: React.FC<Props> = ({ source, types, height, width, className }) => {
  const imageSource = (source: string, types?: string[]) => {
    if (source === 'she') {
      if (types && types.indexOf('sentiment') !== -1) {
        return 'sentiment';
      } else {
        return 'she';
      }
    } else if (source === 'drops') {
      if (types && types.indexOf('wordcloud') !== -1) {
        return 'wordcloud';
      } else {
        return 'she';
      }
    } else {
      return imageAsset(source);
    }
  };

  const imageAsset = (source: string): string => {
    return source.split('-')[0] || 'she';
  };

  return (
    <img
      src={imgSrc[imageSource(source, types)] || imgSrc['placeholder']}
      height={height}
      width={width}
      className={className}
      alt={source}
    />
  );
};
