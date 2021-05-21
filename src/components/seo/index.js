import { Helmet } from "react-helmet";

const Seo = ({ title = "", noPipe = false }) => {
  return (
    <Helmet>
      <title>{noPipe ? "" : `${title} | Der Volkskreis UAE`}</title>
    </Helmet>
  );
};

export default Seo;
