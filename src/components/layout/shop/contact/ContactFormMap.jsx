import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

const ContactFormMap = () => {

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <ContactForm/>

                    {/* Map */}
                    <ContactMap/>
                </div>
            </div>
        </section>
    );
};

export default ContactFormMap