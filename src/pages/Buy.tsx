import Header from '@/components/Header';

const Buy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      <div className="pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Buy Properties</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover your dream home with our curated selection of premium properties.
          </p>
          <div className="bg-card p-8 rounded-lg">
            <p className="text-muted-foreground">
              Property listings and search functionality will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
