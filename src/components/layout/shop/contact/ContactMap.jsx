import React from 'react'
import FadeIn from '../common/FadeIn'

const ContactMap = () => {
  return (
    <div>
          <FadeIn>
                        <h2 className="text-3xl font-bold mb-6">Find Us Here</h2>
                        <div className="relative overflow-hidden rounded-xl 
  before:absolute before:inset-0 before:bg-gradient-to-b 
  before:from-transparent before:to-black/10 before:pointer-events-none  h-96">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125042.27043157934!2d78.05589406266404!3d11.653891511389764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca47!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1759801029918!5m2!1sen!2sin"
  className='w-full h-full' 
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Google Map - Salem"
/>
                        </div>
                        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-3">Office Hours</h3>
                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
    </div>
  )
}

export default ContactMap
