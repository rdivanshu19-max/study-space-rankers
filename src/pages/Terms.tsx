const Terms = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <div className="max-w-3xl mx-auto prose prose-sm">
      <h1 className="text-3xl font-heading font-bold mb-6">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
        <p>By using Rankers Star, you agree to these terms. We provide study materials for educational purposes only.</p>
        <h3 className="font-heading font-semibold text-foreground">Use of Materials</h3>
        <p>All materials are provided for personal educational use. Redistribution or commercial use is prohibited without permission.</p>
        <h3 className="font-heading font-semibold text-foreground">User Conduct</h3>
        <p>Users must not upload copyrighted content, spam, or harmful materials. We reserve the right to remove any content that violates these terms.</p>
        <h3 className="font-heading font-semibold text-foreground">Disclaimer</h3>
        <p>Materials are provided "as is" without warranty. We are not responsible for the accuracy of third-party content.</p>
        <h3 className="font-heading font-semibold text-foreground">Contact</h3>
        <p>For any questions: <a href="mailto:studyspacerankers@gmail.com" className="text-primary">studyspacerankers@gmail.com</a></p>
      </div>
    </div>
  </div>
);
export default Terms;
