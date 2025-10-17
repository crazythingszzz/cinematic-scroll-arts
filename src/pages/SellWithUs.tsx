import Header from '@/components/Header';

const SellWithUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      <div className="pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Sell with Us</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Partner with us to sell your property with our expert team and marketing reach.
          </p>
          <div className="bg-card p-8 rounded-lg">
            <p className="text-muted-foreground">
              Seller services and contact forms will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWithUs;
