import { Button } from "@/components/ui/button";
import { isTokenValid } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isTokenValid()) {
      navigate("/form");
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4">
            Generate Customized Email Templates
          </h2>
          <p className="text-lg mb-8">
            Input your business data and let AI generate email templates
            tailored to your needs.
          </p>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleGetStarted}
          >
            <span>Get Started</span>
          </Button>
          {/* <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"></button> */}
        </section>

        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Easy to Use</h3>
              <p>
                Simply input your business details and generate customized
                emails with ease.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">AI-Powered</h3>
              <p>
                Leverage the power of AI to create professional and effective
                email templates.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Customizable</h3>
              <p>
                Tailor the email templates to fit your specific business needs
                and branding.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4">1. Input Your Data</h3>
              <p>
                Provide details about your company, employees, and other
                necessary information.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4">2. Generate Templates</h3>
              <p>
                Use our AI-powered tool to create customized email templates
                instantly.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4">3. Use and Customize</h3>
              <p>
                Review and customize the generated templates to suit your
                specific needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Custom Email Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
