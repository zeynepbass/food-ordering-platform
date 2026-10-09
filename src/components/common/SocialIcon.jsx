import { FiFacebook, FiGithub, FiInstagram, FiLink, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";

export const SOCIAL_PLATFORMS = [
  { key: "facebook", label: "Facebook", Icon: FiFacebook },
  { key: "instagram", label: "Instagram", Icon: FiInstagram },
  { key: "twitter", label: "Twitter", Icon: FiTwitter },
  { key: "linkedin", label: "LinkedIn", Icon: FiLinkedin },
  { key: "youtube", label: "YouTube", Icon: FiYoutube },
  { key: "github", label: "GitHub", Icon: FiGithub },
];

// Matches by substring so links saved earlier as Font Awesome class names keep working.
export const findSocialPlatform = (icon = "") =>
  SOCIAL_PLATFORMS.find((platform) => icon.toLowerCase().includes(platform.key));

const SocialIcon = ({ icon, ...props }) => {
  const Icon = findSocialPlatform(icon)?.Icon ?? FiLink;
  return <Icon aria-hidden="true" {...props} />;
};

export default SocialIcon;
