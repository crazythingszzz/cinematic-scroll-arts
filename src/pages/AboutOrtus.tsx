import Header from '@/components/Header';

const AboutOrtus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={true} />
      <div className="pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Ortus</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Learn about our vision, mission, and the team behind Ortus.
          </p>
          <div className="bg-card p-8 rounded-lg">
            <p className="text-muted-foreground">
              Company information, team profiles, and history will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOrtus;
