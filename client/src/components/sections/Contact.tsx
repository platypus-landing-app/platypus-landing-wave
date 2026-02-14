'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@platypus.com",
      href: "mailto:hello@platypus.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "San Francisco, CA",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to dive in? Let's start your journey with Platypus today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-border">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full bg-gradient-ocean hover:opacity-90 text-white">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Let's Connect
              </h3>
              <p className="text-muted-foreground mb-8">
                Whether you have questions, need support, or want to explore partnership opportunities, 
                we're here to help you navigate your way forward.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{info.title}</h4>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;