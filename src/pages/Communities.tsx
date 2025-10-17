import Header from '@/components/Header';

const Communities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      <div className="pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Communities</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover vibrant communities where life flourishes and connections thrive.
          </p>
          <div className="bg-card p-8 rounded-lg">
            <p className="text-muted-foreground">
              Community information and features will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities;
