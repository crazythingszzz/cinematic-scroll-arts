import Header from '@/components/Header';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      <div className="pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get in touch with our team for any inquiries or assistance.
          </p>
          <div className="bg-card p-8 rounded-lg">
            <p className="text-muted-foreground">
              Contact forms, office information, and team details will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
