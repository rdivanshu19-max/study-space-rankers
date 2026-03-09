const Privacy = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <div className="max-w-3xl mx-auto prose prose-sm">
      <h1 className="text-3xl font-heading font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
        <p>We respect your privacy. Rankers Star stores minimal data locally on your device.</p>
        <h3 className="font-heading font-semibold text-foreground">Data Collection</h3>
        <p>We store your display name, preferences, and study vault data in your browser's local storage. No personal data is sent to external servers.</p>
        <h3 className="font-heading font-semibold text-foreground">Cookies</h3>
        <p>We may use cookies for analytics and advertising purposes through third-party services like Google AdSense.</p>
        <h3 className="font-heading font-semibold text-foreground">Third-Party Services</h3>
        <p>We may use Google AdSense for displaying ads. These services may collect data according to their own privacy policies.</p>
        <h3 className="font-heading font-semibold text-foreground">Contact</h3>
        <p>For privacy concerns: <a href="mailto:studyspacerankers@gmail.com" className="text-primary">studyspacerankers@gmail.com</a></p>
      </div>
    </div>
  </div>
);
export default Privacy;
