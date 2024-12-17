import CompanyOverview from "@/components/CompanyOverview/CompanyOverview";
import ContactForm from "@/components/ContactForm/ContactForm";
import Team from "@/components/TeamMember/TeamMember";

import WhatWeDo from "@/components/WhatWeDo/WhatWeDo";
import Widget from "../Widget/Widget";
import TestimonialSlider from "@/components/Testimonial/Testimonial";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div>
      <Helmet>
        <title>PowerPulse Fitness | About-us</title>
      </Helmet>
      <CompanyOverview />
      <Team />
      <TestimonialSlider />
      <Widget />
      <WhatWeDo />
      <ContactForm />
    </div>
  );
};

export default AboutUs;
