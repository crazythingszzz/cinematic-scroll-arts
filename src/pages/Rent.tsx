import Header from '@/components/Header';

const Rent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      <div className="pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Rent Properties</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find your perfect rental home with flexible terms and premium locations.
          </p>
          <div className="bg-card p-8 rounded-lg">
            <p className="text-muted-foreground">
              Rental listings and search functionality will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
