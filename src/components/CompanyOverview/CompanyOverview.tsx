const CompanyOverview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-5">
          <div className="flex-1 text-center md:text-start">
            <h2 className="text-2xl font-bold mb-4 font-oswald">
              Company Overview
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 font-lora">
                  Our History
                </h3>
                <p className="font-poppins">
                  PowerPulse Fitness was founded in 2008 by fitness enthusiasts
                  Alex Johnson and Jamie Lee in a small garage in Austin, Texas.
                  Frustrated with the lack of quality fitness accessories
                  available, they started designing and producing their own line
                  of products. Their first product, a durable and ergonomic
                  resistance band, quickly gained popularity in the local
                  fitness community.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 font-lora">
                  Our Mission
                </h3>
                <p className="font-poppins">
                  At PowerPulse Fitness our mission is to empower individuals on
                  their fitness journeys by providing high-quality, innovative
                  accessories that enhance performance, promote wellness, and
                  inspire confidence. We are dedicated to making fitness
                  accessible to everyone, offering products that are durable,
                  affordable, and designed with the user in mind. Through our
                  commitment to excellence and continuous improvement, we strive
                  to be a trusted partner in your pursuit of a healthier,
                  stronger, and more active lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 font-lora">
                  Our Vision
                </h3>
                <p className="font-poppins">
                  Our vision at FitX is to become the leading global provider of
                  premium fitness accessories, renowned for our innovation,
                  quality, and customer-centric approach. We aim to inspire and
                  support a community of fitness enthusiasts of all levels,
                  fostering a culture of health, wellness, and active living. By
                  continuously evolving and expanding our product range, we
                  aspire to set new standards in the fitness industry and help
                  individuals achieve their personal best, every day.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://i.postimg.cc/hjjQJ8qW/img-2-copyright.jpg"
              alt="Company Overview"
              className="mx-auto aspect-video overflow-hidden rounded-xl w-[500px] h-[600px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
