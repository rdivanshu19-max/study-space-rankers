const AdSenseDisclaimer = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <div className="max-w-3xl mx-auto prose prose-sm">
      <h1 className="text-3xl font-heading font-bold mb-6">AdSense Disclaimer</h1>
      <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
        <p>Rankers Star may display advertisements through Google AdSense to help sustain our free service.</p>
        <h3 className="font-heading font-semibold text-foreground">About Ads</h3>
        <p>Google AdSense uses cookies to serve ads based on your interests. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
        <h3 className="font-heading font-semibold text-foreground">Revenue Usage</h3>
        <p>Any revenue generated through advertisements goes directly towards maintaining the platform and expanding our free material library.</p>
        <h3 className="font-heading font-semibold text-foreground">Disclaimer</h3>
        <p>We do not endorse or guarantee the products/services advertised. Users should exercise their own judgment.</p>
        <h3 className="font-heading font-semibold text-foreground">Contact</h3>
        <p>For ad-related concerns: <a href="mailto:studyspacerankers@gmail.com" className="text-primary">studyspacerankers@gmail.com</a></p>
      </div>
    </div>
  </div>
);
export default AdSenseDisclaimer;
