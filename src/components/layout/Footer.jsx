import Title from "@/components/common/Title";
import useFetch from "@/hooks/useFetch";
import footerService from "@/services/footerService";

const Footer = () => {
  const { data } = useFetch(footerService.getAll, []);
  const footer = data[0];

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6">
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <a href={footer?.location} target="_blank" rel="noreferrer">
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">Location</span>
              </a>
              <a href={`tel:${footer?.phoneNumber}`}>
                <i className="fa fa-phone"></i>
                <span className="inline-block ml-2">Call +90 {footer?.phoneNumber}</span>
              </a>
              <a href={`mailto:${footer?.email}`}>
                <i className="fa fa-envelope"></i>
                <span className="inline-block ml-2">{footer?.email}</span>
              </a>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[38px]">Feane</Title>
            <p className="mt-3">{footer?.desc}</p>
            <div className="flex items-center justify-center mt-5 gap-x-2">
              {footer?.socialMedia?.map((item) => (
                <a
                  key={item._id}
                  href={item.link}
                  className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <span>{footer?.openingHours?.day}</span>
              <span>{footer?.openingHours?.hour}</span>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          © {new Date().getFullYear()} Feane. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
